import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import APIResponseInterface from '../dto/APIDtoResponse';
import logger from '../utils/logger';

/**
 * Build error response for validation errors.
 *
 * @param  {Error} err
 * @return {Object}
 */
function buildError(err: any): APIResponseInterface {

    if (err.isJoi) {
        return {
            code: StatusCodes.BAD_REQUEST,
            message: getReasonPhrase(StatusCodes.BAD_REQUEST),
            errors:
                err.details &&
                err.details.map((error: any) => ({
                    param: error.path.join('.'),
                    message: error.message
                }))
        };
    }

    if (err.isBoom) {
        return {
            code: err.output.statusCode,
            message: err.output.payload.message || err.output.payload.error
        };
    }

    if (err.isCustom) {
        return {
            code: err.statusCode,
            message: err.message
        };
    }

    // Validate Sequelize
    if (err.errors) {

        // console.log("KESINI GA SI LU");

        const errObj: any = {};

        err.errors.map((er: any) => {
            errObj[er.path] = er.message;
        });

        return {
            code: StatusCodes.BAD_REQUEST,
            message: getReasonPhrase(StatusCodes.BAD_REQUEST),
            errors: err.errors &&
                err.errors.map((er: any) => ({
                    param: er.path,
                    message: er.message
                }))
            // errors: errObj
        };
    }

    // multer
    // if (err instanceof multer.MulterError) {
    // console.log("multer.MulterError")
    // console.log("multer.MulterError Code", err.code);
    // console.log("multer.MulterError field", err.field);
    // console.log("Message ", err.name + ', ' + err.message);
    // error multer 
    // }

    // console.log("Error Name => ", err.name);

    /**
     * Manage Error by sequilize 
     */
    if (err.name === "SequelizeConnectionAcquireTimeoutError") {
        return {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Operation timeout"
        };
    }

    if (err.name === "SequelizeForeignKeyConstraintError") {
        return {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.name,
            errors: err.message
        };
    }

    if (
        err.name === "SequelizeDatabaseError" ||
        err.name === "SequelizeConnectionError" ||
        err.name === "BAD_REQUEST") {
        return {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.original["sqlMessage"],
        };
    }

    return {
        code: StatusCodes.BAD_REQUEST,
        message: err.name + ', ' + err.message,
    };

}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export default function ErrorHandlerMiddleware(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __: NextFunction
): void {
    const error = buildError(err);
    logger.log('error', err.stack || err.message);
    res.status(error.code).json(error);
}