import { BACKEND_URL } from "../../../config";
import axios from "axios";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    height: number;
    width: number
} | {
    type: "circle";
    centerX: number,
    centerY: number,
    radius: number
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let existingShapes: Shape[] = await getExistingShapes(roomId);
    
    // socket message handlers
    socket.onmessage = (evt) => {
        const message = JSON.parse(evt.data);
        console.log(message);
        if (message.type = "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape);
            // since existingShape is updated, re-render Canvas by calling clearCanvas 
            clearCanvas(existingShapes, canvas, ctx);
        }
    }

    clearCanvas(existingShapes, canvas, ctx);
    let clicked = false;
    let startX = 0;
    let startY = 0;

    

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        //console.log(e.clientX, e.clientY);
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(e.clientX, e.clientY);
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width: width,
            height: height
        }
        existingShapes.push(shape);

        // since the state (existingShape) is updated, it needs to be send across
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape),
            roomId: parseInt(roomId)
        }));
        console.log(`Meesage send to ws-server: ${shape}`);

    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(startX, startY, width, height);
            //console.log(e.clientX, e.clientY);
            //console.log("drawing");
            //ctx?.beginPath();
            //ctx?.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
            //ctx?.fill();
        }
        

    });

}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.forEach(shape => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    });
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    })

    return shapes;

}