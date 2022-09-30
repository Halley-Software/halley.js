import { Halley } from "../lib/core/halley.js"
import { HColors } from "../lib/utils/halley.colors.js"

const halley = new Halley({
    port: 5000
})

const colors = new HColors("Server listening on port 5000", "5000")

halley.get("/", (req, res) => {
})

console.log(halley)

halley.ready(colors.print("cyan"))