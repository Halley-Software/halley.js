import { Halley } from "../lib/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = new Halley({
    port: 5000,
    useNodeEnv: true
})

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

console.log(app)

app.ready(app.port)