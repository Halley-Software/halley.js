/**
 * The router is a essential part of all the web frameworks.
 * Mostly of time it is used to take the routes gived by the developer and process it somehow.
 */

'use strict';

import { HalleyListener } from "../halley.js";

type UsableMethods = "GET" | "POST" | "PUT" | "DELETE"

/**
 * Route Defines the structure of a route.
 * 
 * It consumes a path, mathod and a handler:
 * Repectively the types are:
 * * path - `string`
 * * method - `UsableMethods` (after all this type is a type of strings)
 * * Function - `HalleyListener`
 * * middleware - `HalleyListener`
 */

export interface Route {
    path: string;
    method: UsableMethods;
    handler: HalleyListener;
    middleware?: HalleyListener
}

export class HRouter {

    /**
     * routerRoutes is an array that contains the routes added from the HalleyRouter
     * 
     * The routes contained in `routerRouter` will be added to the `halleyRoutes` array allocated in `Halley` class
     */
    public readonly routerRoutes: Route[] = [];

    /**
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