"use client";
import { useEffect, useRef } from 'react';
import { initDraw } from "../draw/index"

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }

    }, [canvasRef]);

    return (
        <div>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        </div>
    )


}