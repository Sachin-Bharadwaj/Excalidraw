import 'dotenv/config'
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from './middleware';
import { JWT_USER_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";

const saltRounds = 10;
const app = express();
app.use(express.json());

// signup endpoint
app.post("/auth/signup", (req, res) => {
    // zod validation
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }


    res.json({
        userId: 123
    })

})

// signin endpoint
app.post("/auth/signin", (req, res) => {
    // zod validation
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const userId = 1;
    const token = jwt.sign({ userId: userId }, JWT_USER_SECRET);
    res.json({ "token": token });

});

// authenticated endpoint, 
app.post("/room", middleware, (req, res) => {
    // zod validaton
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    // db call

    res.json({
        roomId: 123
    })
    
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`hhtp served started at port: ${PORT}`)
})