import { debug } from "node:console"
import { Request, Reply } from "../../lib/index.js";

interface CorsOptions {
    credentials?: boolean,
    headers?: string[],
    methods?: string[],
    origins?: string | string[],
    exposedHeaders?: string[]
    age?: number    
}

export function cors(options: CorsOptions = {}) {
    return function(_req: Request, res: Reply) {
        if (options.origins) {
            res.setHeader("Access-Control-Allow-Origin", options.origins)   
        }
    }
}