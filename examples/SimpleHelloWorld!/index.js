// Replace the import path by 'halley.http'
import { Halley } from "../../dist/index.js"

const halley = new Halley({
    port: 5000
})

halley.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})