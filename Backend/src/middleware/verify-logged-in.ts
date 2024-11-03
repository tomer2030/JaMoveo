import { NextFunction, Request, Response } from "express";
import authService from "../utils/authService";
import { UnauthorizedErrorModel } from "../models/errors-model";

// Middleware for check if the user logged in
async function verifyLoggedIn(request: Request, response: Response, next: NextFunction){

    try{
        const isValid = await authService.verifyToken(request);
        if(!isValid) throw new UnauthorizedErrorModel("Invalid token");
        next();
    }
    catch(err: any){
        next(err);
    }

}

export default verifyLoggedIn;