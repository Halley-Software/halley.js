import { Halley } from "../lib/core/halley";
import { HRouter } from "../lib/core/router/halley.router";
import { type Handler } from "../lib/core/halley";

const halley = new Halley
const router = new HRouter

router.get()

const app: Handler = (req, res) => {
    res.end("<h1>Hello World from premature Halley.JS</h1>")
}

halley.ready(app, 3000)