# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.2.0 version of Halley almost arrive!!!!

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

# Changes of version 1.2.0

### - Property req.body sucessfully implemented
### - Method formAsObjectParser implemented
 - It must be used obligatory inside a async function, if not, req.body will be empty

# Another little changes
 - res.json JSDoc corrected
 - res.send JSDoc corrected

> The original name of halley.http is **halley.js**.
>
> But already exist a package with this name on the npm registry and its abandoned​.
>
> Anyway halley.http describes better the intentions of the framework.