/**
 * Coded by Raxabi from Halley Software Open Source Developer Team. HSOSDT
 * 
 * Can call it Halley Software Developer Team. HSDT, because all that we make is Open Source :D
 * 
 *  Contributors on root of the project, "/contributors.js"
 * 
 */

/**
 * Halley is the main core of the project.
 * Here all the another classes and objects are grouped and send to the node HTTP server
 */

/**
 * Halley.js use and take as reference some third-party modules, so here are the mentions about there :D
 * 
 * Halley.js use the pino logger https://github.com/pinojs/pino
 * 
 * Halley.js take some things as reference from tinyhttp like properties used at tsconfig.json https://github.com/tinyhttp/tinyhttp
 */

'use strict';

/**
 * Node.JS dependencies
 */

import * as http from "node:http";

import { ok } from "node:assert";

/**
 * Halley.JS dependencies
 */

import { Request } from "./request"
import { Reply } from "./response"

//* Type Anotations
import type { HalleyListener, HalleyEnvironment } from "../types/halley.types"
import * as RouterTypes from "../types/router.types";

export class Halley {

    /**
     * @property The port is used to indicate to Halley where need to listen requests. Its a readonly property
     * 
     */
    public readonly port: number;

    /**
     * The env indicate how is be developed an project
     * 
     */
    private env: HalleyEnvironment;

    /**
     * @property Is an array that contain all the routes declared with get method
     */
    private localRoutes: RouterTypes.Route[] = [];

    /**
     * @property The property will change rely on the visited url
     */

    private response: HalleyListener = (req, res) => {};

    public settings = {
        xPoweredBy: "Halley.js"
    }

    /**
     * 
     * @param options Is the unique parameter for Halley class and it's an literal object.
     * 
     * The values of every property of options indicate Halley.js how must create the http server or how must work some parts of Halley like the built-in Pino logger (Not implemented yet)
     * 
     * @param options.env Indicate to Halley how is be developed an project. If it isn't indicated, Halley will assume that is an development environment
     * 
     * @param options.port Indicate to Halley where need to listen for entering routes. The default port is 5000
     * 
     */
    public constructor(options?: Partial<{port: number, env: HalleyEnvironment}>) {
        !options?.port ? this.port = 5000 : this.port = options.port;
        !options?.env ? this.env = "development" : this.env = options.env;
    };

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * halley.get works over the get http verb / method.
     * 
     * Is commonly used to order data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * 
     */
    public get(path: string, handler: HalleyListener) {

        ok(path);
        ok(handler);

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");

        this.localRoutes.push({path: path, method: "GET", handler: handler});
    };

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from halley.get, post works over the post http verb / method.
     * 
     * Is commonly used to send data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     */
    public post(path: string, handler: HalleyListener) {

        ok(path);
        ok(handler);

        if (path[0] !== "/") throw new TypeError("A route must start with '/'!");
        
        this.localRoutes.push({path: path, method: "POST", handler: handler});
    };

    /**
     * Iterate over the localRoutes of the actual object
     * @param routeArray The array that contain the routes
     * @param index the pattern that want to search
     * @returns The literal object that had matched with the index
     */
    private iterateRoutes(routeArray: RouterTypes.Route[], index: string, index2: string) {
        return routeArray.find((matchRoute) => matchRoute.path === index && matchRoute.method === index2);
    }

    /**
     * Matches the gived param with any object of localRoutes and attach the handler of the return object to this.response
     * 
     * @param path the url of the route to match
     * 
     */
    private makeSuitable(path: string | undefined, method: string | undefined) {
        if (path && method !== undefined) {
            const alreadyIterated = this.iterateRoutes(this.localRoutes, path, method);
            if (alreadyIterated === undefined) this.response = (req, res) => {res.end(`<h2>The route: ${path} dont exist</h2>`)};
            if (alreadyIterated !== undefined) {
                this.response = alreadyIterated.handler
            };
        };
    };

    /**
     * Ready method start your application and listen for requests on the indicated port at the constructor
     * 
     * Commonly some frameworks indicate the port at a method similar to ready (listen, start...).
     * In Halley.js is preferable indicate the port at the object constructor, so that the port is part of the class
     * 
     * @example
     *      
     *      // Import stuff
     *      
     *      // Do stuff with that stuff
     * 
     *      halley.ready(`Halley listening on port ${halley.port}`)
     * 
     * @public
     */
    public ready(message?: string, hostname?: string): http.Server {
        const server = http.createServer();
        server.on("request", (req: Request, res: Reply) => {
            this.makeSuitable(req.url, req.method);
            this.response.call(null, req, res);
        });
        typeof message === "string" ? console.info(message) : console.info(`Halley listening on port ${this.port}`);
        return server.listen(this.port, hostname = "0.0.0.0" || hostname);
    };
};