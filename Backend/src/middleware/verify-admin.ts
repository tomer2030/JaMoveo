import { NextFunction, Request, Response } from "express";
import authService from "../utils/authService";
import { UnauthorizedErrorModel } from "../models/errors-model";

// middleware for check if the current user is admin or not
async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try{
        const isAdmin = await authService.verifyAdmin(request);
        if(!isAdmin) throw new UnauthorizedErrorModel("you are not admin");
        next();
    }
    catch(err: any){
        next(err);
    }
    
}

export default verifyAdmin;