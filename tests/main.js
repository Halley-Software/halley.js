import { Halley } from "../halley.js";

const halley = new Halley()
const port = 3000 || process.env.PORT


halley.ready(port)
    .then(console.info(`Server listening on port ${port}`))
    .catch(console.error("Something was wrong attemping to create the server :("))