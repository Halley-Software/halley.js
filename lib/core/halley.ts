/**
 * Programmed by Halley Software
 *
 * Contributors on root of the project at file "contributors"
 */

// Node.js dependencies
import path from "node:path";
import asyncFs from "node:fs/promises";
import { Server, createServer } from "node:http";

// Halley.js dependencies
import { Request } from "./request.js";
import { Reply } from "./reply.js";
import { HRouter, type Route } from "./router/halley.router.js";

import HALLEY_FILE_ERROR from "../errors/FileErrors.js";
import HALLEY_ROUTE_ERROR from "../errors/RouteErrors.js";

/**
 * Same as `RequestListener` from `node:http`, but `HalleyHandler` works using `Request` and `Reply` classes instead of Node.js native streams
 */
export type HalleyHandler<RParams extends string[] = string[]> = (req: Request<RParams>, res: Reply) => void | Promise<void>;

/**
 * Shorthand type to create middlewares
 * @example
 * const cors: (opts: { origin: string }) => MiddlewareHandler = ({ origin }) => {
 *  return (req, res) => {...}
 * }
 */
export type MiddlewareHandler<Params extends string[] = string[]> = HalleyHandler<Params>;

/**
 * Defines the possible values for Halley class constructor
 */
export interface HalleyOptions {
    path: string,
    env: string,
    logger: boolean,
    useNodeEnv: boolean,
    initialRoutes: Route[]
}

/**
 * Type Union between a string and RegExp
 */
export type PathLike = string | RegExp;

/**
 * Options as second parameter in method 'ready'
 */
export interface ListenOptions {
    message: boolean | ((port: number, routes: number) => void),
    hostname: string
}

/**
 * From `Halley` class can:
 *  - Set a default error when a route is doesnt matched (route doesnt found)
 *  - Add middlewares for all the routes
 *  - Serve static files like: JavaScript, css, images, etc
 *  - Appends routes declared on other HRouter intances
 */
export class Halley extends HRouter {

    /**
     * Indicate the state of the project, the default value is "development".
     */
    private env: string;

    /**
     * Sets a callback function to execute in case that the requested route does not exists
     */
    private error: ((req: Request, res: Reply, unsettledPath: string) => void) = (_, res, unsettlePath) => {
        res.status(404);
        res.send(`<h2>The route: '${unsettlePath}' dont exists</h2>`);
    }

    /**
     * Contains the middlewares passed to the Halley class using the 'register' method
     */
    private middlewareStack: MiddlewareHandler[];

    /**
     * @param {HalleyOptions} options Is the unique parameter for Halley class constructor and it's an object.
     *
     * The values of every property of options indicate Halley.js how must create the http server or how must work some parts of Halley like the Pino logger (Not implemented yet)
     *
     * @param {string | undefined} options.path Indicate the `root path` of the main router, created at halley object creation 
     * 
     * @param {string | undefined} options.env Indicate to Halley how is be developed an project. If it isn't indicated, Halley will assume that is an development environment
     *
     * @param {boolean} options.logger Enable or disable the Pino logger
     *
     * @param {boolean} options.useNodeEnv If this option is indicated, a environment variable must be available so that Node.js can read
     */
    public constructor(options?: Partial<HalleyOptions>) {
        // Default value for the router will be a empty array
        super(options?.path || "/", options?.initialRoutes ?? []);
        this.middlewareStack = [];
        this.env = options?.env ?? "development";
    }

    /**
     * Read the request and push the contents into `req.body`
     * @returns {MiddlewareHandler} Returns an callback asynchronous arrow function used internally by Halley
     */
    public static rawBodyParser(): MiddlewareHandler {
        return async (req, _) => {
            let chunk: Buffer;

            req.body = ""; // Init the req.body to avoid "undefined" as the first value
            for await (chunk of req) {
                req.body += chunk.toString("utf-8");
            }
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
     * Matches the gived param with one route in `routeStack` and exec the handler of that matched route, before that, any middleware is executed
     *
     * @param {string} path The url of the route to match
     *
     * @param {string} method The http verb / method that will use the route
     *
     * @param {Request} req The server request object
     *
     * @param {Reply} res The server response object
     */
    private async makeSuitable(path: string | undefined, method: string | undefined, req: Request, res: Reply): Promise<void> {
        if (path && method) {
            const matchedRoute = super.iterateRoutes(path, method, req);
            if (!matchedRoute) {
                this.error(req, res, path);
            } else if (matchedRoute) {
                if (matchedRoute.middleware) {
                    // Check for individual middlewares
                    await Promise.resolve(await matchedRoute.middleware(req, res));
                }

                if (this.middlewareStack.length > 0) {
                    await Promise.all(
                        this.middlewareStack.map(callback => (
                            callback(req, res)
                        )
                    ));
                }

                matchedRoute.handler(req, res);
            }
        }
    }

    /**
     * Seat the error callback, executed when no route is founded in the route stack
     */
    public set setError(error: ((req: Request, res: Reply, unsettledPath: string) => void)) {
        this.error = error;
    }

    /**
     * Add a global middleware to the middleware stack
     * @param {MiddlewareHandler} middleware The source object that will be embedded into Halley class or the HalleyHandler that will be executed
     *
     * @returns `this` The object itself
     */
    public register(middleware: MiddlewareHandler): this {
        this.middlewareStack.push(middleware);
        return this;
    }

    /**
     * Add routes into the route stack
     *
     * Accept multiple routes in an array or only one route
     * @param {Route | Route[]} routes
     *
     * @returns `this` The object itself
     */
    public use(routes: Route | Route[] | HRouter): this {
        if (routes instanceof HRouter)
            super.add(routes.getRoutes);
        else
            super.add(routes);

        return this;
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
     * Import { Halley } from "@laniakea.js/halley.http"
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
        const server = createServer({ 
            IncomingMessage: Request,
            ServerResponse: Reply
        });

        server.on("request", async (req: Request, res: Reply) => {
            await this.makeSuitable(req.url, req.method, req, res);
        });

        if (options?.message) {
            if (typeof options?.message === "boolean") {
                console.log(`Halley listening on port \x1b[36m${port}\x1b[0m`);
            } else {
                options.message(port, super.getRoutes.length);
            }
        }

        return server.listen(port, options?.hostname);
    }
}
