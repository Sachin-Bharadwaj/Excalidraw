import 'dotenv/config'
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from './middleware';
import { JWT_USER_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client"
import cors from "cors";

//const JWT_USER_SECRET = "123123"
const saltRounds = 10;
const app = express();
app.use(cors());
app.use(express.json());

// signup endpoint
app.post("/auth/signup", async (req, res) => {
    // zod validation
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // store in database
    try{
        const user = await prismaClient.user.create({
            data : {
                email: parsedData.data.email,
                password: await bcrypt.hash(parsedData.data.password, saltRounds),
                name: parsedData.data.name
            }   
        })

        res.json({
            message: "User created successfully",
            userId: user.id
        });

    } catch(err) {
        res.status(411).json({
            message: "User already eists with this email"
        })
    }


})

// signin endpoint
app.post("/auth/signin", async (req, res) => {
    // zod validation
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // check if user with email exists in the database
    const user = await prismaClient.user.findUnique({
        where: {
            email: parsedData.data.email
        }
    })
    if(!user) {
        res.status(400).json({
            message: "Incorrect user email"
        })
        return;
    }

    // if user exists, check the password
    const result = await bcrypt.compare(parsedData.data.password, user.password);
    if(result) {
        // generate token
        const token = jwt.sign({ userId: user.id }, JWT_USER_SECRET);
        res.json({
            token: token
        })

    } else {
        res.status(400).json({
            message: "user password mismatch"
        })
    }

});

// authenticated endpoint, 
app.post("/room", middleware, async (req, res) => {
    // zod validation
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    // db call
    const userId = req.userId;
    
    try{
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.slug,
                adminId: userId
            }
        });

        res.json({
            message: "Room created successfully",
            roomId: room.id
        });

    } catch(err) {
        res.status(500).json({
            mesage: "could not create room"
        })
    }
    
});

app.get("/chats/:roomId", async (req, res) => {
    const roomId = parseInt(req.params.roomId);
    try{
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        res.json({
            messages: messages
        })
    } catch(err) {
        res.json(411).json({
            message: "could not fetch messages",
            error: err
        })
    }

})

// given slug, get room id
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    try{
        const result = await prismaClient.room.findFirst({
            where: {
                slug: slug
            }
        });
        res.json({
            roomId: result?.id
        })
    } catch(err) {
        res.json(411).json({
            message: "could not find room id",
            error: err
        })
    }

})

const PORT = process.env.HTTP_PORT;
app.listen(PORT, () => {
    console.log(`hhtp served started at port: ${PORT}`)
})