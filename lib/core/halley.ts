/**
 * Coded by Raxabi from Halley Software Open Source Developer Team. HSOSDT
 * 
 * Can call it Halley Software Developer Team. HSDT, because all that we make is Open Source :D
 * 
 * Contributors on root of the project, "/contributors.js"
 * 
 */

/**
 * Halley is the main core of the project.
 * Here all the another classes and objects are grouped and send to the node HTTP server
 */

/**
 * Halley.js use and take as reference some third-party modules, so here are the mentions about there :D
 * 
 * Halley.js borned as a inspiration in express, so, it had taken some things from it like: The request and response classes
 * 
 * Halley.js use the pino logger https://github.com/pinojs/pino
 * 
 * Halley.js take some things as reference from tinyhttp like: properties used at tsconfig.json https://github.com/tinyhttp/tinyhttp
 * 
 */

'use strict';

/**
 * Node.JS dependencies
 */

import { Server, createServer, ServerOptions } from "node:http";
import process from "node:process";

/**
 * Halley.JS dependencies
 */

import { Request } from "./request.js";
import { Reply } from "./reply.js";
import { HRouter, Route } from "./router/halley.router.js";

/**
 * HalleyListener is a replace to the node:http RequestListener type.
 * 
 * With HalleyListener, it allow we to use customs Requests and Responses objects like in the Halley case
 */
export type HalleyListener = (req: Request, res: Reply) => void;

/**
 * HalleyEnvironment indicate the environment of the project that is running
 */
export type HalleyEnvironment = "production" | "development";

const ServerOptions: ServerOptions = {
    IncomingMessage: Request,
    ServerResponse: Reply
}

const { Object } = globalThis;

export class Halley {

    /**
     * The port is used to indicate to Halley where need to listen requests.
     */
    public readonly port: number;

    /**
     * The env indicate how is be developed an project
     */
    private env: HalleyEnvironment | string | undefined;

    /**
     * The localRoutes is an array that contain all the routes declared through the Halley methods (get, post, ...) or the HalleyRouter
     */
    private halleyRoutes: Route[] = [];

    /**
     * The response contains the callback function that will be executed and change rely on the visited route
     */
    private response: HalleyListener;

    /**
     * The settings indicate extra information about the server provider
     */
    private settings = {
        "x-Powered-By": "Halley.js"
    }

    /**
     * @param options Is the unique parameter for Halley class and it's an literal object.
     * 
     * The values of every property of options indicate Halley.js how must create the http server or how must work some parts of Halley like the Pino logger (Not implemented yet)
     * 
     * @param {number} options.port Indicate to Halley where need to listen for entering routes. Necessary key parameter
     * 
     * @param {HalleyEnvironment} options.env Indicate to Halley how is be developed an project. If it isn't indicated, Halley will assume that is an development environment
     */
    public constructor(
        options: {
            port: number,
            env?: HalleyEnvironment,
            useNodeEnv?: boolean,
        }
    ) {
        this.port = options.port;
        this.env = options.env ?? "development";
        if (options.useNodeEnv && !process.env.NODE_ENV) {
            throw new TypeError(
                "'useNodeEnv' property is indicated at Halley constructor to use the 'NODE_ENV' environment variable. But it dont exists. Perhaps you had not used dotenv?"
            )
        }
        if (options.useNodeEnv && process.env.NODE_ENV) {
            this.env = process.env.NODE_ENV;
        }
    }    

    /**
     * Iterate over the localRoutes of the actual object
     * @param {Route[]} routeArray The array that contain the routes
     * @param {string} path The pattern that want to search
     * @param {string} method The method of the incoming request
     * @returns The literal object that had matched with the search patterns
     */
    private iterateRoutes(routeArray: Route[], path: string, method: string): Route | undefined {
        return routeArray.find((matchRoute: Route) => matchRoute.path === path && matchRoute.method === method);
    }

    /**
     * Matches the gived param with any object of localRoutes and attach the handler of the return object to this.response
     * 
     * @param {string} path The url of the route to match
     * 
     * @param {string} method The http verb / method that will use the route
     */
    private makeSuitable(path: string | undefined, method: string | undefined): void {
        if (path && method) {
            const alreadyIterated = this.iterateRoutes(this.halleyRoutes, path, method);
            if (!alreadyIterated) this.response = (req, res) => {
                res.status(404);
                res.send(`<h2>The route: '${path}' dont exists</h2>`);
            }
            else this.response = alreadyIterated.handler;
        }
    }

    /**
     * Copy an object and is embedded into the `Halley` class
     * @param {object | HRouter} appendedObject The source object that will be embedded into `Halley` class
     */
    public use(appendedObject: object | HRouter) {
        if (appendedObject instanceof HRouter) {
            Object.assign(this.halleyRoutes, appendedObject.routerRoutes);
        }
    }
    
    /**
     * Push the params to an array with all the routes of the running project
     * 
     * halley.get works over the get http verb / method.
     * 
     * Is commonly used to request data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @returns `this` object
     */
    public get(path: string, handler: HalleyListener): this {

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");

        this.halleyRoutes.push({path: path, method: "GET", handler});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from halley.post, post works over the post http verb / method.
     * 
     * Is commonly used to send data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @returns `this` object
     */
    public post(path: string, handler: HalleyListener): this {

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");
        
        this.halleyRoutes.push({path: path, method: "POST", handler});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from other halley methods, put works over the put http verb / method.
     * 
     * Is commonly used to update data to the server
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @returns `this` object
     */
    public put(path: string, handler: HalleyListener): this {

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");

        this.halleyRoutes.push({path: path, method: "PUT", handler});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from other halley methods, delete works over the delete http verb / method.
     * 
     * Is commonly used to delete data from the server (for exameple a field of one row in a sql database)
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @returns `this` object
     */
    public delete(path: string, handler: HalleyListener): this {

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");

        this.halleyRoutes.push({path: path, method: "DELETE", handler});

        return this;
    }

    /**
     * Ready method start your application and listen for requests on the indicated port at the constructor or as the first argument of `ready` method
     * 
     * @param {number} port Necessary parameter to listen requests. It must be the same port that the indicated at the constructor
     * 
     * @param {string} options.message Optional parameter to show a custom message when the server is listening
     * 
     * @param {string} options.hostname Optional parameter to indicate what IP address must listen the server
     * 
     * @returns {Server} Returns a `server` instance
     * 
     * Commonly some frameworks indicate the port at a method similar to ready (listen, start...).
     * 
     * In Halley the port must be defined at the constructor, then indicate that port property as the firts parameter of `ready` method
     * 
     * @example
     *      
     * Import { Halley } from "halley.http"
     * 
     * const halley = new Halley({
     *      port: 5000,
     *      environment: "development"
     * })
     * 
     * halley.ready(halley.port);
     * 
     * // Now the server is listening for entering requests at indicated port
     * 
     */
    public ready(port: number, options?: {message?: string, hostname?: string}): Server {

        if (port !== this.port) {
            throw new TypeError("The port must be the same that you indicated at Halley constructor");
        }

        const server = createServer(ServerOptions);
        server.on("request", (req: Request, res: Reply) => {

            this.makeSuitable(req.url, req.method);
            this.response.call(this, req, res);

        });
        options?.message ? console.info(options.message) : console.info(`Halley listening on port ${port}`);
        return server.listen(port, options?.hostname ?? "0.0.0.0");
    }
}