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
import EventEmitter from "node:events";

/**
 * Halley.JS dependencies
 */
import router from "./router/halley.router";
import { call } from "./call";
import { reply } from "./reply";

export class Halley {
    constructor(routes) {
    }
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
     * @param {Function} callback The callback parameter admit a function as argument that menage the route 
     */

    method(route, callback) {
        console.log("Get method called!");
        console.log(this.routes)
    }
    /**
     * Ready method/function start your application and 
     * 
     * An example will can something like this:
     * 
     *      async function initServer(port) {
     *          await halley.ready(port, () => {
     *              console.log(`Server listening on port ${port}`);
     *          });
     *      };
     *
     *      try {
     *          initServer(port);
     *      } catch (error) {
     *          console.error(error);
     *      }
     * 
     * @param {Number} port The port is needed to indicate the server where to need listen requests
     */
    ready(port, callback) {
        http.createServer((req, res) => {
            null
        }).listen(port, callback)
    };
};

/*
!!!!!TESTING!!!!!
    /* this.route = route
    this.callback = callback
    if (typeof route !== "string") {
        throw TypeError("The route path must be declared as a string!");
    };
    if (!callback) {
        throw TypeError("Must there any callback function to handle or manage the route");
    }; 
*/

/*
!!!!!TESTING!!!!!
    if(!port) {
        throw new Error("Must be any port to listen requests")
    }
    if(typeof port !== "number") {
        throw new Error("The port must be a value type number 'int'")
    }
    http.createServer(this).listen()
*/