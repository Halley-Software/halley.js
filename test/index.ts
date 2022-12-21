import { Halley } from "../lib/index.js"
import dotenv from "dotenv"
import { router } from "./routes/main.js"

dotenv.config()

const { pathname: __dirname } = new URL("./", import.meta.url)
const filename = __dirname.replace("/", "")

const app = new Halley({
  port: 4000,
  useNodeEnv: true
})

app.use(router)

app.serveStatic(filename + "public")

app.ready(app.port, {
  hostname: "0.0.0.0",
})