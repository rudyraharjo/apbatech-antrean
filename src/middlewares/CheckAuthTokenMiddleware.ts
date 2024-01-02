import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as jwt from '../utils/jwt';
import { UserRepository } from '../module/user/user.repository';

const checkAuthToken = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const tokenHeader = req.header('x-token');
        const usernameHeader = req.header('x-username');

        // Pastikan x-token dan x-username ada dalam header
        if (!tokenHeader || !usernameHeader) {
            res.status(401).json({
                metadata: {
                    message: 'Token or username missing',
                    code: 400
                }
            });
            return;
        }

        const decodedToken: any = await jwt.verifyAccessToken(tokenHeader);
        const user = await UserRepository.findByUsername(usernameHeader);

        if (!decodedToken || !user) {
            return res.status(401).json({
                metadata: {
                    message: 'Invalid token or user not found',
                    code: 401
                }
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};

export default checkAuthToken;
