import { Halley } from "../../lib/index.js"
import dotenv from "dotenv"

import { cors } from "./custom/cors.js"
import { routes } from "./routes/routes.js"

dotenv.config({})

const app = new Halley({
  port: 5000,
  useNodeEnv: true
})

/* .register((req, res) => {
  console.log("Hora: " + new Date(Date.now()));
}) */

app.register(cors({origins: "http://localhost:3000"}))
//Buffer.from("< 60 80 10 >")
//app.use(routes)

const { pathname: staticDir } = new URL("./", import.meta.url)

app.serveStatic(staticDir + "./public/")

app.get("/", (req, res) => {
  res.sendFile(staticDir + "index.html")
})

app.post("/", async (req, res) => {
  await req.rawBodyParser()
  console.log(req.body)
  res.send("Recibido")
})

/* app.get("/second", (req, res) => {
  res.send("<h1>Segunda ruta actual</h1>")
}) */

app.ready(5000, {
  hostname: "0.0.0.0",
  message: "Halley esta escuchando en el puerto 5000!"
})