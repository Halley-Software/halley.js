'use strict';

import http from "http";

let call = Object.create(http.IncomingMessage.prototype);

/**
 * Return a HTTP Header passed to the method
 * 
 * @param {string} headerName 
 */
call.header = function(headerName) {
    if (typeof headerName !== "string") {
        throw Error("The header must be pass as a string to the function");
    } else if (!headerName) {
        throw Error("Any header must be passed to the function");
    };
};

call.body = function() {
  let body = this.body
}

call.cookies = function() {
  null
}

export default call;