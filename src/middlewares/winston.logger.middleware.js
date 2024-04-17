import winston from "winston";
import { resolve } from 'node:path'

const logger = winston.createLogger(
    {
        level: "info",
        format: winston.format.json(),
        defaultMeta: { service: 'request-login' },
        transports: [
            new winston.transports.File({ filename: resolve('uploads', 'logs', 'WinstonLogs.txt') })
        ]
    }
);

export default async function WinstonLoggerMiddleware(req, res, next) {
    if (!req.url.includes('signin')) {
        const logData = `${req.url} - ${JSON.stringify(req.body)}`
        logger.info(logData);
    }
    next();
} 