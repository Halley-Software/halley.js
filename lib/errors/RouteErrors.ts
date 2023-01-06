/**
 * Exceptions for errors related to routes
 */

export class HALLEY_ROUTE_ERROR extends Error {
    constructor(message: string, name: string) {
        super(message)
        this.name = name
        this.message = message
    }
}

export const HALLEY_ROUTE_DO_NOT_START_WITH_SLASH = new HALLEY_ROUTE_ERROR("A route must start with '/'!", "HALLEY_ROUTE_DO_NOT_START_WITH_SLASH");