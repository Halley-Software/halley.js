import http from "node:http";

const call = Object.create(http.IncomingMessage.prototype);

call.header = function(headerName) {
    
};