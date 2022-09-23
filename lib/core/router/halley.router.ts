'use strict';

/**
 * Node.JS Dependencies
 */

//* Type Anotation
import { RequestListener } from "node:http";

//* Test Expressions
import { ok } from "node:assert";

/**
 * Halley.JS Dependencies
 */
import { Request } from "../request";
import { Reply } from "../response";

//* Type Anotation
import * as RTypes from "../types/router.types";

// Types Halley Router

export class HRouter {

    private routes: RTypes.Route[] = [];

    /**
     * 
     * @Anotation This is a full-form of declare routes, if you want a more simple way try the short-form declaration, using a Halley instance instead.
     * 
     * @param optionsStack An array or an literal object, if is an array, you can give many routes.
     * 
     * Meanwhile, if is an literal object you must use the method as much as routes want add.
     * 
     * @example
     *      const router = new HRouter
     *      router.add([{
     *          path: "/",
     *          method: "get",
     *          requestHandler: ((req, res) => {
     *              res.end("<h1>Hello World!</h1>")
     *          })
     *      }])
     * 
     * @returns The route stack of the class HRouter
     * 
     * @public
     */
    public add(optionsStack: RTypes.RouteParam) {

        if (Array.isArray(optionsStack)) {
            optionsStack.forEach((routeItem: RTypes.Route) => {
                // Check if any property wasn't gived
                ok(routeItem.path);
                ok(routeItem.method);
                ok(routeItem.requestHandler);

                // Covering problem that may exist
                routeItem.method = routeItem.method.toUpperCase();

                this.routes.push(routeItem);
            });
        }

        else if (Object.getPrototypeOf(optionsStack) === Object.prototype) {
            ok(optionsStack.path);
            ok(optionsStack.method);
            ok(optionsStack.requestHandler);
    
            // Covering problem that may exist
            optionsStack.method = optionsStack.method.toUpperCase();
    
            this.routes.push(optionsStack);
        };
    };
};