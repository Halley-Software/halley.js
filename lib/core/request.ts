/**
 * Rewrited subclass Request from express.js with classes syntax
 */

'use strict';

// Node.js dependencies
import { IncomingMessage } from "node:http";

/**
 * Convert an Array of an unkown type to the type of the unkown type parameter
 * @source https://stackoverflow.com/a/51399781
 */
type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export class Request<Keys extends string[] = string[]> extends IncomingMessage {
  public body: any;
  public params: { [k in ArrayElement<Keys>]: any };
}
