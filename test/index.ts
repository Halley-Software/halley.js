import { Halley } from "../lib/core/halley.js"
import { HColors } from "../lib/utils/halley.colors.js"

const PORT = 5000 || process.env.PORT;

const halley = new Halley({
    port: PORT,
    env: "development"
})

const HColor = new HColors(`Server listening on port ${PORT}`, "5000")

halley.get("/", async (req, res) => {
    await res.sendFile()
})

halley.post("/", (req, res) => {
})

halley.ready(3000)