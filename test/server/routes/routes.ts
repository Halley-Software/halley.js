import { HRouter, Route } from "../../../lib/index.js"

export const router = new HRouter()

const { pathname: __dirname } = new URL("../", import.meta.url)

export const routes: Route[] = [
  {
    path: "/",
    method: "GET",
    handler: (req, res) => {
      res.send("<h1>Hola, Mundo!</h1>")
    },
    middleware: (req, res) => {
      console.log(req.headers.host);
    }
  },
  {
    path: "/",
    method: "POST",
    handler: async (req, res) => {
      await req.rawBodyParser()
      console.log(Buffer.alloc(256).toString("utf-8"))
      res.send(Buffer.alloc(256).toString("utf-8"))
    }
  }
]

router.add(routes)