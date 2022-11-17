/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */
import { IncomingMessage } from "node:http";
const { Object } = globalThis;

/**
 * Halley.JS dependencies
 */
import { body } from "./reply.js"

export class Request extends IncomingMessage {

    public body: body[] = [];

    public async formAsObjectParser() {
        let data: string, splitedData: string[];
        for await (const chunk of this) {
            data = Buffer.from(chunk).toString("utf-8");
            for (const str of data) {
                if (str.includes("+")) data = data.replace("+", " ");
            }
            splitedData = data.split("&")
            for (const segment of splitedData) {
                this.body.push(Object.fromEntries([segment.split("=")]));
            }
        }
    }
}