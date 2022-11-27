import { Halley } from "../lib/index.js";
import dotenv from "dotenv";

dotenv.config();

const { pathname: __dirname } = new URL("./", import.meta.url)
const filename = __dirname.replace("/", "");

const app = new Halley({
    port: 4000,
    useNodeEnv: true
})

app.get("/", (req, res) => {
    res.sendFile(filename + "/index.html")
})

app.post("/", async (req, res) => {
    await req.rawBodyParser()
    console.log(req.body)
    res.send("Peticion enviada")
})

app.ready(app.port, {
    hostname: "0.0.0.0"
})