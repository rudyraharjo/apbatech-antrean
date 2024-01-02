import mysql from 'mysql2';
import config from './config';

const dbConfig = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    timezone: config.timezone
};

const pool = mysql.createPool(dbConfig);

export default pool.promise();
