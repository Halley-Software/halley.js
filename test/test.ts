import { Halley, type RouteHandler } from "../lib/core/halley";
import { HRouter } from "../lib/core/router/halley.router";

const halley = new Halley
const router = new HRouter

router.get("/", (req, res) => {
    res.end(`<h1>Hello World! from ${req.url} with Halley.JS`)
})