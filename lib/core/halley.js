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
import http from "node:http";

/**
 * Halley.JS dependencies
 */
import Call from "./call.js";
import Reply from "./reply.js";


class Halley {
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
     *      // Then start the server with the ready method
     * 
     * @param {String} route The route parameter indicate where the route will point to
     * @param {Function} callback The callback parameter admit a function as argument that menage the route 
     */

    method(route, callback) {
        console.log("Get method called!");
        console.log(this.routes)
    }

    /**
     * Ready method/function start your application and listen for requests
     * 
     * An example will can something like this:
     * 
     *      await halley.ready(app, port)
     * 
     * @param {Handler} app A handler that manage the route when a request incoming to the route
     * @param {Number} port The port is needed to indicate the server where to need listen requests
     */
    async ready(app, port) {
        http.createServer(app).listen(port)
    };
};

export default Halley