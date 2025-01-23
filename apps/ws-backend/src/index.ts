import 'dotenv/config'
import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_USER_SECRET } from "@repo/backend-common/config";
import { parse } from 'dotenv';
import { prismaClient } from "@repo/db/client";

interface User{
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];

const wss = new WebSocketServer({ port: process.env.WS_PORT ? parseInt(process.env.WS_PORT) : undefined });

function checkUser(token: string): string | null {
    try{
        const decoded = jwt.verify(token ?? "", JWT_USER_SECRET ?? "") as JwtPayload;
        if(!decoded.userId) {
            return null;
        }
        return decoded.userId;
    } catch(err) {
        return null
    }   
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    // decode the token
    const userId = checkUser(token ?? "");
    if(!userId) {
        ws.close();
        return
    }

    ws.on('error', console.error);

    // fill the user state
    users.push({
        userId: userId,
        rooms: [],
        ws: ws
    })

    // {type: "join_room", roomId: 1}, {type: "chat", message: "Hello", roomId: 1}, 
    // {type: "leave_room", roomId:1}
    ws.on('message', async function message(data) {
        // data is usually a string, parse to JSON
        const parsedData = JSON.parse(data.toString());
        

        if (parsedData.type === "join_room") {
            // ideally first you should check in Database where this room exists or not, if yes
            // then only user can subscribe to this room, we are skipping this for now
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
            console.log(`Joined room: ${JSON.stringify(parsedData)}`);
        }

        if (parsedData.type === "leave_room") {
            // ideally first you should check in Database where this room exists or not, if yes
            // then only user can leave this room, we are skipping this for now
            const user = users.find( x => x.ws === ws);
            if(!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.roomId);
            console.log(`Left room: ${parsedData}`);
        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            console.log(`Chat message: ${message}`);
            // store message in database (beter approach is to push it to a Queue)
            try{
                await prismaClient.chat.create({
                    data: {
                        roomId: roomId,
                        message: message,
                        userId: userId
                    }
                })
            } catch(err) {
                console.log(`Error while creating chat: ${err}`)
            }


            // iterate and broadcase the message
            users.forEach(user => {
                if (user.rooms.includes(roomId.toString())) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId: roomId
                    }))
                }
            })
        }

    });


});