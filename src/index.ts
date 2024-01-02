import app from './app';
import config from './config/config';
import logger from './utils/logger';
const { port, appUrl, name } = config;

const start = () => {
    try {
        app.listen(port, () => {
            logger.log('info', `App ${name} Server started at ${appUrl}:${port}`);
        });
    } catch (error) {
        logger.error('Event error', error);
        process.exit(1);
    }
};

void start();
