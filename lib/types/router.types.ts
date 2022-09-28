/**
 * This file contain all the types that HRouter need
 */

import { HalleyListener } from "./halley.types"

/**
 * @interface Route Indicate how a route must be structured in his full-form.
 * 
 * Just like is detailed in the HRouter.add method
 */

export interface Route {
    path: string;
    method: string;
    handler: HalleyListener;
};

/**
 * @type RouteParam allow we the possibility of send a unique route or an Array with routes
 */
export type RouteParam = Route | Route[];