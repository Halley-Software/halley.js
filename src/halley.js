'use strict';

import http from "http";
import Call from "./call.js";

export class Halley {
    constructor() {

    }

    get(url, callback) {

    }
    /**
     * Ready method is the function that start your application
     * 
     * An example is something like this:
     * 
     * "Here will be the example" 
     * 
     * @param {Number} port The port is needed to indicate the server where to need listen reqeusts
     */

    ready(port) {
        return new Promise((resolve) => {
            resolve(
                http.createServer(body).listen(port)
            );
        });
    };
};