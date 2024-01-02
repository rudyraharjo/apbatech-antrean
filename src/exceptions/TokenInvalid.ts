import Error from './Error';

/**
 * @class TokenInvalid
 * @extends {Error}
 */
class TokenInvalid extends Error {
    /**
     * Error message to be thrown.
     *
     * @type {string}
     * @memberof UnauthorizedError
     */
    message: string;

    /**
     * Creates an instance of TokenInvalid.
     *
     * @param {string} message
     * @memberof TokenInvalid
     */
    constructor(message: string) {
        super(message, 498); // 498 Invalid Token

        this.message = message;
    }
}

export default TokenInvalid;