'use strict';

import { type Handler } from "../halley";

export type RouteHandler = () => void

export class HRouter {
    get: RouteHandler
    post: RouteHandler
    put: RouteHandler
    delete: RouteHandler
}