import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

// Function for catch errors
function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // Log the error on the console
    console.log(err);

    const status = err.status || 500;

    // Log the error to an error log file
    if(status === 500) logger(err);

    // Return the error to the front
    response.status(status).send(err.message);
}

export default catchAll;