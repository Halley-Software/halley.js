import { Halley } from "../../lib/index.js"
import dotenv from "dotenv"

import { cors } from "./custom/cors.js"

dotenv.config({})
const { pathname: filename } = new URL("./", import.meta.url)

const app = new Halley({
  port: 5000,
  useNodeEnv: true
})

//app.use(cors({origins: "http://localhost:3000"}))

app.get("/", (req, res) => {
  res.sendFile(filename + "index.html")  
}, cors({origins: "http://localhost:3000"}))

app.get("/second", (req, res) => {
  res.send("<h1>Segunda ruta actual</h1>")
}, cors({origins: "http://localhost:4000"}))

app.ready(5000, {
  hostname: "0.0.0.0",
  message: "Halley esta escuchando en el puerto 5000!"
})