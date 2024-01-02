
import Error from './Error';

/**
 * @class TokenRequired
 * @extends {Error}
 */
class TokenRequired extends Error {
    /**
     * Error message to be thrown.
     *
     * @type {string}
     * @memberof UnauthorizedError
     */
    message: string;

    /**
     * Creates an instance of TokenRequired.
     *
     * @param {string} message
     * @memberof TokenRequired
     */
    constructor(message: string) {
        super(message, 499); // 499 Token Required or Client Closed Request

        this.message = message;
    }
}

export default TokenRequired;