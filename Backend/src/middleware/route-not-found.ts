import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../models/errors-model";

function routeNotFound(request: Request, response: Response, next: NextFunction) {

    const err = new RouteNotFoundErrorModel(request.originalUrl);

    next(err);
}

export default routeNotFound;
