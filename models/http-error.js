class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); //pass message to Error class
        this.code = errorCode;
    }
};

module.exports = HttpError;