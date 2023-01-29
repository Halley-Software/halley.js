import { Request, Reply } from "../../../lib/index.js";

interface CorsOptions {
      credentials?: boolean,
      headers?: string[],
      methods?: string | string[],
      origins?: string | string[],
      exposedHeaders?: string[]
      age?: number    
}
  
const kDefaultOptions: CorsOptions = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origins: "*"
}
  
export const cors = (options: CorsOptions = kDefaultOptions) => {
    return function(_req: Request, res: Reply) {
        if (options.origins) {
            res.setHeader("Access-Control-Allow-Origin", options.origins)   
        }
    }
}