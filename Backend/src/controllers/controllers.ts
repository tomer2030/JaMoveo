import express, { NextFunction, Request, Response } from "express"
import UserModel from "../models/user-model";
import authLogic from "../logic/auth-logic";
import CredentialsModel from "../models/credentials-model";
import bandLogic from "../logic/band-logic";

// Make a router
const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Receive the user data from the front
        const user = new UserModel(request.body);

        // Generate token and return it
        const token = await authLogic.addNewUser(user);
        response.status(201).json(token);

    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        // Receive the user data from the front
        const credentials = new CredentialsModel(request.body);
        
        // Generate token and return it
        const token = await authLogic.login(credentials);
        response.json(token);

    }
    catch (err: any) {
        next(err);
    }
});

// get all instruments -> GET http://localhost:3001/api/instruments
router.get("/instruments", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get the instruments from the DB and sent them to the front
        const instruments = await bandLogic.getAllInstruments();     
        response.json(instruments);
    }
    catch (err: any) {
        next(err);
    }
});

// get all songs -> GET http://localhost:3001/api/songs
router.get("/songs", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get the songs from the DB and sent them to the front
        const songs = await bandLogic.getAllSongs();     
        response.json(songs);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;