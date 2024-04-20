/**
 * Coded by Raxabi from Halley Software Open Source Developer Team. HSOSDT
 * 
 * Can call it Halley Software Developer Team. HSDT, because all that we make is Open Source :D
 * 
 * Contributors on root of the project, "/contributors.js"
 * 
 */

/**
 * Halley is the main core of the project.
 * Here we make use of all another classes and objects to build a response that the Node.js HTTP Server can interpret
 */

/**
 * Halley.js use and take as reference some third-party modules, so here are the mentions about there :D
 * 
 * Halley.js borned as a inspiration in express, so, it had taken some things from it like: The request and response classes, his middleware style, etc...
 * 
 * Halley.js use the pino logger https://github.com/pinojs/pino
 * 
 * Halley.js take some things as reference from tinyhttp like: properties used at tsconfig.json https://github.com/tinyhttp/tinyhttp
 * 
 */

'use strict';

/**
 * Node.JS dependencies
 */

import { Server, createServer, ServerOptions } from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import process from "node:process";

// JavaScript good practice
const { Object } = globalThis;

/**
 * Halley.JS dependencies
 */

import { Request } from "./request.js";
import { Reply } from "./reply.js";
import { Route } from "./router/halley.router.js";
import { HALLEY_PATH_IS_NOT_ABSOLUTE, HALLEY_ARGUMENT_IS_NOT_A_DIR } from "../errors/FileErrors.js";
import { HALLEY_ROUTE_DO_NOT_START_WITH_SLASH } from "../errors/RouteErrors.js";

/**
 * Similar to RequestListener provided by `node:http`, a HalleyListener take an request and a response as parameters and manage it to generate a response
 * 
 * `RequestListener` use the IncomingMessage and ServerResponse classes provided by Node.js as Readable-Writeable Streams.
 * 
 * Meanwhile `HalleyListener` use extended classes of them adding extra functionality
 */
export type HalleyListener = (req: Request, res: Reply) => void;

/**
 * HalleyEnvironment indicate the environment of the project that is running
 */
export type HalleyEnvironment = "production" | "development";

const kServerOptions: ServerOptions = {
    IncomingMessage: Request,
    ServerResponse: Reply
} as const;

/**
 * Halley class is the base of Halley.js, from here we can add routes, listen for requests, modify headers from middlewares, etc...
 */
export class Halley {

    /**
     * The port is used to indicate to Halley where need to listen requests.
     */
    public readonly port: number;

    /**
     * The env indicate how is be developed an project
     */
    private env: HalleyEnvironment | string | undefined;

    /**
     * The localRoutes is an array that contain all the routes declared through the Halley methods (get, post, ...) or the HalleyRouter
     */
    private routeStack: Route[] = [];

    /**
     * Contains the middlewares passed to the Halley class using the 'use' method
     */
    private middlewares: HalleyListener[] = [];

    /**
     * It is equaled to the entering request for manage different aspects like piped data
     */
    private appRequest: Request;

    /**
     * It is equaled to the outgoing response for manage different aspects like outgoing headers
     */
    private appReply: Reply;

    /**
     * The response contains the callback function that will be executed and change rely on the visited route
     */
    private _response: HalleyListener;

    /**
     * The settings indicate extra information about the server provider
     */
    private settings = {
        "x-Powered-By": "Halley.js"
    }

    /**
     * @param options Is the unique parameter for Halley class and it's an literal object.
     * 
     * The values of every property of options indicate Halley.js how must create the http server or how must work some parts of Halley like the Pino logger (Not implemented yet)
     * 
     * @param {number} options.port Indicate to Halley where need to listen for entering routes. Necessary key parameter
     * 
     * @param {HalleyEnvironment} options.env Indicate to Halley how is be developed an project. If it isn't indicated, Halley will assume that is an development environment
     * 
     * @param {boolean} options.logger Enable or disable the Pino logger
     * 
     * @param {boolean} options.useNodeEnv If this option is indicated, a environment variable must be available so that Node.js can read
     */
    public constructor(
        options: {
            port: number,
            env?: HalleyEnvironment,
            logger?: true,
            useNodeEnv?: boolean,
        }
    ) {
        this.port = options.port;
        this.env = options.env ?? "development";
        if (options.useNodeEnv && !process.env.NODE_ENV) {
            throw new TypeError(
                "'useNodeEnv' property is indicated at Halley constructor to use the 'NODE_ENV' environment variable. But it dont exists. Perhaps you had not used dotenv?"
            );
        }
        if (options.useNodeEnv && process.env.NODE_ENV) {
            this.env = process.env.NODE_ENV;
        }
    }    

    /**
     * Asynchronous method for serve static files
     *
     * Add routes for each file inside the indicated directory as argument. So it can be accessed.
     *
     * If there are another directories inside the specified static dir, it will be skiped and his content will be not readed.
     *
     * @param {string} mountPath The path from which the files are requested
     *
     * @param {string} absPath The absolute path where the static files are located
     *
     * @param {Halley} app A Halley instance, commonly the instance that is being used to register the middleware
     *
     * @throws {HALLEY_ARGUMENT_IS_NOT_A_DIR} Throwed if the absPath is passed as a file
     *
     * @throws {HALLEY_ROUTE_DO_NOT_START_WITH_SLASH} Throwed if the mount path dont start with a '/', internally, it is used to make a route
     *
     * @returns {Promise<MiddlewareHandler>} Returns a callback asynchronous arrow function used internally by Halley
     *
     * @example
     *
     * const halley = new Halley()
     *
     * // For unix systems where the root dir starts with '/'
     * const { pathname: __dirname } = new URL("../client/dist/", import.meta.url)
     * // Use this if you are using esm modules, where '__dirname' is not available
     *
     * // For windows systems where the root dont start with '/' so you must delete the first slash like this
     * const { pathname: statics } = new URL("../client/dist/", import.meta.url)
     * const __dirname = statics.replace("/", "")
     *
     * halley
     *   .register(await Halley.serveStatic("/assets", __dirname + "assets", halley))
     *   .get("/", (req, res) => {
     *     res.sendFile(__dirname + "index.html")
     *   })
     *   .listen(5000)
     */
    public static async serveStatic(mountPath: string, absPath: string, app: Halley): Promise<MiddlewareHandler> {
        const fsArgPosition = (await asyncFs.lstat(absPath)).isDirectory();
        if (!fsArgPosition) {
            throw HALLEY_FILE_ERROR.HALLEY_ARGUMENT_IS_NOT_A_DIR;
        }

        // this exception exists because after all, `serveStatic` method create a new route for each file
        if (mountPath[0] !== "/" && mountPath.length === 0) {
            throw HALLEY_ROUTE_ERROR.HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        let absoluteStaticPath: string = absPath;
        if (!path.isAbsolute(absoluteStaticPath)) {
            absoluteStaticPath = path.resolve(absPath);
        }

        const dirItems = await asyncFs.readdir(absoluteStaticPath);
        return async () => {
            const statics: Route<[], "GET">[] = []; // Uses GET bucause only serves a resource request by the browser or another clients
            for (const item of dirItems) {
                const fullPathItem = `${absoluteStaticPath}${item}`;
                let encoding: BufferEncoding = "utf-8";
                let fileContentType: string;

                const itemType = await asyncFs.lstat(fullPathItem);
                if (itemType.isDirectory()) continue;
                switch (true) {
                    case new RegExp(".css$").test(item):
                        fileContentType = "text/css";
                    break;
                    case new RegExp(".js$").test(item):
                        fileContentType = "application/javascript";
                    break;
                    case new RegExp(".jpg$").test(item):
                        encoding = "binary";
                        fileContentType = "image/jpeg";
                    break;
                    case new RegExp(".png$").test(item):
                        encoding = "binary";
                        fileContentType = "image/png";
                    break;
                    case new RegExp(".mp4|mp3$").test(item):
                        encoding = "binary";
                        fileContentType = "audio/mp4";
                    break;
                }

                /**
                 * If the mount path is root ('/') directly appends the requested resource
                 * 
                 * In other case appends the specified mount path to an slash ('/') to separate from the requested resource 
                 */
                const finalMountPath = mountPath === "/" ? `${mountPath}${item}` : `${mountPath}/${item}`;
                statics.push({
                    path: finalMountPath,
                    method: "GET",
                    handler: (_, res) => {
                        res.setHeader("Content-Type", fileContentType);
                        res.sendFile(fullPathItem, encoding);
                    }
                });
            }
            app.add(statics);
        }
    }

    /**
     * Matches the gived param with any object of localRoutes and attach the handler of the return object to this._response
     * 
     * @param {string} path The url of the route to match
     * 
     * @param {string} method The http verb / method that will use the route
     */
    private makeSuitable(path: string | undefined, method: string | undefined): void {
        if (path && method) {
            const alreadyIterated = this.iterateRoutes(path, method);
            if (!alreadyIterated) {
                this._response = (req, res) => {
                    res.status(404);
                    res.send(`<h2>The route: '${path}' dont exists</h2>`);
                }
            } else {
                if (alreadyIterated.middleware) {
                    // Check for individual middlewares
                    alreadyIterated.middleware(this.appRequest, this.appReply);
                }
                if (this.middlewares.length > 0) {
                    this.middlewares.forEach((callback: HalleyListener) => {
                        callback(this.appRequest, this.appReply);
                    });
                }
                this._response = alreadyIterated.handler;
            }
        }
    }

    /** 
     * Add a HalleyListener function returned by the execution of another function to middlewares stack
     * @param {HalleyListener} appendedObject The source object that will be embedded into Halley class or the HalleyListener that will be executed
     */
    public register(appendedObject: HalleyListener): this {
        this.middlewares.push(appendedObject);
        return this;
    }   
    
    /**
     * Add routes into the routeStack
     * @param {Route} appendedObject
     */
    public use(appendedObject: Route | Route[]): this {
        Object.assign(this.routeStack, appendedObject)
        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * halley.get works over the get http verb / method.
     * 
     * Is commonly used to request data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @param {HalleyListener} middleware A middleware that only will be used in the route that is called
     * @returns `this` object
     */
    public get(path: string, handler: HalleyListener, middleware?: HalleyListener): this {

        if (path[0] !== "/") {
            throw HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        this.routeStack.push({path, method: "GET", handler, middleware});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from halley.post, post works over the post http verb / method.
     * 
     * Is commonly used to send data to the server
     * 
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @param {HalleyListener} middleware A middleware that only will be used in the route that is called
     * @returns `this` object
     */
    public post(path: string, handler: HalleyListener, middleware?: HalleyListener): this {

        if (path[0] !== "/") {
            throw HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }
        
        this.routeStack.push({path, method: "POST", handler, middleware});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from other halley methods, put works over the put http verb / method.
     * 
     * Is commonly used to update data to the server
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @param {HalleyListener} middleware A middleware that only will be used in the route that is called
     * @returns `this` object
     */
    public put(path: string, handler: HalleyListener, middleware?: HalleyListener): this {

        if (path[0] !== "/") {
            throw HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        this.routeStack.push({path, method: "PUT", handler, middleware});

        return this;
    }

    /**
     * Push the params to an array with all the routes of the running project
     * 
     * Different from other halley methods, delete works over the delete http verb / method.
     * 
     * Is commonly used to delete data from the server (for exameple a field of one row in a sql database)
     * @param {string} path The path where the listener will execute
     * @param {HalleyListener} handler A callback function that will execute when the route is visited
     * @param {HalleyListener} middleware A middleware that only will be used in the route that is called
     * @returns `this` object
     */
    public delete(path: string, handler: HalleyListener, middleware?: HalleyListener): this {

        if (path[0] !== "/") {
            throw HALLEY_ROUTE_DO_NOT_START_WITH_SLASH;
        }

        this.routeStack.push({path, method: "DELETE", handler, middleware});

        return this;
    }

    /**
     * 
     * Add routes for each file inside the indicated directory as argument. So it can be accessed
     * If there are another directories inside the specified static dir, it will be skiped and his content will not be readed
     * 
     */
    public async serveStatic(dirPath: string): Promise<void> {
        if (!path.isAbsolute(dirPath)) {
            throw HALLEY_PATH_IS_NOT_ABSOLUTE;
        }
        const fileOrDirectoryArgument = (await fs.lstat(dirPath)).isDirectory()
        if (!fileOrDirectoryArgument) {
            throw HALLEY_ARGUMENT_IS_NOT_A_DIR;
        }
        const dirItems = await fs.readdir(dirPath);
        for (const item of dirItems) {
            const itemType = await fs.lstat(`${dirPath}/${item}`)
            if (itemType.isDirectory()) {
                continue;
            }
            this.get(`/${item}`, (_req, res) => {
                switch (true) {
                    case /.\.css$/.test(item):
                        res.setHeader("Content-Type", "text/css");
                    break;
                    case /.\.js$/.test(item):
                        res.setHeader("Content-Type", "text/js");
                    break;
                    default:
                        res.setHeader("Content-Type", "text/plain");
                    break;
                }
                res.sendFile(`${dirPath}/${item}`);
            });
        }
    }

    /**
     * Ready method start your application and listen for requests on the indicated `port`
     *
     * @param {number} port Necessary parameter, the indicated value will be the listen port for the server.
     *
     * @param {string} options.message Optional parameter to show a custom message when the server is listening
     *
     * @param {string} options.hostname Optional parameter to indicate what IP address must listen the server
     *
     * @returns {Server} Returns a `server` instance
     *
     * @example
     *
     * Import { Halley } from "halley.http"
     *
     * const halley = new Halley()
     *
     * // Make stuff
     *
     * halley.ready(5000);
     *
     * // Now the server is listening for entering requests at indicated port
     * 
     * // If u want use a custom message once the server has start
     * 
     * halley.ready(5000, { message(port, qRoutes) {
     *      console.info(`Halley its listening in the port \x1b[36m${port}\x1b[0m\nHas been declared \x1b[31m${qRoutes}\x1b[0m routes in this instance`)
     * }})
     * 
     * // Another way, if you want the default message
     * 
     * halley.ready(5000, { message: true })
     */
    public ready(port: number, options?: Partial<ListenOptions>): Server {
        const server = createServer(kServerOptions);
        server.on("request", async (req: Request, res: Reply) => {
            await this.makeSuitable(req.url, req.method, req, res);
        });

        if (options?.message) {
            if (typeof options?.message === "boolean") {
                console.log(`Halley listening on port \x1b[36m${port}\x1b[0m`)
            } else {
                options.message(port, super.getRoutes.length)
            }
        }

        return server.listen(port, options?.hostname ?? "0.0.0.0");
    }
}
