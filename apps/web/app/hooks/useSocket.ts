"use client"
import { useState, useEffect } from "react";
import { WS_URL } from "../../../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

    useEffect(() => {
        const socket = new WebSocket(`${WS_URL}?token=${localStorage.getItem("token")}`);
        socket.onopen = () => {
            setLoading(false);
        };
        setSocket(socket);
    }, []);

    return {
        socket,
        loading
    }
}