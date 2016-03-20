"use strict" /* eslint-disable no-process-env */

const Reflect = require("harmony-reflect")
const yaml = require("js-yaml")
const path = require("path")
const fs = require("fs")

function loadFile(confPath, name) {
  for (const ext of ["yml", "yaml", "json"]) {
    let file

    try {
      file = fs.readFileSync(path.join(confPath, `${name}.${ext}`))
    } catch (err) {
      continue
    }

    return yaml.safeLoad(file)
  }
}

function proxify(obj) {
  return new Proxy(obj, {
    get() {
      const val = Reflect.get(...arguments)

      if (val == null) {
        return proxify({})
      }

      if (typeof val === "object") {
        return proxify(val)
      }

      return val
    },

    set() {
      throw new TypeError("Config cannot be written to")
    }
  })
}

function config(configPath, envOverride) {
  const env = envOverride || process.env.NODE_ENV
  const data = loadFile(configPath, env)

  return proxify(data)
}

module.exports = config
