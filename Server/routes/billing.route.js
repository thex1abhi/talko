
import express from "express"
import { createOrder, verifyOrder } from "../controllers/billing.controller.js"
import { isAuth } from "../middlewares/isAuth.js"

const billingRouter = express.Router()

billingRouter.post("/order", isAuth, createOrder)
billingRouter.post("/verify", isAuth, verifyOrder)


export default billingRouter

