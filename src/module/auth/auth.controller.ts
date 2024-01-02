import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';
import { AuthService } from './auth.service';

export async function generateToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'GET /auth/generateToken');
    try {

        const username = req.header('x-username');
        const password = req.header('x-password');

        if (typeof username !== 'string' || typeof password !== 'string') {
            // Tangani error di sini, misalnya kirim respons dengan kode status 400
            res.status(StatusCodes.BAD_REQUEST).json({
                response: null,
                metadata: {
                    message: 'Invalid username or password',
                    code: StatusCodes.BAD_REQUEST
                }
            });
            return;
        }

        const result = await AuthService.generateToken(username, password);

        res.status(StatusCodes.OK).json({
            response: { token: result },
            metadata: {
                message: 'Ok',
                code: StatusCodes.OK
            }
        });

    } catch (err) {
        next(err);
    }
}

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    logger.log('info', 'POST /auth/register');
    try {

        const result = await AuthService.register(req.body);

        res.status(StatusCodes.CREATED).json({
            response: { token: result },
            metadata: {
                message: 'Successfully created new user',
                code: StatusCodes.CREATED
            }
        });

    } catch (err) {
        next(err);
    }
}