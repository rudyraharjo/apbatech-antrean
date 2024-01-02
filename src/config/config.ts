import dotenv from "dotenv";
dotenv.config();

const isTestEnvironment = process.env.APP_MODE === 'development';

const hostName = process.env.APP_MODE === 'production' || process.env.APP_MODE === 'staging' ? process.env.APP_URL : process.env.APP_URL + ':' + process.env.APP_PORT

export default {
    name: process.env.APP_NAME,
    hostname: hostName,
    appUrl: process.env.APP_URL,
    environment: process.env.APP_MODE || 'development',
    port: process.env.APP_PORT,
    timezone: isTestEnvironment ? process.env.TIMEZONE_LOCAL : process.env.TIMEZONE_PROD,
    radiusToleransi: process.env.RADIUS_TOLERANSI ? process.env.RADIUS_TOLERANSI : "0.3",
    pagination: {
        page: 1,
        maxRows: 50
    },
    auth: {
        accessTokenDuration: process.env.JWT_TOKEN_DURATION || '7d',
        refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION || '8d',
        accessTokenSecretKey: process.env.JWT_TOKEN_SECRET || '4b2715c3f0fa6ff43f626ff3412e13b8b06d8e2dbe18b060a18bb8a71f710c31',
        refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET || '2ff9da3e41ea28a785c9454fefde16a5b980578ca8c2349ba58281a2feb66933',
        emailVerificationDuration: process.env.EMAIL_VERIFICATION_DURATION || 24,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME as string,
        user: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD,
    }
};