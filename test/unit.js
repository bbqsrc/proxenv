"use strict"
/* eslint-env mocha */
/* eslint-disable no-unused-expressions,max-nested-callbacks,no-process-env,func-names,prefer-arrow-callback */

const path = require("path")
const expect = require("chai").expect

const proxenv = require("../index")
const configPath = path.join(__dirname, "conf")

describe("proxenv", function() {
  beforeEach(function() {
    process.env.NODE_ENV = "test"
  })

  it("should load based on NODE_ENV by default", function() {
    const config = proxenv(configPath)

    expect(config.test).to.equal(true)
  })

  it("should allow infinite chaining of invalid objects", function() {
    const config = proxenv(configPath)

    expect(config.not.a.real.thing.this.is).to.exist
  })

  it("should handle empty object literals the same way", function() {
    const config = proxenv(configPath)

    expect(config.empty.but.not.breaking).to.exist
  })

  it("should handle null the same way", function() {
    const config = proxenv(configPath)

    expect(config.empty.but.not.breaking).to.exist
  })

  it("should handle overriding env with parameter", function() {
    const config = proxenv(configPath, "anything")

    expect(config).to.exist
    expect(config.anything).to.equal(true)
  })

  it("should not load invalid environments", function() {
    expect(() => proxenv(configPath, "invalid")).to.throw(Error)

    process.env.NODE_ENV = "invalid"
    expect(() => proxenv(configPath)).to.throw(Error)
  })
})
