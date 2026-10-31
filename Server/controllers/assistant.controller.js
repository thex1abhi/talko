import { generateGeminiResponse } from "../configs/gemini.js";
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


        if (user.plan === "free"
            && user.totalMessages >= user.requestLimit) {
            return res.status(404).json({ message: "Free limit reached " })
        }

        if (user.plan === "pro" && new Date(user.proExpiresAt) < new Date()) {
            user.plan === "free"
            await user.save()

            return res.status(400).json({ message: "Pro plan expired" })
        }

        const cleanMessage = message.toLowerCase()

        if (user.enableNavigation) {
            const navigationWords = [
                "open",
                "go",
                "start",
                "show",
                "navigate",
                "take me "
            ];

            const wantsNavigation =
                navigationWords.some((word) =>
                    cleanMessage.startsWith(word)
                );

            if (wantsNavigation) {

                const matchedPage = user.pages.find((page) =>
                    page.keywords.some((keyword) =>

                        cleanMessage.includes(
                            keyword.toLowerCase()
                        )
                    )
                )

                if (matchedPage) {
                    if (req.body.currentPath === matchedPage.path) {
                        return res.json({
                            success: true,
                            response: `${matchedPage.name} already open `
                        })
                    }
                    return res.json({
                        success: true,
                        action: "navigate",
                        path: matchedPage.path,
                        response: `Opening  ${matchedPage.name}`
                    })
                }
            }
        }

        const prompt = `  
        
        You are ${user.assistantName} .

        Business Name: ${user.businessName} 

        Business Type : ${user.businessType} 

        BusinessDescription : ${user.businessDescription}

        Assistant Tone : ${user.tone} 

        Rules : 
        -Keep replies udner 15 words.
        -Give fast direct responses. 
        -Talk naturally 
        -Behave like smart voice assistant 
        -Avoid long explanations 
        -keep response short fro quick voice playback  
        
        User Question : ${message}

        `;

        const aiResponse = await generateGeminiResponse(prompt, user.geminiApiKey, user)

        if (user.plan === "free") {
            user.totalMessages += 1
            await user.save();
        }

        return res.json({
            success: true,
            aiResponse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Assistant AI error"
        })
    }
}