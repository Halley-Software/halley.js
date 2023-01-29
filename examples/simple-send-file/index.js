import { Halley } from "halley.http";

const app = new Halley({
    port: 5000
})

//const { pathname: publicDir } = new URL("./public/", import.meta.url)

app.get("/", (req, res) => {
    res.sendFile("./" + "index.html")
})

app.ready(app.port)