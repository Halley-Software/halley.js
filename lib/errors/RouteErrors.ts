/**
 * Exceptions for errors related to routes
 */
'use strict';

export default class HALLEY_ROUTE_ERROR extends Error {
    constructor(message: string, name: string) {
        super(message)
        super.name = name
    }

    public static HALLEY_ROUTE_DO_NOT_START_WITH_SLASH = new this("A route must start with '/'!", "HALLEY_ROUTE_DO_NOT_START_WITH_SLASH");
}
