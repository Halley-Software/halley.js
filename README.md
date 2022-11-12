# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.0.1 version of Halley has arrived!!!!

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

# Changes of version 0.5.0

### - It fix's a bug that can break changes!
 - That bug made that the methods of extended classes there wasn't availables
### Updates the readme

> The original name of halley.http is **halley.js**.
>
> But already exist a package with this name on the npm registry and its abandoned​.
>
> Anyway halley.http describes better the intentions of the framework.