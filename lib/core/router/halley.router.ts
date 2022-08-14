'use strict';

/**
 * Halley.JS dependencies
 */
import { type RouteHandler } from "../halley";

export class HRouter {
    get: RouteHandler;
    post: RouteHandler;
    put: RouteHandler;
    delete: RouteHandler;
    private routes = [];

    constructor() {
        this.get;
        this.post;
        this.put;
        this.delete;
        this.routes;
    }
}