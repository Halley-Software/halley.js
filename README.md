# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.3.0 version of Halley has arrived!!!!

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

# Changes of version 1.3.0

## - Middlewares support!
  - ## But what is a middleware?
    - ### The concept of a middleware was took from express and its basically a function that can take zero or more arguments<br>and return another function that take a request and a response as parameters
    - ### Then when we call the first function, the return value, that is, the function previously mentioned that take a request and a response.<br>Is passed to Halley.js and it will execute it when a request reach to our server
    - ### A middleware allow we to modify the request and the response, for example to modify the headers of the response

  ### - An little and a bit dirty example of a middleware that allow we to modify the CORS headers:
  ```ts
  // simple-server-middlewares/cors.ts
  import { Request, Reply } from "halley.http";

  interface CorsOptions {
      credentials?: boolean,
      headers?: string[],
      methods?: string | string[],
      origins?: string | string[],
      exposedHeaders?: string[]
      age?: number    
  }
  
  const kDefaultOptions: CorsOptions = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origins: "*"
  }
  
  export const cors = (options: CorsOptions = kDefaultOptions) => {
    return function(_req: Request, res: Reply) {
      if (options.origins) {
        res.setHeader("Access-Control-Allow-Origin", options.origins)   
      }
    }
  }
  ```

  ### - Now we'll use this new middleware
  ```ts
  // simple-server-middlewares/index.ts
  import { Halley } from "halley.http"
  import { cors } from "./cors.ts"

  const halley = new Halley({
    port: 5000,
    env: "development"
  })

  halley.register(cors({origins: "http://localhost:3000"}))

  halley.get("/", (req, res) => {
    // Now when we visit the HTML on the browser, we will see the 'Access-Control-Allow-Origin' header on the response section, to see it:
    // Open the developer tools on your favorite browser > go to networking section > click on the '/' file > in the response headers you will see the header
    res.send("<h1>Hello, World!</h1>")
  })

  halley.ready(5000)
  ```

  ### - Alternately we can use a middleware individually for one specific route
  ```ts
  import { Halley } from "halley.http"
  import { cors } from "./cors.ts"

  const halley = new Halley({
    port: 5000,
    env: "development"
  })

  halley.get("/", (req, res) => {
    res.send("<h1>Hello, World!</h1>")
  }, cors({origins: "http://localhost:3000"}))

  halley.get("/second", (req, res) => {
    res.send("<h1>This is the secondary route</h1>")
  })

  // In this example, the middleware will only be executed on the '/' route. You can check it as the same way that we see the previous example
  halley.ready(5000)
  ```

  ### - If you want, you can use both methods of use a middleware, for example:
  ```ts
  import { Halley } from "halley.http"
  import { cors } from "./cors.ts"

  const halley = new Halley({
    port: 5000,
    env: "development"
  })

  halley.register(cors({origins: "http://localhost:10000"}))

  halley.get("/", (req, res) => {
    res.send("<h1>Hello, World!</h1>")
  }, cors({origins: "http://localhost:3000"}))

  halley.get("/second", (req, res) => {
    res.send("<h1>This is the secondary route</h1>")
  })

  // In this example, the middleware that allow 'Access-Control-Allow-Origin' to http://localhost:3000 will only be executed in the '/' route
  // But 'Access-Control-Allow-Origin' will be allowed for http://localhost:10000 host, however the http://localhost:3000 host is not allowed at '/second'
  halley.ready(5000)
  ```

  ### - Since middlewares have the same struct and functionality that express and other framework based on it you can use some middlewares in halley.js too!
  ### - Keep in mind that some middlewares may not work in halley.js, for example, the cors library from express dont works (almost for now).<br>But the cors from tinyhttp lib do it!

  ### - As time passes the Halley-Software will publish some middlewares that works fine with Halley.js
#
## By the halley.js unique author for now - Raxabi < openhalleysoftware@gmail.com >