/**
 * Rewrited subclass Response from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */

import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http";
import { isAbsolute } from "node:path";
import { readFile } from "node:fs/promises";

// It is a good practise to import objects, classes, etc... from the globalThis object
const { JSON } = globalThis;

/**
 * Halley.JS dependencies
 */

import { HALLEY_PATH_IS_NOT_ABSOLUTE } from "../errors/FileErrors.js";
import { HALLEY_HTTP_ERROR } from "../errors/HTTPErrors.js";

/**
 * A type wrapper for primitive and non-primitive data types
 */
type ReplyContent = string | boolean | object | Buffer | null | undefined;

export class Reply<Req extends IncomingMessage = IncomingMessage> extends ServerResponse<Req> {
    /**
     * Set a status code for the response
     * @param {number} statusReply The status Code
     * @returns `this` object
     */
    status(statusReply: number): this {
        if (!STATUS_CODES[statusReply]) {
            // We throw directly the exception calling the class constructor
            // Because we need to notice about the status that not exists
            throw new HALLEY_HTTP_ERROR(
                `The status code ${statusReply} dont exist in the object 'STATUS_CODES', Provided from Node.js`, "STATUS_CODE_DONT_EXISTS"
            );
        }
        this.statusCode = statusReply;
        return this;
    }

    /**
     * Send any data as a response 
     * @param {ReplyContent} body 
     * The body type is a type of types, including:
     * 
     * literal objets, numbers, strings...
     * @returns `this` object
     * 
     * `body` can accept the follow primitive and non-primitive data types:
     * 
     * * `string` - Hello World!
     * * `number` - 20
     * * `boolean` - true
     * * `object` - Can be an literal object, `Date` or `Null`
     * * `Buffer` - Buffer < 60 80 10 >
     */
    public send(body: ReplyContent): this {
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
            throw HALLEY_PATH_IS_NOT_ABSOLUTE;
        }
        const file = await readFile(filePath, encoding);
        this.send(file);
        return this;
    }

    /**
     * Send the response as a JavaScript Object Notation (JSON)
     * @param {ReplyContent} body The content to convert to JSON and send to the response
     */
    public json(body: ReplyContent): this {
        this.setHeader("Content-Type", "application/json");
        this.send(JSON.stringify(body, null, 4));
        return this;
    }
};