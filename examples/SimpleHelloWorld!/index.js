import { Halley } from "halley.http"

const halley = new Halley({
    port: 5000
})

halley.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

halley.ready(halley.port)