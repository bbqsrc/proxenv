# proxenv

Simple, unobtrusive config management.

Manage `yaml` or `json` configs based on your `NODE_ENV`, with safe proxying
to ensure no unexpected runtime errors.

## Usage

### Using `NODE_ENV`

```javascript

const config = require("proxenv")("path/to/configs")
// config = { "test": true }

console.log(config.test) // -> true
console.log(config.invalid) // -> {}
console.log(config.invalid.and.getting.deeper) // -> {}
```

### With provided environment

```javascript
const config = require("proxenv")("path/to/configs", "provided env")
```

## License

BSD 2-clause. See LICENSE.
