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
     * Ready method/function start your application and 
     * 
     * An example will can something like this:
     * 
     *      import { Halley } from "halley";
     * 
     *      const halley = new Halley();
     * 
     *      const port = 3000 || process.env.PORT
     * 
     *      halley.ready('port').then(console.log(`Server listening on port ${port}`))
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