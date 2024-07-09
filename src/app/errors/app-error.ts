class AppError extends Error {
    private status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status

        // set error stackTrace
        Error.captureStackTrace(this, this.constructor)
    }

    get statusValue() {
        return this.status
    }

    get stackValue() {
        return this.stack
    }
}

export default AppError