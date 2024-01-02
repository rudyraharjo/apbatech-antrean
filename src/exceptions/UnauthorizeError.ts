import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class UnauthorizeError
 * @extends {Error}
 */
class UnauthorizeError extends Error {
    /**
     * Error message to be thrown.
     *
     * @type {string}
     * @memberof UnauthorizedError
     */
    message: string;

    /**
     * Creates an instance of UnauthorizeError.
     *
     * @param {string} message
     * @memberof UnauthorizeError
     */
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);

        this.message = message;
    }
}

export default UnauthorizeError;