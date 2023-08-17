/**
 * The router is a essential part of all the web frameworks.
 * It is used to take the routes gived from an input and process them somehow.
 */

'use strict';

/**
 * Halley.JS dependencies
 */
import { Request } from "../request.js";
import HALLEY_ROUTE_ERROR from "../../errors/RouteErrors.js";
import type { HalleyHandler, MiddlewareHandler, PathLike } from "../halley.js";


/**
 * External dependencies
 */
import pathTR from "path-to-regexp";

/**
 * Basic HTTP methods for type-safe
 */
export type BasicMethods = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Route Defines the structure of a route.
 *
 * It consumes a path, mathod, a handler and optionally another handler returned by a function:
 * Repectively the types are:
 * * path - `string or regex`
 * * method - `UsableMethods`
 * * handler - `HalleyListener`
 * * middleware - `HalleyListener`
 */
export interface Route<AdditionalMethods extends string = string> {
    path: PathLike,
    method: AdditionalMethods,
    handler: HalleyHandler,
    middleware?: MiddlewareHandler
}

export interface FunctionalMethods {
    get: (path: PathLike, handler: HalleyHandler, middleware?: MiddlewareHandler) => this,
    post: (path: PathLike, handler: HalleyHandler, middleware?: MiddlewareHandler) => this,
    put: (path: PathLike, handler: HalleyHandler, middleware?: MiddlewareHandler) => this,
    delete: (path: PathLike, handler: HalleyHandler, middleware?: MiddlewareHandler) => this
}

/**
 * HalleyRouter (HRouter) is a vital part of Halley.js
 * 
 * - Save the declared routes via instance methods in an array
 * 
 * - It distinguish the declared routes by the path and HTTP method of that routes
 * 
 * - The `routerPath` is an important known variable of this class,
 *   it is important because is the **base path** from where set off all the declared routes and stars a **new path structure**
 *      - It is called `root` too, making reference from where spread the another routes,
 *          - With `routerPath` we refer to a variable or value used inside the class
 *          - With `root` we refer to an abstract value
 * 
 * For example:
 *  - An HalleyRouter where the `routerPath` is "/about", the `root` path will be "/about"
 *      - From there, a path structure will be extended, for example:
 *          - "/about/career", in this case we understand that "/career" is part of the path structure, "/about"
 *
 * @example
 *      /about <- "root" path for a HalleyRouter
 *         |
 *    -----|-----
 *    |         |
 *    |         |
 * /career  /history
 * 
 * // "/career" and "/history" is part of the "/about" path structure,
 * // so it can be accessed by from "/about/career" or "/about/history"
 * 
 * // Keep in mind that, the `root` path can have his own path too by type a route where the path is "/",
 * // Then we can access to the `root` path of a HalleyRouter with the `routerPath` in this example "/about"
 */
export class HRouter implements FunctionalMethods {

    /**
     * The localRoutes is an array that contain all the routes declared through the Halley methods (get, post, ...) or the HalleyRouter
     */
    private routeStack: Route[];

    /**
     * `root` path of the router
     */
    private routerPath: string;

    /**
     * @param path `root` path of the router
     * @param initialRoutes Array containing all the routes, initially can containg some routes, if empty it will be filled using instance methods: get, post, ...
     */
    public constructor(path: string, initialRoutes: Route[]) {
        // If initial routes are provides it will the default value for route stack, else the initial value will be a empty array
        this.routeStack = initialRoutes;
        this.routerPath = path;
    }
    



     * 
     * This is a full-form of declare routes, if you want a more simple way try the short-form declaration, using a Halley instance instead.
     * 
     * @param {Array | Object} incomingRoutes An array or an literal object, if is an array, you can give many routes.
     * 
     * Meanwhile, if is a literal object you must use the method as much as routes you want add.
     * 
     * @example
     * // If the param gived is an Array:
     * router.add([{
     *      path: "/",
     *      method: "get",
     *      handler: ((req, res) => {
     *          res.end("<h1>Hello World!</h1>")
     *      })
     * }])
     * 
     * // If the gived param is an literal object:
     * router.add({
     *      path: "/",
     *      method: "get",
     *      handler: ((req, res) => {
     *          res.end("<h1>Hello World!</h1>")
     *      })
     * })
     * // With this way you only can add one route every time 'add' method is called
     * 
     * @returns `this` object
     */
    public add(incomingRoutes: Route | Route[]): this {

        if (Array.isArray(incomingRoutes)) {
            incomingRoutes.forEach((routeItem: Route) => {
                this.routerRoutes.push({
                    path: routeItem.path,
                    method: routeItem.method,
                    handler: routeItem.handler
                });
            });
        }

        else if (Object.getPrototypeOf(incomingRoutes) === Object.prototype) {
            this.routerRoutes.push({
                path: incomingRoutes.path,
                method: incomingRoutes.method,
                handler: incomingRoutes.handler
            });
        }
        return this;
    }
}