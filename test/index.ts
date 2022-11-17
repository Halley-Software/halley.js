import { Halley } from "../lib/index.js";
import dotenv from "dotenv";

dotenv.config();

const { pathname: filename } = new URL("./", import.meta.url)

const app = new Halley({
    port: 5000,
    useNodeEnv: true
})

app.get("/", (req, res) => {
    res.sendFile(filename + "/index.html")
})

app.post("/", async (req, res) => {
    await req.formAsObjectParser()
    console.log(req.body)
    res.send("Peticion enviada")
})

app.ready(app.port, {
    hostname: "0.0.0.0"
})