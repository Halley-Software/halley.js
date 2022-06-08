/**
 * * This file handle the call or better know as request
 * * Its very common to see that method of request and response returning a object with properties
 * * in all web framework like Express, Fastify, TinyHTTP...
 */

 'use strict';

import http from "node:http";

let call = new http.IncomingMessage.prototype

call.get =
call.header = function() {
    
}

export default call;