/**
 * Rewrited subclass Response from express.js with classes syntax
 */

'use strict';

/**
 * NodeJS dependencies
 */

import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http"

import { readFile } from "node:fs/promises"

import type * as ReplyTypes from "../types/Reply.types";

export class Reply<Request extends IncomingMessage = IncomingMessage> extends ServerResponse<Request> {
    /**
     * 
     * @param statusReply The status Code
     * @returns `this` object
     */
    status(statusReply: number): this {
        if (!STATUS_CODES[statusReply]) throw new Error(
            `The status code ${statusReply} dont exist in the object 'STATUS_CODES', Provided from Node.js`
        )
        this.statusCode = statusReply;
        return this;
    }

    public send(body: ReplyTypes.body): this {
        this.end(body);
        return this;
    }

    public sendFile(filePath: string): this {
        readFile(filePath).then(some => {console.log(some)});
        return this;
    }
};