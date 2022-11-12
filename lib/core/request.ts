/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */
import { IncomingMessage } from "node:http"

// It is a good practise to import objects, classes, etc... from the globalThis object
const { Buffer } = globalThis;

export class Request extends IncomingMessage {
    
    public get body() {
        return
    }
};