
import express from "express"
import dotenv from "dotenv"
import connectDB from "./configs/connectDB.js"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import assistantRouter from "./routes/assistant.routes.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const privateCors =
    cors({
        origin: ["http://localhost:5173"],
        credentials: true
    });

const publicCors =
    cors({
        origin: "*",
    })


const PORT = process.env.PORT

app.get("/", (req, res) => {
    return res.json(`Hello from server `)
})
app.use("/api/auth", privateCors, authRouter)
app.use("/api/user", privateCors, userRouter)
app.use("/api/assistant", publicCors, assistantRouter)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    connectDB()
})

