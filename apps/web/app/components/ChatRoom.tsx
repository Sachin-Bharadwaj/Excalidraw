import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: number) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
}

export async function ChatRoom({id}: {
    id: number
}) {
    const chats = await getChats(id);

    return (
        <ChatRoomClient id={id} messages={chats} />
    )
}