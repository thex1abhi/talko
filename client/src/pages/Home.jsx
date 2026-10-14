import React from "react";
import { useNavigate } from "react-router-dom"
import AssistantPreview from "../Components/AssistantPreview";
import logo from "../assets/talko.png"

const steps = [
    {
        step: "01",
        title: "Sign up free",
        desc: "Continue with Google and create your assistant instantly."
    },
    {
        step: "02",
        title: "Customize your assistant",
        desc: "Set your business name, tone, voice, and theme."
    },
    {
        step: "03",
        title: "Train your assistant",
        desc: "Add business details and personalize its responses."
    },
    {
        step: "04",
        title: "Embed anywhere",
        desc: "Copy one script tag and add it to your website."
    }
]


function Home({ user }) {

    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-[#f8fafc]">

            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 sm:pt-12 lg:pt-12 pb-14 ">

                <div className=" absolute inset-0 bg-linear-to-br from-purple-50 via-white to-emerald-50 " />
                <div className=" absolute  top-0 left-1/4  w-[320px] h-[320px] bg-emerald-200/40 
                 blur-3xl  rounded-full  " />

                <div className=" relative max-w-3xl mx-auto  ">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center  gap-2 bg-white  border  border-purple-100 shadow-sm  font-semibold px-4 py-2 rounded-full    ">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                            Voice AI for modern Websites

                        </span>
                    </div>
                    <div className="text-center mt-2 sm:mt-4 ">
                        <h1 className="max-w-5xl mx-auto text-[42px] leading-[52px] sm:text-5xl  sm:leading-[72px]  lg:text-6xl lg:leading-[88px]   font-black  tracking-[-0.04em] text-[#081028]  ">
                            Add a {" "}

                            <span className="inline-block px-2  ">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-500  ">
                                    Virtual Assistant
                                </span>
                            </span>

                            <br className="hidden sm:block " />
                            to your website

                        </h1>
                        <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl  text-[#64748b] leading-relaxed px-2    "> Create a smart voice-enables assistant that talks to visitors, answers questions and helps users navigate your website instantly</p>


                        <div className="flex flex-col sm:flex-row   items-center justify-center gap-4 mt-10 ">
                            <button
                                onClick={() => navigate("/builder")}
                                className="w-full sm:w-auto  px-8 py-4 rounded-2xl  bg-gradient-to-r   from-purple-500 to-emerald-500  text-white  font-semibold  text-sm sm:text-base  shadow-[0_12px_40px_rgba(168,85,247,0.25)] hover:scale-[1.02]  transition-all cursor-pointer   ">
                                Build your Assistant
                            </button>
                            
                        </div>

                        <p className="mt-5 text-xs sm:text-sm text-gray-400 ">
                            Free plan includes 200 AI response
                        </p>
                    </div>
                    <AssistantPreview />
                </div>
            </section>


            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white    ">
                <div className="max-w-6xl mx-auto  ">
                    <div className="  text-center mb-14   ">

                        <h2 className="text-3xl sm:text-4xl  font-bold text-[#081028]    ">
                            Get started in 10 minutes
                        </h2>
                        <p className=" text-gray-500 mt-3 text-sm  sm:text-base   ">
                            Simple setup, no complicated integration.
                        </p>
                    </div>
                    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map(({ step, title, desc }) => (
                            <li
                                key={step}
                                className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <span
                                    aria-label={`Step ${Number(step)}`}
                                    className="inline-block text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-500"
                                >
                                    {step}
                                </span>
                                <h3 className="mt-5 text-lg font-bold text-[#081028]">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                                    {desc}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <footer className="mt-auto border-t border-slate-200 text-white bg-[#081028] px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                    <div className="flex flex-col items-center gap-1 sm:items-start">
                        <div className="flex items-center gap-2">
                            <img src={logo} className="h-10 w-10" alt="Talko" />
                            <p className="text-lg font-extrabold tracking-tight text-white">Talko</p>
                        </div>
                        <p className="text-sm text-slate-500">Voice AI for modern websites.</p>
                    </div>

                    <p className="text-sm text-slate-600">
                        © {new Date().getFullYear()} Talko. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home;
