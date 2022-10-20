/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */
import { IncomingMessage } from "node:http"

export class Request extends IncomingMessage {
    
    public get value() {
        return
    }
    

    public body: any;
};