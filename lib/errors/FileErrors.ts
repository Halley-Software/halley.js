/**
 * Exceptions for errors related to files, paths, etc...
 */
'use strict';

export default class HALLEY_FILE_ERROR extends Error {
    constructor(message: string, name: string) {
        super(message);
        super.name = name;
    }

    public static HALLEY_PATH_IS_NOT_ABSOLUTE = new this("The path must an absolute path!", "HALLEY_PATH_IS_NOT_ABSOLUTE");
    public static HALLEY_ARGUMENT_IS_NOT_A_DIR = new this("The path must be a directory!", "HALLEY_ARGUMENT_IS_NOT_A_DIR");
}
