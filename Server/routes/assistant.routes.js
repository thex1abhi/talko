

import express from "express"
import { askAssistant, getAssistantconfig } from "../controllers/assistant.controller.js"

const assistantRouter = express.Router()

assistantRouter.get("/config/:userId", getAssistantconfig)
assistantRouter.post("/ask", askAssistant)


export default assistantRouter

