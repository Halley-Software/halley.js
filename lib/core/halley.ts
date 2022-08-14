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

import http, { IncomingMessage, ServerResponse } from "node:http";

/**
 * Halley.JS dependencies
 */

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export type RouteHandler = (path: string, callback: Handler) => void;

export class Halley {
    /**
     * Ready method/function start your application and listen for requests
     * 
     * An example will can something like this:
     * 
     *      halley.ready(app, port);
     * 
     * @param {Handler} app A handler that manage the route when a request incoming to that route
     * @param {Number} port The port is needed to indicate the server where to need listen requests. The default port is 3000
     */

    ready(app: Handler, port: number = 3000) {
        http.createServer(app).listen(port);
    };
};