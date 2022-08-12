/**
 * Coded by Raxabi from Halley Software Team
 * 
 *  Contributors on root of the project, "/contributors.js"
 * 
 */

'use strict';

/**
 * Node.JS dependencies
 */
import http, { type RequestListener } from "node:http";

/**
 * Halley.JS dependencies
 */

import { HRouter, type Handler } from "./router/halley.router";

export class Halley {
    /**
     * Ready method/function start your application and listen for requests
     * 
     * An example will can something like this:
     * 
     *      await halley.ready(app, port)
     * 
     * @param {RequestListener} app A handler that manage the route when a request incoming to the route
     * @param {Number} port The port is needed to indicate the server where to need listen requests
     */
    ready(app: RequestListener, port: number) {
        http.createServer(app).listen(port)
    };
};