/**
 * This file contain all the types that HRouter need
 */

'use strict';

import { HalleyListener } from "./Halley.types.js";

/**
 * Route Defines the structure of a route.
 * 
 * It consumes a path, mathod and a handler:
 * Repectively the types are:
 * * path - `string`
 * * method - `string`
 * * Function - `HalleyListener`
 */

export interface Route {
    path: string;
    method: string;
    handler: HalleyListener;
}