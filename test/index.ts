import { Halley, HColors } from "../dist/index.js"

const PORT = 5000 || process.env.PORT;

const halley = new Halley({
    port: PORT,
    env: "development"
})

const HColor = new HColors(`Server listening on port ${halley.port}`, "5000")

halley.get("/", (req, res) => {
    const { pathname: file } = new URL("index.html", import.meta.url)
    res.sendFile(file, "utf-8")
})

halley.ready(halley.port, HColor.print("cyan"))