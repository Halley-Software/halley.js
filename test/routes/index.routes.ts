import { HRouter } from "../../lib/core/router/halley.router"

import { main } from "../controllers/index.controllers"

const router = new HRouter

export const mainRoute = router.use({path: "/", method: "get", requesthandler: main})