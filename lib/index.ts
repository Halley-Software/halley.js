import type {
    HalleyHandler as THalleyHandler,
    MiddlewareHandler as TMiddlewareHandler,
    PathLike as TPathLike,
    HalleyOptions,
    ListenOptions
} from "./core/halley.js";

export type HalleyHandler = THalleyHandler
export type MiddlewareHandler = TMiddlewareHandler
export type PathLike = TPathLike

export type { ListenOptions, HalleyOptions }

import { Halley } from "./core/halley.js";
import { HRouter } from "./core/router/halley.router.js";
export { Request } from "./core/request.js";
export { Reply } from "./core/reply.js";

export { Halley, HRouter }

/**
 * Just inoke the function at get your instance of Halley!
 * @param options create the instance with predefined options
 * @returns A new Halley instance
 */
export default function halley(options?: Partial<HalleyOptions>) {
    return new Halley(options)
}

/**
 * Creates a new router by invoke the function
 * @param path path where the router will register the routes 
 * @returns A new HRouter instance
 */
export function createRouter(path: string) {
    return new HRouter(path, [])
}