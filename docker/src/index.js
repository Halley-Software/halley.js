import { Halley } from "@laniakeajs/halley.http@development"

const app = new Halley()

app.get("/", (_, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.ready(5000)