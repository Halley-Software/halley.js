# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.2.1 version of Halley has arrived!!!!

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

# Changes of version 1.2.1

### - req.formAsObjectParser method was successfully implemented
  ## ⚠️ This property is designed especially to use in HTML forms (template engines or similars should be works nicely anyway)

    - If you want, obviously, you can use it with another tool / framework, but is designed to be tidy to use with HTML forms

  ## - A litte example:
  ```js
     // The callback function must be asynchronous to read the incoming ReadableStream
     app.post("/", async (req, res) => {
       await req.formAsObjectParser()
       // 'formAsObjectParser' method must be explicit executed with the 'await' keyword
       // if await is not indicated, the req.body will be empty
       console.log(req.body)
       res.send("Response sent")
     })
  ```

  Supposing that the data is sended through a HTML form.<br/>
  And that form contains a 'input' tag with a 'name' attribute:<br/>
  When the event send the data to the server, the output should be something like this:<br/>

  ` [ { Testing: 'req.body' } ]`

  Where the 'Testing' key of the object inside the array is the value of 'name' attribute indicated in
  the HTML form.<br/>
  And the value of the object inside the array is the value inserted at the 'input' element.

### - req.rawBodyParser method was successfully implemented
  ## ⚠️ This property is designed especially to use in react, vue or another framework where you use fetch to send data to the frontend
    - That's fine because in react, vue, etc..., commonly you send the data using a native JavaScript fetch or axios methods
    - And the 'name' attributes in 'input' JSX elements are ineffective using fetch or similars
    
    - If you want, obviously, you can use it with another tool / framework.
    - But is designed to be tidy to use with frameworks where you use fetch as a way to send data

  ## - A little example:

 ```js
 // api.frontend.ts (frontend file)
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

    // To show how it works:
    // we has sent a object stringified with fetch
    // Now in the backend we convert it back to a JavaScript literal object
    // and finally we have the properties that we had used in react
    console.log(bodyResult.name)
    console.log(bodyResult.description)
    console.log(bodyResult.url)
 })
 ```

 - ## This example is fully completed in [this WIP repository](https://github.com/Raxabi/halley.js-API-REST)

## By the halley.js unique author for now - Raxabi <openhalleysoftware@gmail.com>