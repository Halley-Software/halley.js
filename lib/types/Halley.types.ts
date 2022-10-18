/**
 * This file contain all the types that Halley need
 * 
 * @anotation Halley refers to the 'Halley class'
 */

'use strict';

import { Request } from "../core/request.js"
import { Reply } from "../core/reply.js";

/**
 * HalleyListener is a replace to the node:http RequestListener type.
 * 
 * With HalleyListener, it allow we to use customs Requests and Responses objects like in this case
 */
export type HalleyListener = (req: Request, res: Reply) => void;

/**
 * HalleyEnvironment indicate the environment of the project that is running
 */
export type HalleyEnvironment = "production" | "development";