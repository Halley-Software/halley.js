'use strict';

/**
 * Coded by Raxabi from Halley Software Team
 * 
 *  let contributors = {
 *       "main_developers": {
 *           Raxabi
 *       }
 *   }
 */

import http from "http";
import { METHODS } from "http";
import Call from "./call.js";

export class Halley {
    constructor(this)

    /**
     * 
     * Get method/function uses the GET HTTP Method to request data to the server
     * 
     * Examples about this method can be:
     *
     *      // Before declaring a route import Halley
     *  
     *      halley.get("/", (call, rep) => {
     *          rep.plain("<h1>Hello World!</h1>");
     *      });
     * 
     *      // Then start the server with ready method
     * 
     * @param {String} route The route parameter indicate where the route will point to
     * @param {Function} callback The callback parameter admit a function as argument that menage  
     */

    get(route, callback) {
        get
    }
    /**
     * Ready method/function start your application and 
     * 
     * An example will can something like this:
     * 
     *      import { Halley } from "halley";
     * 
     *      const halley = new Halley();
     * 
     *      const port = 3000 || process.env.PORT;
     *
     *      // Here can be routes, middlewares or another thing
     * 
     *      halley.ready('port').then(console.log(`Server listening on port ${port}`));
     * 
     * @param {Number} port The port is needed to indicate the server where to need listen requests
     */
    ready(port) {
        return new Promise((resolve) => {
            resolve(
                http.createServer(this)
                    .listen()
            );
        });
    };
};