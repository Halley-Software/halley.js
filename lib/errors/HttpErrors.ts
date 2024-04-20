/**
 * Exceptions for errors related to bad status codes, headers, unexecpected body, etc...
 */
'use strict';

export default class HALLEY_HTTP_ERROR extends Error {
    constructor(message: string, name: string) {
        super(message)
        super.name = name
    }
}