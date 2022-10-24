# Halley.JS ☄️
# The small, fast and easy web framework.

## The 0.4.1 version of Halley has arrived!

Fast getting started:

```js

import { Halley } from "halley.http"

const halley = new Halley({
    port: 5000,
    environment: "development"
})

halley.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

halley.ready(halley.port)

```

# Changes of version 0.4.1

### - The project now have less files
### - Request types deleted, theren't nothing yet for the request object

> ## The releases only will cover the Majors and Minors versions

Ups I almost forgot say you that, the original name of halley.http is **halley.js**, but already exist a package with this name on the npm registry and its abandoned, but halley.http describes better the intentions of the framework.