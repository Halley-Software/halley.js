import { Halley } from "halley.http"

const PORT = 5000 || process.env.PORT;

const halley = new Halley({
    port: PORT,
})

halley.get("/", (req, res) => {
    res.
})

halley.ready(halley.port)