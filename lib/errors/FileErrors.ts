/**
 * Exceptions for errors related to files, paths, etc...
 */

export class FileError extends Error {
    constructor(message: string, name: string) {
        super(message);
        this.name = name;
        this.message = message;
    }
}

export const HALLEY_PATH_IS_NOT_ABSOLUTE = new FileError("The path must an absolute path!", "HALLEY_PATH_IS_NOT_ABSOLUTE");

export const HALLEY_ARGUMENT_IS_NOT_A_DIR = new FileError("The path must be a directory!", "HALLEY_ARGUMENT_IS_NOT_A_DIR");