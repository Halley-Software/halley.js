/**
 * The router is a essential part of all the web frameworks.
 * It is used to take the routes gived from an input and process them somehow.
 */

'use strict';

/**
 * Halley.JS dependencies
 */
import type { HalleyListener, MiddlewareReturn, PathLike } from "../halley.js";
import { Request } from "../request.js";

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
    handler: HalleyListener,
    middleware?: MiddlewareReturn
}

export class HRouter {

    /**
     * The localRoutes is an array that contain all the routes declared through the Halley methods (get, post, ...) or the HalleyRouter
     */
    protected readonly routerRoutes: Route[] = [];

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