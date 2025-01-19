"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: number
}) {
    const { loading, socket } = useSocket();
    const [chats, setChats] = useState<{message: string}[]>(messages);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        if(socket && !loading) {

            // subscribe to the room
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            // listen to msgs
            socket.onmessage = (evt) => {
                const parsedData = JSON.parse(evt.data);
                if (parsedData.type === "chat") {
                    setChats(c => [...c, {message: parsedData.message}]);

                }
            }
        }
        
    }, [socket, loading, id])

    return (
        <div>
            {chats.map(c => <div>{c.message}</div>)}
            <input value={currentMessage} type="text" onChange={(e) => {
                setCurrentMessage(e.target.value);
            }}/>
            <button onClick={() => {
                socket?.send(JSON.stringify({
                    type: "chat",
                    message: currentMessage,
                    roomId: id
                }))
                setCurrentMessage("");
            }}>Send</button>
        </div>
    )
}