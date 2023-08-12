# Halley.JS ☄️

## The small, fast and easy web framework

## The 2.0.0 version of Halley has arrived

Fast getting started:

```js
import { Halley } from "halley.http"

const halley = new Halley({
  environment: "development"
})

halley.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

halley.ready(5000)
```

## Changes of version 2.0.0

- Now you listen on a port describing the port on `Halley.prototype.ready` function instead of the constructor

- `Request.prototype.body` property has now `string` type, giving the user more versatility to use this variable

- You can add some initial routes in the constructor using the `initialRoutes` property

- Added `Halley.prototype.custom` allowing the user use HTTP methods the he defines

- Now you can change the response when the requested route would not found in the route stack using `Halley.prototype.setError`

  - For example:

    ```ts
    import { Halley, type Route } from "@laniakeajs/halley.http"

    const app = new Halley()

    app.setError = (_, res) => {
      res
        .status(404)
        .setHeader("Content-Type", "text/html")
        .write("<head><style>body {background-color: #242424;color: white}</style></head>")
      res.send("<h2>This route does not exists!</h2>")
    }

    ...
    ```

- Now the `Route` interface have an optional generic type, to indicate the HTTP Methods that are alloweds

  - For example, imagine that u want separe the "GET" and "POST" routes in differents arrays and then add them to Halley.js using `Halley.prototype.use`

    ```ts
    import { Halley, type Route } from "../../lib/index.js";

    const app = new Halley()

    // Indicating the HTTP Method, guarantees that just can use the "GET" method
    const getRoutes: Route<"GET">[] = [{
      path: "/",
      method: "GET",
      handler: (_req, res) => {
        res.send("<h1>Hello GET!</h1>")
      }
    }]

    // The same occurs when using POST
    const postRoutes: Route<"POST">[] = [{
      path: "/",
      method: "POST",
      handler: (_req, res) => {
        res.send("<h1>Hello POST!</h1>")
      }
    }]

    app.use(getRoutes).use(postRoutes)

    app.ready(5000)
    ```

  - If no generic is provided, the default methods passed to the generic are GET, POST, PUST and DELETE

- URL parameters is now allowed using colons before the parameter name

  - We are simulating a web store, to use parameters in our path url we can must keep in mind the next:

    - The url parameters must begins with colon before the parameter name like this: ":parameter", look the next example:

    ```ts
    app.get("/products/:name", (req, res) => {
      res.send("<h1>The product: " + req.params.name + " is available</h1>")
    })
    ```

    We are requesting the product on that store that have the same name in the database that the parameter `name`

- You can use regular expressions instead a string to indicate the route path

  - Lets try using a regular expresion, in this case using a literal regular expression:

    ```ts
    app.get(/\/ab?cd/, (_req, res) => {
      res.send("<h1>Ruta con expresion regular!</h1>")
    })

    // With this regex, you can access to /abcd or /acd, but not to /bcd or /cd
    ```

    - Using a constructor:

    ```ts
    app.get(new RegExp("/[a-zA-Z0-9]+s$"), (_req, res) => {
      res.send("<h1>Ruta con expresion regular usando un constructor!</h1>")
    })

    // With this regex, you can access to /products, /elements, /users
    // Or any other route that includes letter from a to z without case sensitive o any number in any position
    // As long as the route ends with 's', but it can not contains only 's' for example: /s
    ```

    - Of course, if you dont beings your route paths with a '/' it will throw an error too, an example would be this:

    ```ts
    // Here we are using a literal regex, in this case, you need to escape the slash character (/), like in this example
    app.get(/\/route1/, ...)
    ```

    - In another way if you doesnt escape the character JavaScript / TypeScript will conside the line a comment:

    ```ts
    app.get(//route1/, ...)
    ```

    - Or if you try to not escape the character and just write the literal regex, will throw an error, like this:

    ```ts
    app.get(/route1/, ...)

    // Cause an HALLEY_ROUTE_DO_NOT_START_WITH_SLASH exception
    ```

    In this case Halley.js throws an HALLEY_ROUTE_DO_NOT_START_WITH_SLASH exception

    - Would happen the same if you use the `RegExp` constructor using the new operator:

    ```ts
    app.get(new RegExp("route1"), ...)

    // Cause an HALLEY_ROUTE_DO_NOT_START_WITH_SLASH exception
    ```

## Internal details

- Regexs path are checked using the `RegExp.prototype.source` property, it returns a string containing the regex content:

  1. In the case of a literal regex the value between both slashes are returned

  2. In the case of a regex created using his constructor;

      1. If a literal regex is passed, cause the `1.` step behavior

      2. If a string is passed, returns that string but scaping some characters like slashes

          - like in this example:

          ```ts
          new RegExp("/route1").source // Output -> \/route1 <- The escape character is added automatically to escape the slash
          ```

  - In this way Halley.js forces you to add a slash at the route path begins, checking the [1] string position that returns `RegExp.prototype.source`

- `Halley` class now inherit from the `HRouter` class

- Now path parameters validation occurs in the HRouter path using `path-to-regexp` package, its useful, zero dependencies and easy to use

- The Request and Reply / Response objects are now passed as parameters instead of being a class property

- Middlewares are now resolved using Promise class methods like `Promise.resolve` or `Promise.all`

- The global middleware array changed his name to `middlewareStack`, now is called similar to the route array

## Fixes

- Fix bug that doesnt allow use global middlewares and local middleware simultaneously (in method `makeSuitable` validation)

## By the halley.js unique author for now - Raxabi <openhalleysoftware@gmail.com>
