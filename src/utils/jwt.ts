import jwbt from 'jsonwebtoken';
import logger from './logger';
import config from '../config/config';
import JWTDtoPayload from '../dto/JWTDtoPayload';
import LoggedInUserDtoPayload from '../dto/LoggedInUserDtoPayload';

const {
    accessTokenDuration,
    accessTokenSecretKey,
    refreshTokenDuration,
    refreshTokenSecretKey
} = config.auth;

if (!refreshTokenSecretKey || !accessTokenSecretKey) {
    throw new Error('Auth refresh and access token secrets cannot be empty.');
}

export async function generateAccessToken(data: LoggedInUserDtoPayload): Promise<string> {
    logger.log('info', 'JWT: Generating access token params ' + JSON.stringify({
        data,
        expiresIn: accessTokenDuration
    }));

    return jwbt.sign({ data }, accessTokenSecretKey, {
        expiresIn: accessTokenDuration
    });
}

export async function generateRefreshToken(data: JWTDtoPayload): Promise<string> {
    logger.log('info', 'JWT: Generating refresh token params ' + JSON.stringify({
        data,
        expiresIn: refreshTokenDuration
    }));

    return jwbt.sign({ data }, refreshTokenSecretKey, {
        expiresIn: refreshTokenDuration
    });
}

export async function verifyAccessToken(token: string): Promise<jwbt.JwtPayload | string> {
    return jwbt.verify(token, accessTokenSecretKey);
}

export async function verifyRefreshToken(token: string): Promise<jwbt.JwtPayload | string> {
    return jwbt.verify(token, refreshTokenSecretKey);
}