import ApplicationError from "../error-handler/applicationError.js";

import { errorLog } from "./logger.middleware.js"

export async function defaultErrorHandlerMiddleware(err, req, res, next) {

    if (err instanceof ApplicationError) {
        return res.status(err.errorCode).json({ 'msg': 'Error Encountered Due To Wrong User Input', 'error': err.message })
    }
    else {
        const logData = `reqUrl: ${req.originalUrl} - reqMethod: ${req.method} - error: ${err.message}`;
        await errorLog(logData);
        return res.status(500).json({ 'msg': 'Error Encountered Due To Programmer', 'error': err.message });
    }
}