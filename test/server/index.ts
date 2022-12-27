import { Halley,  } from "../../dist/index.js"
import { cors } from "@tinyhttp/cors"
import dotenv from "dotenv"

dotenv.config()

const { pathname: filename } = new URL("./", import.meta.url)

const app = new Halley({
  port: 5000,
  useNodeEnv: true
})

app.use(cors({origin: "http://localhost:3000"}))

//app.serveStatic(filename + "public")

app.get("/", (req, res) => {
  res.send("Peticion recibida desde los cors de halley.http usando la libreria @tinyhttp/cors")
})

app.ready(5000, {
  hostname: "0.0.0.0",
})