/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

/**
 * Node.JS dependencies
 */
import { IncomingMessage } from "node:http";
const { Object } = globalThis;

export class Request extends IncomingMessage {

    public readonly params: {} = {}
    public readonly body: string[] = [];

    /**
     * Recommended to handle form in `.html` files
     * Take the `name` attribute provided in `ìnput` tag
     */
    public async formAsObjectParser(): Promise<void> {
        let
            data: string,
            splitedData: string[];
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

    /**
     * Recommended to handle form data in React projects
     * 
     * Take the data sended as a string (usually recommend use JSON.stringify).
     * 
     * Then in the backend will be transformed to an literal object again with JSON.parse
     * 
     */
    public async rawBodyParser(): Promise<void> {
        let data: string
        
        for await (const chunk of this) {
            data = Buffer.from(chunk).toString("utf-8")
            for (const str of data) {
                if (str.includes("+")) data = data.replace("+", " ");
            }
            this.body.push(data)
        }
    }
}