'use strict';

import http from "node:http";

class Reply extends http.ServerResponse {
    plain(replyContent) {
        const encoder = new TextEncoder
        return encoder.encode(replyContent)
    };
    
    file(replyContent) {
        null
    };
};

export default Reply;