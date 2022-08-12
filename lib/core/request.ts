'use strict';

import http from "node:http";

class Req extends http.IncomingMessage {
    /**
      * Return a HTTP header passed to the method
      * 
      * @param {string} headerName 
    */
    header(headerName) {
        if (typeof headerName !== "string") {
            throw new Error("The header must be pass as a string to the function");
  
        };
        if (!headerName) {
            throw new Error("Any header must be passed to the function");
        };
    };

    body() {
        null;
    };

    cookies() {
        null;
    };
};

export default Req