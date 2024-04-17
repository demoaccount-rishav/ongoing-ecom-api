import { appendFile } from 'node:fs/promises'
import { resolve } from 'node:path';

async function log(logData) {
    try {
        const log_data = `\n\n${new Date().toString()} - ${logData}`;
        await appendFile(resolve('uploads', 'logs', 'logs.txt'), log_data);
    } catch (err) {
        console.log(err);
    }
}

export default async function loggerMiddleware(req, res, next) {
    if (!req.url.includes('signin')) {
        const logData = `${req.url} - ${JSON.stringify(req.body)}`
        await log(logData);
    }
    next();
} 