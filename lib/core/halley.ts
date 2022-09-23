/**
 * Coded by Raxabi from Halley Software Open Source Developer Team. HSOSDT
 * 
 *  Contributors on root of the project, "/contributors.js"
 * 
 */

/**
 * Halley.JS use any third-party modules, so here are the mentions about there :D
 * 
 * Halley.JS use the pino logger https://github.com/pinojs/pino
 */

'use strict';

/**
 * Node.JS dependencies
 */

import { createServer, RequestListener } from "node:http";

import { ok } from "node:assert"

/**
 * Halley.JS dependencies
 */

import { HRouter } from "./router/halley.router"

export class Halley {

    private port: number;
    /**
     * 
     * @param options Is the unique parameter for Halley class and its an object.
     * 
     * The properties of options indicate Halley.js how must create the http server or how must work some parts of Halley like the built-in Pino logger
     * 
     * @param options.env Indicate Halley.js, among other things, in which port must listen for request. It works only if it's indicated
     * 
     * @param options.port Indicate Halley.js where need to listen for entering routes. The default port is 5000
     * 
     * @public
     */
    public constructor(options?: {port?: number, env?: string}) {
        !options?.port ? this.port = 5000 : this.port = options.port;
    };

    /**
     * 
     * @param path 
     * @param requestHandler 
     * 
     * @public
     */

    public get(path: string, requestHandler: RequestListener) {

        ok(path);
        ok(requestHandler);

        const router = new HRouter;
        router.add({path: path, method: "get", requestHandler: requestHandler});
    }

    /**
     * 
     * @param middleware Middleware is a function that make extra actions on the running project. Similar to Express
     * 
     * @Anotation For now, only works receiving a router instance
     */

    public use(middleware: HRouter) {
        console.log(middleware)
        return middleware
    }

    /**
     * Ready method start your application and listen for requests on the indicated port at the constructor
     * 
     * @example
     *      
     *      // Import stuff
     *      
     *      // Do stuff with that stuff
     * 
     *      halley.ready(app);
     * 
     * @param {Handler} app A handler that manage the route when a request incoming to that route
     * 
     * @Anotation Commonly some frameworks indicate the port at a method similar to ready (listen, start...).
     * 
     * In Halley.js is preferable indicate the port at the object constructor, so that the port is part of the class
     * 
     * @public
     */

    public ready(app: RequestListener): void {
        createServer(app).listen(this.port);
        // Show the server listening port and apply cyan color to the port number
        console.info(`Server listening on port \x1b[36m${this.port}\x1b[0m`);
    };
};