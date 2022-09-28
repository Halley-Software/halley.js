/**
 * This file contain all the types that Halley need
 * 
 * @anotation Halley refers to the 'Halley class'
 */

import { Request } from "../core/request"

import { Reply } from "../core/response";

/**
 * @type HalleyListener is a replace to the node:http RequestListener type.
 * 
 * With HalleyListener, it allow we to use customs Requests and Responses objects like in this case
 */
export type HalleyListener = (request: Request, Reply: Reply) => void;

/**
 * @type HalleyEnvironment indicate the environment of the project that is running
 */
export type HalleyEnvironment = "production" | "development"