/**
 * Rewrited subclass Response from express.js with classes syntax
 */

// Node.js dependencies
import { IncomingMessage, ServerResponse } from "node:http";
import { isAbsolute, resolve } from "node:path";
import { readFile } from "node:fs/promises";

// It is a good practise to import objects, classes, etc... from the globalThis object
const { JSON } = globalThis;

// Halley.js dependencies
import HALLEY_HTTP_ERROR from "../errors/HttpErrors.js";

/**
 * A type wrapper for primitive and non-primitive data types
 */
type Body = string | boolean | Buffer | object | null | undefined;

export class Reply<Req extends IncomingMessage = IncomingMessage> extends ServerResponse<Req> {
    /**
     * Set a status code for the response
     * @param {number} statusReply The status Code
     * @returns `this` The object itself
     */
    public status(statusReply: number): this {
        if (statusReply < 100 || statusReply > 599) {
            // We throw directly the exception calling the class constructor
            // Because we need to notice about the status that doest not exists
            throw new HALLEY_HTTP_ERROR(
                `The status code ${statusReply} is not a standard valid status code`, "STATUS_CODE_DONT_EXISTS"
            );
        }
        this.statusCode = statusReply;
        return this;
    }

    /**
     * Send any data as a response 
     * @param {Body} body
     * The body type is a type of types, including:
     * * `string` - Hello World!
     * * `null` - null
     * * `undefined` - undefined
     * * `Buffer` - Buffer < 60 80 10 >
     * @returns `this` The object itself
     */
    public send(body: Body): this {
        this.end(body);
        return this;
    }

    /**
     * Send a file as a response
     * @param {string} filePath Absolute path of the file
     * @param {BufferEncoding} encoding Set the encoding of the file. Default is UTF-8
     * @returns `this` The object itself
     */
    public async sendFile(filePath: string, encoding: BufferEncoding = "utf-8"): Promise<this> {
        if (!isAbsolute(filePath)) {
            const file = await readFile(resolve(filePath), encoding);
            this.send(file);
        }
        const file = await readFile(filePath, encoding);
        this.send(file);
        return this;
    }

    /**
     * Send the response as a JavaScript Object Notation (JSON)
     * @param {Body} body The content to convert to JSON and send to the response
     */
    public json(body: Body): this {
        super.setHeader("Content-Type", "application/json");
        this.send(JSON.stringify(body, null, 4));
        return this;
    }
};