# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.2.0 version of Halley has arrived!!!!

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

### - req.rawBodyParser method was successfully implemented
  ## ⚠️ This property is designed especially to use in react
    - That's fine because in react, commonly you send the data using a native JavaScript fetch or axios methods
    
    - If you want, obviously, you can use it with another tool / framework, but is designed to be tidy to use with react
 - A little example:

 ```js
 // api.frontend.js (frontend file)
 const saveData = async (url: string, body: object) => await fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
 })

 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [url, setUrl] = useState("")

 // Then we send the data using the previous function
 saveData("http://localhost:5000/save", {
    // Where name, description and url are the state variables declared above
    name, description, url
 })
 // In this example I suppose that I'm using a database that accepts a fields with the same names
 // And a React component with the same props name

 ```

 ```ts
 // app.controllers.ts (backend file)
 // The callback function must be asynchronous to read the incoming ReadableStream
 app.post("/save", async (req, res) => {
    await req.rawBodyParser()
    const bodyResult = JSON.parse(req.body)

    // Do stuff with the bodyResult constant
    console.log(bodyResult)
 })
 ```

 - ## This example is fully completed in [this repository](https://github.com/Raxabi/halley.js-API-REST)

## By the halley.js unique author for now - Raxabi <openhalleysoftware@gmail.com>