import { HRouter, Route } from "../../lib/index.js"

export const router = new HRouter()

const { pathname: __dirname } = new URL("../", import.meta.url)
const filename = __dirname.replace("/", "")

export const routes: Route[] = [
  {
    path: "/",
    method: "GET",
    handler: async (req, res) => {
      res.sendFile(filename + "index.html")
    }
  },
  {
    path: "/hello",
    method: "GET",
    handler: (req, res) => {
      res.send("Hello World!")
    }
  },
  {
    path: "/",
    method: "POST",
    handler: async (req, res) => {
      await req.formAsObjectParser()
      req.body.forEach(item => console.log(item))
      res.send("Peticion enviada")
    }
  }
]

router.add(routes)