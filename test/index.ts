import { Halley } from "../lib/core/halley"

import * as RTypes from "../lib/core/types/router.types"
import { HRouter } from "../lib/core/router/halley.router"

const halley = new Halley({port: 5000})
const router = new HRouter

router.add([
    {
        path: "/",
        method: "get",
        requestHandler: ((req, res) => {
            res.end("<h1>Hello World!</h1>");
        })
    },
    {
        path: "/about",
        method: "get",
        requestHandler: ((req, res) => {
            res.end("<h1>Hello World from About Page!</h1>");
        })
    },
])

router.add({
    path: "/",
    method: "post",
    requestHandler: ((req, res) => {
        res.end("<h1>Enviando datos!</h1>")
    })
})

halley.use(router)

halley.ready((req, res) => {
    res.end("<h1>Hello World!</h1>")
})