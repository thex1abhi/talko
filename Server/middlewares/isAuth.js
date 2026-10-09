import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: ` Token not found` })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: `user does not has a valid token ` })
        }
        req.userId = verifyToken.userId

        next()
    } catch (error) {
        console.log(`isAuth error : ${error}`);
        return res.status(500).json({ message: `IsAuth error ${error} ` })
    }
}