import dal from "../utils/dal";
import sqlQueries from "../utils/sql-queries";
import { Server as SocketIoServer, Socket } from "socket.io";
import InstrumentModel from "../models/instrument-model";import { Server as HttpServer } from 'http';
import SongModel from "../models/song-model";
import fs from "fs";
import UserModel from "../models/user-model";



// Function for get all the instruments
async function getAllInstruments() :Promise<InstrumentModel[]> {
    const instruments = await dal.execute(sqlQueries.getInstruments);
    return instruments;
}

// Function for create Socket.io server and all the logics 
function createSocketIoServer(httpServer: HttpServer): void {

    // Create a Socket.IO server
    const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "*" }});

    // Handle socket connections (check here if i need to escribe what happened when the server is open)
    socketIoServer.sockets.on('connection', (socket: Socket) => {
        socket.on("user-connect", (user: UserModel) =>{
            console.log(`User connected: ${user?.username}`);
            console.log(`Socket id: ${socket.id}`);
        })

        // Listen when the admin start the session
        socket.on('startSession', (songName: string) => {

            console.log(`Starting a session with the song: ${songName}`);

            // Send a start message to all clients
            socketIoServer.sockets.emit("startSession", songName);
        });

        // Listen hen the admin end the session
        socket.on('endSession', () => {

            console.log(`Ending a session `);
            socketIoServer.sockets.emit("endSession");
        });
  
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

// Function for get all the songs
async function getAllSongs(): Promise<SongModel[]> {
    let allSongs: SongModel[] = [];
    
    try{
        const data = fs.readFileSync("../Database/hey_jude.json", "utf8")
        // Get the file and parse it to array
        allSongs.push(JSON.parse(data)); 
    } catch (error) {
            console.error("Error parsing JSON:", error);
    }
    try{
        const data = fs.readFileSync("../Database/veech_shelo.json", "utf8")
        // Get the file and parse it to array
        allSongs.push(JSON.parse(data)); 
    } catch (error) {
            console.error("Error parsing JSON:", error);
    }

    return allSongs;
}

export default { getAllInstruments, createSocketIoServer, getAllSongs};