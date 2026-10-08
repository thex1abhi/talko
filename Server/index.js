
import express from "express"
import dotenv from "dotenv"
import connectDB from "./configs/connectDB.js"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT

app.get("/", (req, res) => {
    return res.json(`Hello from server `)
})
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    connectDB()
})

