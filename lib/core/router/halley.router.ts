'use strict';

import { IncomingMessage, ServerResponse, type RequestListener } from "node:http"

export type Handler<req = IncomingMessage, res = ServerResponse> = {
    path?: string,
    callback?: 
}

export class HRouter {
    get: Handler
    post: Handler
    put: Handler
    delete: Handler
}