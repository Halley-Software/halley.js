import HRouter from "../lib/core/router/halley.router.js"

const encoder = new TextEncoder

export const handler = (req) => {
    if (req.url === "/") {
        function main(req, res) {
            res.write(encoder.encode("<h1>LOL esta es la ruta Principal</h1>"))
            res.end()
        }
    }

    if (req.url === "/about") {
        function about(req, res) {
            res.write(encoder.encode("<h1>LOL esta es la ruta About</h1>"))
            res.end()
        }
    }
}