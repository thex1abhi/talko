import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: `failed to get current user  ${error} ` })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `getCurrentUser error ${error} ` })
    }
}

export const saveAssistant = async (req, res) => {
    try {
        const { assistantName, businessName, businessType, businessDescription, tone,
            theme, geminiApiKey, pages, } = req.body

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: `failed to get current user  ${error} ` })
        }

        user.assistantName = assistantName;
        user.businessName = businessName;
        user.businessType = businessType;
        user.businessDescription = businessDescription;
        user.tone = tone;
        user.theme = theme;
        user.geminiApiKey = geminiApiKey;
        user.pages = pages;

        if (geminiApiKey) {
            user.geminiApiKey = geminiApiKey
        }

        user.geminiStatus = "active";
        user.pages = pages || [];
        user.isSetupComplete = true;

        await user.save()

        return res.status(200).json({ message: "Assistant saved successfully ", user })


    } catch (error) {
        return res.status(500).json({ message: `save assistant error  ${error} ` })
    }
}
