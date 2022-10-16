/**
 * Rewrited subclass Response from express.js with classes syntax
 */

'use strict';

import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http"

export class Reply<Request extends IncomingMessage = IncomingMessage> extends ServerResponse<Request> {
    status(statusCode: number): string | undefined {
        return STATUS_CODES[statusCode]
    }
};