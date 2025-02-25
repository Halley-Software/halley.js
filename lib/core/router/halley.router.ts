/**
 * The router is a essential part of all the web frameworks.
 * It is used to take the routes gived from an input and process them somehow.
 */

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
export interface Route<Params extends string[] = string[], AdditionalMethods extends string = string> {
    path: PathLike,
    method: AdditionalMethods,
    handler: HalleyHandler<Params>,
    middleware?: MiddlewareHandler<Params>
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
 *   it is important because is the **base path** from where set off all the declared routes and starts a **new path structure**
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
    private readonly routeStack: Route[];

    /**
     * `root` path of the router
     */
    private routerPath: string;

    /**
     * @param {string} path `root` path of the router
     * @param {Route[]} initialRoutes Array containing all the routes, initially can containg some routes, if empty it will be filled using instance methods: get, post, ...
     */
    public constructor(path: string, initialRoutes: Route[]) {
        // If initial routes are provides it will the default value for route stack, else the initial value will be a empty array
        this.routeStack = initialRoutes;
        this.routerPath = path;
    }
    
    /**
     * Returns all the declared routes
     */
    public get getRoutes(): Route[] {
        return this.routeStack;
    }

    /**
     * Iterate over the route stack and matches the params on the incoming request attaching them to the request object
     * @param {string} path The url path of the incoming request
     * @param {string} method The method of the incoming request
     * @param {Request} req The incoming request object 
     * @returns The literal object that had matched with the search patterns
     */
    protected iterateRoutes(path: string, method: string, req: Request): Route | undefined {
        return this.routeStack.find((route) => {
            const pathRegex = pathTR.pathToRegexp(route.path);
            const matcher = pathTR.match(route.path);
            const matches = matcher(path);
            if (matches) {
                req.params = {...matches.params};
            }

            return pathRegex.test(path) && route.method === method;
        });
    }

    /**
     * Returns a different value just as the value of the parameters:
     * 
     * `base root` = default `routerPath` later assigned by the Halley class -> "/"
     * 
     *  - If the `routerPath` is `base root`, that is "/", the returned value is exactly the same that `path` is when passed as argument
     *  - If the `routerPath` is not "/":
     *      @case
     *      - If path type is **string**:
     *          - When path is `root`, then it is understood that the `path` will be the same than the `routerPath`
     *              * We assigns the `path` value without modify it
     *          - If path is not `root`, then the value is the `routerPath` plus `path`
     *              * To succeed this, we delete the first character and plus the `routerPath` to the result of that operation
     *      @case
     *      - If path type is a **RegExp**:
     *          - When path is `root`, then it is understood that the `path` will be the same than the `routerPath`
     *              * We compare the `RegExp.prototype.source` to a string with value "\/" representing the root being scaped to check this
     *          - If path is not `root`. then the value is the `routerPath` plus `path`
     *              * To succeed this, we delete the scape character from the `RegExp.prototype.source` and plus the `routerPath` to the result of that operation
     */
    private handlePath(routerPath: string, path: PathLike): PathLike {
        const resolvedPath: PathLike =
            routerPath === "/" ? path :
            typeof path === "string" ? path === "/" ? routerPath : // If there are a declared route with "/" path and the `routerPath` is not "/"
            routerPath + path.substring(0) :
            path.source === "\/" ? path :
            new RegExp(routerPath + path.source.substring(1));

        return resolvedPath;
    }

    /**
     * This is a full-form of declare routes, if you want a more simple way try the short-form declaration, using a Halley instance instead.
     *
     * @param {Route | Route[]} incomingRoutes An array or an literal object, if is an array, you can give several routes.
     *
     * Meanwhile, if is a literal object you must use the method as much as routes you want add.
     *
     * @example
     * // If the param gived is an Array:
     * router.add([{
     *      path: "/",
     *      method: "GET",
     *      handler: (req, res) => {
     *          res.end("<h1>Hello World!</h1>")
     *      }
     * }])
     *
     * // If the gived param is an literal object:
     * router.add({
     *      path: "/",
     *      method: "GET",
     *      handler: (req, res) => {
     *          res.end("<h1>Hello World!</h1>")
     *      }
     * })
     * // With this way you only can add one route every time 'add' method is called
     *
     * @returns `this` The object itself
     */
    public add<Params extends string[] = string[], Methods extends string = BasicMethods>
        (incomingRoutes: Route<Params, Methods> | Route<Params, Methods>[]): this
    {
        if (Array.isArray(incomingRoutes)) {
            incomingRoutes.forEach((routeItem) => {
                this.routeStack.push({
                    path: this.handlePath(this.routerPath, routeItem.path),
                    method: routeItem.method,
                    handler: routeItem.handler,
                    middleware: routeItem.middleware
                });
            });
        } else if (Object.getPrototypeOf(incomingRoutes) === Object.prototype) {
            this.routeStack.push({
                path: this.handlePath(this.routerPath, incomingRoutes.path),
                method: incomingRoutes.method,
                handler: incomingRoutes.handler,
                middleware: incomingRoutes.middleware
            });
        }
        return this;
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * halley.get works over the get http verb / method.
     *
     * Is commonly used to request data to the server
     *
     * @param {string | RegExp} path The path where the listener will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     */
    public get<RParams extends string[] = string[]>
        (path: PathLike, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }

        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add<RParams, "GET">({path, method: "GET", handler, middleware});
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * Different from halley.post, post works over the post http verb / method.
     *
     * Is commonly used to send data to the server
     *
     * @param {string | RegExp} path The path where the listener will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     */
    public post<RParams extends string[] = string[]>
        (path: PathLike, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }
        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add<RParams, "POST">({path, method: "POST", handler, middleware});
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * Different from other halley methods, put works over the put http verb / method.
     *
     * Is commonly used to update data to the server
     * @param {string | RegExp} path The path where the listener will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     */
    public put<RParams extends string[] = string[]>
        (path: PathLike, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }
        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add<RParams, "PUT">({path, method: "PUT", handler, middleware});
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * Different from other halley methods, delete works over the delete http verb / method.
     *
     * Is commonly used to delete data from the server (for exameple a field of one row in a sql database)
     * @param {string | RegExp} path The path where the listener will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     */
    public delete<RParams extends string[] = string[]>
        (path: PathLike, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {    
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }
        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add<RParams, "DELETE">({path, method: "DELETE", handler, middleware});
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * Different from other halley methods, options works over the options http verb / method.
     * Is commonly used along with put or delete methods among others
     *
     * Is commonly used to delete data from the server (for exameple a field of one row in a sql database)
     * @param {string | RegExp} path The path where the listener will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     */
    public options<RParams extends string[] = string[]>
        (path: PathLike, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }
        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add<RParams, "OPTIONS">({path, method: "OPTIONS", handler, middleware});
    }

    /**
     * Push a new object with the params to an array with all the routes of the running project
     *
     * By default, the function typing includes basic additional methods described that commonly used like HEAD, PATCH and OPTIONS
     * 
     *  - If using TypeScript, the method will be safe-type in accordance with generic type
     * 
     *  - If using JavaScript, can use JSDoc above the function
     * 
     * Affects to the route with the method that the user specifies
     *
     * @template {UsableMethods}
     * @param {string | RegExp} path The path where the listener will execute
     * @param {UsableMethods} method The HTTP method over the route will execute
     * @param {HalleyHandler} handler A callback function that will execute when the route is visited
     * @param {MiddlewareHandler | undefined} middleware A middleware that only will be used in the route that is called
     * @throws {HALLEY_ROUTE_ERROR} If the `path` does not starts with a slash '/'
     * @returns `this` The object itself
     *
     * @example
     * // example for TypeScript
     * app.custom<"TRACE">("/", "TRACE", (req, res) => {...})
     */
    public custom<RParams extends string[] = string[], UsableMethods extends string = "HEAD" | "PATCH" | "OPTIONS">
        (path: PathLike, method: UsableMethods, handler: HalleyHandler<RParams>, middleware?: MiddlewareHandler<RParams>): this
    {
        if (typeof path === "string") {
            if (path[0] !== "/") {
                throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
            }
        } else if (path.source[1] !== "/") {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        return this.add({path, method: method.toUpperCase(), handler, middleware});
    }
}
