'use strict';

import http from "node:http";

const reply = Object.create(http.ServerResponse.prototype);

reply.plain = function(repluContent) {

};

reply.file = function(replyContent) {
    
};