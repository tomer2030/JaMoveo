import { Server as HttpServer } from 'http';
import express from "express";
import { Server as SocketIoServer, Socket } from "socket.io";
import cors from "cors"
import appConfig from "./utils/app-config";
import catchAll from "./middleware/catch-all";
import routeNotFound from "./middleware/route-not-found";
import router from "./controllers/controllers";
import verifyLoggedIn from "./middleware/verify-logged-in";
import verifyAdmin from "./middleware/verify-admin";
import bandLogic from "./logic/band-logic"

// Create a express server
const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use("/api", router);
expressServer.use("*", routeNotFound);
expressServer.use(verifyLoggedIn);
expressServer.use(verifyAdmin);
expressServer.use(catchAll);

const httpServer: HttpServer = expressServer.listen(appConfig.port, () => console.log(`Listening on port ${appConfig.port}`));

// Create a Socket.IO server
bandLogic.createSocketIoServer(httpServer);

  
