/**
 * Rewrited subclass Response from express.js with classes syntax
 */

'use strict';

/**
 * NodeJS dependencies
 */

import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http";

import { isAbsolute } from "node:path"
import { readFile } from "node:fs/promises";

/**
 * Halley.JS dependencies
 */

// Type Anotations
import type * as ReplyTypes from "../types/Reply.types";

export class Reply<Req extends IncomingMessage = IncomingMessage> extends ServerResponse<Req> {
    /**
     * Set a status code for the response
     * @param {number} statusReply The status Code
     * @returns `this` object
     */
    status(statusReply: number): this {
        if (!STATUS_CODES[statusReply]) throw new Error(
            `The status code ${statusReply} dont exist in the object 'STATUS_CODES', Provided from Node.js`
        )
        this.statusCode = statusReply;
        return this;
    }

    /**
     * Send any data as a response 
     * @param {ReplyTypes.body} body The body type is a type of types, that is, that it's a types wrapper
     * @returns `this` object
     * 
     * `body` can accept the follow primitive and non-primitive data types:
     * 
     * * `string` - Hello World!
     * * `number` - 20
     * * `boolean` - true
     * * `object` - Can be an `Array`, literal object, `Date` or `Null`
     * * `Buffer` - Buffer < 60 80 10 >
     */
    public send(body: ReplyTypes.body): this {
        this.end(body);
        return this;
    }

    /**
     * Send a file as a response
     * @param {string} filePath Relative or absolute path of the file
     * @param {BufferEncoding} encoding Set the encoding of the file
     * @returns `this` object
     */
    public async sendFile(filePath: string, encoding: BufferEncoding = "utf-8"): Promise<this> {
        if (!isAbsolute(filePath)) {
            throw new TypeError("The path must an absolute path!")
        }
        const file = await readFile(filePath, encoding)
        this.end(file);
        return this;
    }
};