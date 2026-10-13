
import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi"

const THEMES = [
    "light",
    "dark",
    "glass",
    "neon"
]

const TONES = [
    "friendly",
    "professional",
    "sales"
]


function Builder({ user, setUser }) {

    const [assistantName, setAssistantName] = useState(user?.assistantName || "");
    const [businessName, setBusinessName] = useState(user?.businessName || "");
    const [businesstype, setBusinessType] = useState(user?.businesstype || "");
    const [businessDescription, setBusinessDescription] =
        useState(user?.businessDescription || "");
    const [theme, setTheme] = useState(user?.Theme || "dark");
    const [tone, settone] = useState(user?.tone || "Friendly");
    const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "");
    const [pages, setPages] = useState(user?.pages || []);
    const [pageName, setPageName] = useState("");
    const [pagePath, setPagePath] = useState("");
    const [pageKeywords, setPageKeywords] = useState("");


    const addPage = () => {
        if (!pageName || pagePath) return;
        const newPage = {
            name: pageName,
            path: pagePath,
            keyword: pageKeywords.split(",").map((k) => k.trim())
        }

        setPages([...pages, newPage])
        setPageName("")
        setPagePath("")
        setPageKeywords("")
    }

    const removePage = (index) => {
        const updatePages = pages.filter((_, i) => i !== index)
    } 

    return (
        <>
            <div className="min-h-screen bg-[#f7f8fc]  px-4 py-8   ">
                <div className="max-w-4xl mx-auto ">
                    <div className="">
                        <h2 className="text-3xl font-bold  text-[#081028]  ">
                            Assistant Builder
                        </h2>

                        <p className="text-gray-500 mt-1  ">
                            Create your virtual assistant
                        </p>
                    </div>

                    <div className="space-y-6  ">

                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6   ">
                            <h2 className="text-lg font-semibold mb-5 ">
                                Basic Information

                            </h2>

                            <div className="space-y-4">
                                <input type="text"
                                    onChange={(e) => setAssistantName(e.target.value)}
                                    value={assistantName}
                                    placeholder="Assistant Name "
                                    className="w-full border border-gray-200 rounded-2xl  px-4 py-3 " />
                                <input type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Business Name  "
                                    className="w-full border border-gray-200 rounded-2xl  px-4 py-3 " />
                                <input type="text"
                                    value={businesstype}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                    placeholder="Business Type  "
                                    className="w-full border border-gray-200 rounded-2xl  px-4 py-3 " />
                                <textarea type="text"
                                    rows={4}
                                    value={businessDescription}
                                    onChange={(e) => setBusinessDescription(e.target.value)}
                                    placeholder="Business Description  "
                                    className="w-full  border border-gray-200 rounded-2xl  px-4 py-3  resize-none " />
                            </div>
                        </div>
                        <div className=" bg-white rounded-3xl  border border-gray-100 shadow-sm p-6  ">
                            <h2 className="text-lg font-semibold  mb-5  ">
                                Apperance
                            </h2>

                            <div className="">
                                <label className="text-sm text-gray-600  mb-3  block " >
                                    Theme  </label>

                                <div className="grid grid-cols-2  sm:grid-cols-4  gap-3  ">
                                    {THEMES.map((item) => (
                                        <button
                                            key={item}
                                            onClick={(e) => setTheme(item)}
                                            className={` py-3 rounded-2xl  cursor-pointer border-2 capitalize 
                                          ${theme === item ? "border-purple-500 bg-purple-50 text-purple-700 " : " border-gray-200 "}
                                        `}
                                        >   {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-sm text-gray-600  mb-3  block " >
                                    Assistant Tone   </label>

                                <div className="grid grid-cols-2  sm:grid-cols-3  gap-3  ">
                                    {TONES.map((item) => (
                                        <button
                                            key={item}
                                            onClick={(e) => settone(item)}
                                            className={` py-3 rounded-2xl  cursor-pointer border-2 capitalize 
                                          ${tone === item ? "border-purple-500 bg-purple-50 text-purple-700 " : " border-gray-200 "}
                                        `}
                                        >   {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white  rounded-3xl border border-gray-100 shadow-sm p-6  ">
                            <div className="flex items-center justify-between mb-5 gap-4 flex-wrpa
                              ">
                                <div className="">
                                    <h2 className="text-lg font-semibold ">GEMINI   API KEY</h2>
                                    <p className="text-sm text-gray-400 mt-1  "> Add your gemini API Key to power your assistant  </p>
                                </div>
                                <a href="https://aistudio.google.com/app/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer "
                                    className=" px-4  py-2 rounded-xl bg-linear-to-r from-purple-500 to-emerald-500  text-white text-sm font-medium  hover:scale-[1.02] transition-all cursor-pointer ">Get API KEY
                                </a>

                            </div>
                            <input type="password"
                                placeholder="Aizaa...."
                                className="w-full border  border-gray-200 rounded-2xl px-4 py-3"
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                            />
                            <p className=" text-xs  text-gray-400 mt-3 leading-6 ">
                                Your API key is securely stored and only used for generating AI response.
                            </p>
                        </div>

                        <div className=" bg-white rounded-3xl border border-gray-100 shadow-sm  p-6">
                            <div className="flex items-center justify-between mb-5 flex-wrap ">
                                <div className="">
                                    <h2 className="text-lg font-semibold">
                                        Navigation Pages
                                    </h2>
                                    <p className="text-sm text-gray-400 ">
                                        Assistant can redirect users
                                    </p>
                                </div>
                                <button
                                    onClick={addPage}
                                    className=" flex items-center gap-2 px-4 py-2 rounded-xl  bg-linear-to-r from-purple-500 to-emerald-500 text-white text-sm   ">
                                    <FiPlus /> Add

                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3  ">
                                <input type="text" className="border border-gray-200  rounded-2xl px-4 py-3  " placeholder="Page Name "
                                    onChange={(e) => setPageName(e.target.value)}
                                    value={[pageName]}
                                />

                                <input type="text" className="border border-gray-200  rounded-2xl px-4 py-3  " placeholder="/pricing"
                                    onChange={(e) => setPagePath(e.target.value)}
                                    value={[pagePath]}
                                />

                                <input type="text" className="border border-gray-200  rounded-2xl px-4 py-3  " placeholder="Pricing , Plan"
                                    onChange={(e) => setPageKeywords(e.target.value)}
                                    value={[pageKeywords]}
                                />

                            </div>
                            <div className="">
                                {pages.map((page, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border  border-gray-100 rounded-2xl p-4    ">
                                        <div className="">
                                            <p className="font-medium "> {page.Name} </p>
                                            <p className="text-sm text-gray-400 "> {page.Path} </p>
                                            <p className=" text-sm text-gray-400  " > {page.keywords} </p>
                                        </div>
                                        <button
                                            className="text-red-500  ">
                                            <FiTrash className="" size={12} />

                                        </button>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Builder;
