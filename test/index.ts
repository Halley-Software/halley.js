import { Halley } from "../dist/index.js"

const PORT = 5000 || process.env.PORT;

const halley = new Halley({
    port: PORT,
    env: "development"
})

halley.get("/", (req, res) => {
    res.json("lol")
})

halley.ready(halley.port, {
    hostname: "0.0.0.0"
})