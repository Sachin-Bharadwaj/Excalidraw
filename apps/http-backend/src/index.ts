import express from "express";

const app = express();
const PORT = 3010;
app.listen(PORT, () => {
    console.log(`hhtp served started at port: ${PORT}`)
})