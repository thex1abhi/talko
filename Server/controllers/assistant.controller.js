import User from "../models/user.model.js";

export const getAssistantconfig = async (req, res) => {

    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-geminiApiKey")
        if (!user) {
            return res.status(404).json({ message: " failed to get user " })
        }

        return res.status(200).json({ message: "Assistant config  data  ", user })
    } catch (error) {
        return res.status(500).json({ message: `Assistant config error ${error} ` })
    }
}


export const askAssistant = async (req, res) => {
    try {
        const { message, userId } = req.body

        if (!message || !userId) {
            return res.status(400).json({ message: "Message and userId are required" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (!user.geminiApiKey) {
            return res.status(404).json({ message: "gemini apikey is not added " })
        }

    } catch (error) {
        return res.status(500).json({ message: `Assistant config error ${error} ` })

    }
}