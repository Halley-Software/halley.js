export class FileError extends Error {
    constructor(message: string, name: string) {
        super(message)
        this.name = name
        this.message = message
    }
}