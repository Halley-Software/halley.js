import Halley from "../lib/core/halley.js";
import { handler } from "./main.js";

const halley = new Halley
const port = 3000

await halley.ready(handler, port)