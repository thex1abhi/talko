import React from "react";
import { HiOutlineMicrophone, HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

function Login() {


    const features = [
        {
            icon: <HiOutlineMicrophone />,
            title: "Voice AI",
            desc: "Natural real-time voice conversation"
        },
        {
            icon: <HiOutlineSparkles />,
            title: "Smart Navigation",
            desc: "Navigate pages using voice command "
        },
        {
            icon: <HiOutlineCodeBracket />,
            title: "Easy Embed",
            desc: "Add assitant using one script tag "
        },
        {
            icon: <HiOutlineBolt />,
            title: "Fast response ",
            desc: "Optimized Gemini AI response  "
        },

    ]


    return (
        <div className="min-h-screen  bg-linear-to-br  from-purple-50 via-white to-emerald-50 overflow-hidden ">
            <div className="max-w-7xl  mx-auto px-6 py-16 lg:py-24 ">
                <div className="grid lg:grid-cols-2  gap-16 items-center">

                    <div className="">

                        {/* left  */}
                        <div className="inline-flex  items-center gap-2 px-2 py-2 rounded-full  border  border-purple-200  bg-purple-100  text-purple-600 text-sm font-medium ">
                            <HiOutlineSparkles />

                            AI voice Assistant platform

                        </div>
                        <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight
                     text-[#081028]   ">
                            Build AI Assistants
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500   ">For any website </span>
                        </h1>

                        <p className="mt-8 text-lg text-[#475569] leading-8 max-w-2xl  ">
                            Create customizable AI voice assistants that talk , guide users , and integrate  into any website instantly.

                        </p>
                        <button className="mt-10 h-15 px-8 rounded-2xl  bg-gradient-to-r from-purple-500 to-emerald-500  text-white text-lg font-semibold flex items-center gap-4 shadow_[0_20px_80px_rgba(139,92,246,0.25)] hover:scale-[1.02] transition cursor-pointer  ">
                            <FcGoogle />
                            Continue with Google
                        </button>

                        <p className="mt-4 text-sm text-[#64748b]  ">
                            Free plan includes 200 AI response
                        </p>

                    </div>

                    {/* right  */}
                    <div className="relative ">
                        <div className="absolute inset-0  bg-gradient-to-r from-purple-200/50  to-emerald-200/40   blur-[120px] ">
                            <div className="relative rounded-[40px]  border border-black/5  bg-white  shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-8 overflow-hidden  ">
                                <div className="flex items-center  justify-between">
                                    <div className="">
                                        <h2 className="mt-2 text-3xl font-bold text-[#081028] ">Features </h2>
                                    </div>
                                    <div className="q-16 h-16 rounded-3xl bg-gradient-to-r  from-purple-500 to-emerald-500  flex items-center  justify-center shadow-[0_10px_40px_rgba(139,92,246,0.25)] ">
                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
