'use strict';

import http from "node:http";

type IContent = {
    plainText: string
}

type Response = {

}

export class Reply extends http.ServerResponse implements Response {
    public plain(replyContent: IContent) {
        return replyContent
    };
    
    public file(replyContent) {
        null
    };
};