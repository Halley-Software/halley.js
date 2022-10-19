# Halley.JS ☄️
# The small, fast and easy web framework.

## The 0.4.0 version of Halley has arrived!

# Changes

### - Now the port must be indicated necessarily at the Halley class constructor and then, indicated as the first parameter of the `ready` method

An example: 

```js
import { Halley } from "halley.http"

const halley = new Halley({
    port: 5000,
    environment: "development"
})

// stuff

halley.ready(halley.port)
```

# Notice that the Halley releases only will cover the minor and major versions

Ups I almost forgot say you that, the original name of halley.http is **halley.js**, but already exist a package with this name on the npm registry and its abandoned, but halley.http describes better the intentions of the framework.