'use strict';

import http from "node:http";

const reply = Object.create(http.ServerResponse.prototype);

reply.file = function(replyContent) {
    
}