/**
 * Rewrited subclass Response from express.js with classes syntax
 */

'use strict';

/**
 * NodeJS dependencies
 */

import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http";
import { isAbsolute } from "node:path";
import { readFile } from "node:fs/promises";

// It is a good practise to import objects, classes, etc... from the globalThis object
const { JSON } = globalThis;

/**
 * A type wrapper for primitive and non-primitive data types
 */
export type body = string | number | boolean | object | Buffer;

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
     * @param {body} body The body type is a type of types, that is, that it's a types wrapper
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
    public send(body: body): this {
        this.end(body);
        return this;
    }

    /**
     * Send a file as a response
     * @param {string} filePath Absolute path of the file
     * @param {BufferEncoding} encoding Set the encoding of the file. Default is UTF-8
     * @returns `this` object
     */
    public async sendFile(filePath: string, encoding: BufferEncoding = "utf-8"): Promise<this> {
        if (!isAbsolute(filePath)) {
            throw new TypeError("The path must an absolute path!");
        }
        const file = await readFile(filePath, encoding);
        this.send(file);
        return this;
    }

    /**
     * Send the response as a JavaScript Object Notation (JSON)
     * @param {object} body The content in 
     */
    public json(body: object): this {
        this.setHeader("Content-Type", "application/json");
        this.send(JSON.stringify(body, null, 4));
        return this;
    }
};