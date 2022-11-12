import { Halley } from "../lib/index.js"

const PORT = 5000 || process.env.PORT;

const halley = new Halley({
    port: PORT,
    env: "development"
})

halley.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
    req.
})

halley.ready(halley.port)