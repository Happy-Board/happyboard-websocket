'use strict'

const { StatusCodes, ReasonPhrases } = require('./httpStatusCode')

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.status = statusCode
        this.now = Date.now()
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message,statusCode)
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message,statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
        super(message,statusCode)
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message,statusCode)
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message,statusCode)
    }
}

class ProxyAuthenticationRequired extends ErrorResponse {
    constructor(message = ReasonPhrases.PROXY_AUTHENTICATION_REQUIRED, statusCode = StatusCodes.PROXY_AUTHENTICATION_REQUIRED) {
        super(message,statusCode)
    }
}

module.exports = {
    ErrorResponse,
    NotFoundError,
    ConflictRequestError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    ProxyAuthenticationRequired
}