

import express from "express"
import { getAssistantconfig } from "../controllers/assistant.controller.js"

const assistantRouter = express.Router()

assistantRouter.get("/config/:userId", getAssistantconfig)


export default assistantRouter

