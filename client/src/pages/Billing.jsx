
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

function Billing({ user }) {

  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Setup your assistant first");

      navigate("/builder")
    }

  }, []);



  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) -
    (user?.totalMessages || 0)
  )

  const RemainingDays = user?.proExpiresAt ? Math.max(
    0,
    Math.ceil(
      (
        new Date(user.proExpiresAt) - new Date()
      ) / (1000 * 60 * 60 * 24)
    )
  )
    : 0;
  return (
    <>
      <div className="min-h-screen bg-white  px-4 py-8   ">
        <div className="max-w-4xl mx-auto ">
          <div className="">
            <h2 className="text-3xl font-bold  text-[#081028]  ">
              Billing & Subscription
            </h2>

            <p className="text-gray-500 mt-1  ">
              Manage your AI assistant plan and usage
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6  ">

            <div className="rounded-2xl border border-gray-100  bg-[#f8fafc] p-4  ">
              <p className="text-sm text-gray-400  "> Current Plan </p>
              <h2 className="text-xl font-bold  text-black/90 mt-1 capitalize "> {user?.plan}</h2>
            </div>

            <div className="rounded-2xl border border-gray-100  bg-[#f8fafc] p-4  ">
              <p className="text-sm text-gray-400  "> Gemini Status  </p>
              <h2 className={`text-xl font-bold  text-black/10 mt-1 capitalize ${user?.geminiStatus === "active" ? "text-emerald-600" : user?.geminiStatus === "invalid" ?
                "text-red-400" : " text-amber-500 "
                } `}>
                {user?.geminiStatus}</h2>
            </div>

            <div className="rounded-2xl border border-gray-100  bg-[#f8fafc] p-4  ">
              <p className="text-sm text-gray-400  ">
                {user?.plan === "free" ? "Message Left " : "Plan Expiry "
                } </p>
              <h2 className="text-xl font-bold  text-black/90 mt-1 capitalize ">
                {user?.plan === "free" ? `${remainingMessages}` :
                  `${RemainingDays}`
                }
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl border border-gray-200 bg-gray-100 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Free plan</p>
                <h3 className="mt-2 text-2xl font-bold text-[#081028]">Free</h3>
                <p className="mt-2 text-sm text-gray-500">A simple way to get started with your AI assistant.</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li>Up to {user?.requestLimit ?? 200} assistant messages</li>
                <li>Set up and customize your assistant</li>
                <li>Voice and page navigation features</li>
              </ul>
            </div>

            <div className="flex flex-col rounded-2xl border bg-gradient-to-r   from-purple-200 to-emerald-100   p-6 shadow-sm">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-900">Pro plan</p>
                <h3 className="mt-2 text-2xl font-bold text-[#081028]">Pro</h3>
                <p className="mt-2 text-sm text-gray-500">More  to grow with your AI assistant.</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li>Unlimited assistant messages</li>
                <li>Everything included in the Free plan</li>
                <li>Pro access for the duration of your subscription</li>
              </ul>
              <button
                disabled={user?.plan === "pro"}
                className={` mt-3  h-14 w-full rounded-2xl font-semibold transition 
                  ${user?.plan === "pro" ? " bg-emerald-200 text-black cursor-default " :
                    "  bg-gradient-to-r from-purple-500 to-emerald-500  text-white cursor-pointer "}
                  `}
              >
                {user?.plan === "pro" ? "Active Plan" : "Upgrade Now "}
              </button>

            </div>
          </div>

        </div>

      </div >

    </>
  )
}

export default Billing;
