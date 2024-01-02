import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, label, printf, json } = format;

const LABEL: string = "Log .. ";

let logger: Logger;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const fileLogs = new DailyRotateFile({
    filename: "logs/log-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "7d",
});

const fileLogErrors = new DailyRotateFile({
    level: "error",
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "7d",
});

logger = createLogger({
    level: "debug",
    format: combine(label({ label: LABEL }), timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
    }), customFormat), //json()
    transports: [fileLogs, fileLogErrors, new transports.Console()],
});


export default logger;