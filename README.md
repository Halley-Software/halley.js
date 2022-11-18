# Halley.JS ☄️
# The small, fast and easy web framework.

## The 1.1.0 version of Halley has arrived!!!!

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

# Changes of version 1.1.0

### - Request property of class req is now successfully implemented!
 - An little example:
 ```ts
 // The callback function must be asynchronous to read the incoming ReadableStream
 app.post("/", async (req, res) => {
    await req.formAsObjectParser()
    // 'formAsObjectParser' method must be explicit executed with the 'await' keyword
    // if await is not indicated, the req.body will be empty
    console.log(req.body)
    res.send("Response sended")
})
 ```
 Supposing that the data is sended through a HTML form.<br>
 And that form contains a 'input' tag with a 'name' attribute:<br>
 When the event send the data to the server, the output should be something like this:<br><br>
 ```[ { Testing: 'req.body' } ]```<br><br>
 Where the 'Testing' key of the object inside the array is the value of 'name' attribute indicated in the HTML form.<br>
 And the value of the object inside the array is the value inserted at the 'input' element.

# Another little changes
 - hostname indicated at 'ready' method is now checked with a nullish operator
 - environment state now is checked with a nullish operator

## By the halley.js unique author for now - Raxabi <openhalleysoftware@gmail.com>