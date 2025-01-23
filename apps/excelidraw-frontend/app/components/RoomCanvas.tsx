"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../../../config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string}) {
    // create web socket connection
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${localStorage.getItem("token")}`);
        ws.onopen = () => {
            console.log("connected to server");
            setSocket(ws);

            // send join room message
            ws.send(JSON.stringify({
                type: "join_room",
                roomId: roomId
            }));
            console.log(`joined roomid: ${roomId}`);

        }

        return () => {
            ws.close();
        }
    }, []);
    
    if (!socket) {
        return (
            <div>
                connecting to WebSocket server...
            </div>
        )
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket}/>
        </div>
    )

}