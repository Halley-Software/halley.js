/**
 * The router is a essential part of all the web frameworks.
 * Mostly of time it is used to take the routes gived by the developer and process it somehow.
 */

'use strict';

/**
 * Node.JS Dependencies
 */

//* Test Expressions
import { ok } from "node:assert";

/**
 * Halley.JS Dependencies
 */

//* Type Anotations
import * as RouterTypes from "../../types/Router.types";

/**
 * Check if all the params was gived, if not, the running script will stop showing a message about it
 * Is responsible of convert the method to an uppercase string too, it makes that the method be suitable for NodeJS http.Server
 * @param {Route} objectRoute A route with path, http method and the respective handler for that route
 * @returns The same literalObject to push to the array that contains all the routes
 */
function checkParams(objectRoute: RouterTypes.Route): RouterTypes.Route {
    let { path, method, handler } = objectRoute;
    // Check if any property wasn't gived
    ok(path);
    ok(method);
    ok(handler);

    // Covering problem that may exist
    method = method.toUpperCase();

    return objectRoute;
}

export class HRouter {

    /**
     * An array that contain all the routes added with router.add method
     */
    private routes: RouterTypes.Route[] = [];

    /**
     * 
     * This is a full-form of declare routes, if you want a more simple way try the short-form declaration, using a Halley instance instead.
     * 
     * @param {Array | Object} incomingRoutes An array or an literal object, if is an array, you can give many routes.
     * 
     * @returns `this` object
     * 
     * Meanwhile, if is a literal object you must use the method as much as routes you want add.
     * 
     * @example
     * // If the param gived is an Array:
     * router.add([{
     *  path: "/",
     *  method: "get",
     *  requestHandler: ((req, res) => {
     *      res.end("<h1>Hello World!</h1>")
     *  })
     * }])
     * 
     * // If the gived param is an literal object:
     * router.add({
     *  path: "/",
     *  method: "get",
     *  requestHandler: ((req, res) => {
     *      res.end("<h1>Hello World!</h1>")
     *  })
     * })
     * // With this way you only can add one route every time 'add' method is called
     */
    public add(incomingRoutes: RouterTypes.Route | RouterTypes.Route[]): this {

        if (Array.isArray(incomingRoutes)) {
            incomingRoutes.forEach((routeItem: RouterTypes.Route) => {
                this.routes.push(checkParams(routeItem));
            });
        }

        else if (Object.getPrototypeOf(incomingRoutes) === Object.prototype) {
            this.routes.push(checkParams(incomingRoutes));
        }

        return this;
    };
};