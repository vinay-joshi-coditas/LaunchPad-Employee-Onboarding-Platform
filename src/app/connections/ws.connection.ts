import { Server, type Socket } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import { publicKey, verifyToken } from "../utilities/jwt.js";
import type { UserRole } from "../utilities/enums.js";

let io: Server;

interface JWTPayload {
  userId: string;
  role: UserRole;
}
interface AuthenticatedSocket extends Socket {
  user: JWTPayload;
}

export const initWS = (httpServer: HttpServer): Server => {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:3000"],
            //   origin: "*",
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    });

    console.log('registering socket')
    
    io.use((socket, next) => {
      try {
        console.log("+++++++++++++++");
        const token =
        (socket.handshake.auth?.token as string) ??
        (socket.handshake.query?.token as string);
        
        if (!token) {
            return next(new Error("Authentication token missing"));
        }
        
            const payload = jwt.verify(token, publicKey) as JWTPayload;
            
            (socket as AuthenticatedSocket).user = payload;
            next();
        } catch {
            next(new Error("Invalid or expired token"));
        }
    });
    
    io.on("connection", (socket) => {
      console.log("================");
    const { userId, role } = (socket as AuthenticatedSocket).user;
    console.log(
      `[WS] connected  userId=${userId}  role=${role}  socketId=${socket.id}`,
    );

    socket.join(`room:user:${userId}`);

    if (role === "HR") {
      socket.join("room:hr");
    }

    if (role === "Manager") {
      socket.join(`room:manager:${userId}`);
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[WS] connected  userId=${userId}  role=${role}  socketId=${socket.id}`,
      );
    }

    socket.on("disconnect", () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[WS] disconnected socketId=${socket.id}`);
      }
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error(
      "WebSocket server has not been initialised. Call initWS(httpServer) in index.ts first.",
    );
  }
  return io;
};
