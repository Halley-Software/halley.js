/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */
import { IncomingMessage } from "node:http"

export class Request extends IncomingMessage {

    private getBody() {

    }

    public body: any;
};