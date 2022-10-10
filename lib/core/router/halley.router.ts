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
import { Route, RouteParam } from "../../types/router.types";

export class HRouter {

    /**
     * An array that contain all the routes added with router.add method
     */
    public readonly routes: Route[] = [];

    /**
     * 
     * This is a full-form of declare routes, if you want a more simple way try the short-form declaration, using a Halley instance instead.
     * 
     * @param incomingRoutes An array or an literal object, if is an array, you can give many routes.
     * 
     * Meanwhile, if is an literal object you must use the method as much as routes want add.
     * 
     * @example
     * // If the param gived is an Array:
     *      router.add([{
     *          path: "/",
     *          method: "get",
     *          requestHandler: ((req, res) => {
     *              res.end("<h1>Hello World!</h1>")
     *          })
     *      }])
     * 
     * @example
     * // If the gived param is an literal object:
     *      router.add({
     *          path: "/",
     *          method: "get",
     *          requestHandler: ((req, res) => {
     *              res.end("<h1>Hello World!</h1>")
     *          })
     *      })
     * // With this way you only can add one route every time 'add' method is called
     * 
     * @returns The route stack of the class HRouter
     * 
     * @public
     */

    public add(incomingRoutes: RouteParam): this {

        function checkParams(objectRoute: Route): Route {
            let { path, method, handler } = objectRoute;
            // Check if any property wasn't gived
            ok(path);
            ok(method);
            ok(handler);

            // Covering problem that may exist
            method = method.toUpperCase();

            return objectRoute;
        }

        if (Array.isArray(incomingRoutes)) {
            incomingRoutes.forEach((routeItem: Route) => {
                this.routes.push(checkParams(routeItem));
            });
        }

        else if (Object.getPrototypeOf(incomingRoutes) === Object.prototype) {
            this.routes.push(checkParams(incomingRoutes))
        };
        
        return this;
    };
};