//import { Halley, HRouter, PathLike, MiddlewareHandler } from "../../lib/index"

import halley, { type MiddlewareHandler } from "../../lib"

const app = halley()

const cors: (opts: {origin: string}) => MiddlewareHandler = ({ origin }) => {
  return (req, res) => {}
}