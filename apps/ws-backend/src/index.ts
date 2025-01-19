import 'dotenv/config'
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_USER_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: process.env.PORT ? parseInt(process.env.PORT) : undefined });

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    // decode the token
    const decoded = jwt.verify(token ?? "", JWT_USER_SECRET ?? "") as JwtPayload;
    if(!decoded.userId) {
        ws.close();
        return
    }

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        ws.send('pong');
    });


});