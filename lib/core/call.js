'use strict';

import http from "node:http";

export class call extends http.IncomingMessage {
    /**
      * Return a HTTP header passed to the method
      * 
      * @param {string} headerName 
    */
    header(headerName) {
        if (typeof headerName !== "string") {
            throw new Error("The header must be pass as a string to the function");
  
        }
        if (!headerName) {
            throw new Error("Any header must be passed to the function");
        };
    };

    body() {
        let body = this.body
    };

    cookies() {
        null
    };
};