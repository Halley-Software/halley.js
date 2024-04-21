import { Halley, HRouter } from "../../lib"

const app = new Halley()
const methods = {
  patch: "patch",
  head: "head"
}

app.custom("/", "", (_req, res) => {
  res.send("BRUH")
})


app.ready(5000)