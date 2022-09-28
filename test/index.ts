import { Halley } from "../lib/core/halley"
import { HColors } from "../lib/utils/halley.colors"

const halley = new Halley({
    port: 5000,
    env: "development"
})

const hcolors = new HColors(`Halley listening on port ${halley.port}`, `${halley.port}`)

halley.get("/", (req, res) => {
    res.end("<h1>Hello World!</h1>")
})

halley.get("/sexo", (req, res) => {
    res.end("<h1>Hello from Sex</h1>")
})

try {
    halley.ready(hcolors.print("cyan"))
} catch (error: any) {
    console.error(error)
}