import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineArrowRightOnRectangle, HiOutlineUserCircle } from "react-icons/hi2";
import axios from "axios";
import logo from "../assets/talko.png";
import { ServerUrl } from "../App";
import toast from "react-hot-toast";

function NavBar({ user, setUser }) {
    const navigate = useNavigate(); 
    

    const handleLogout = async () => {

        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true });
            setUser(null);
            toast.success("Logout successfull")
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed")
        }
    };

    return (
        <div className="border-b border-black/5 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <NavLink to="/" className="flex shrink-0 items-center gap-3" >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 shadow-[0_10px_30px_rgba(139,92,246,0.2)]">
                        <img src={logo} alt="" className="h-9 w-9 rounded-xl object-cover" />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-[#081028]">Talko</span>
                </NavLink>

                <div className=" hidden sm:flex lg:flex ml-auto  items-center gap-2 sm:gap-4">
                    <nav className="flex items-center gap-2">
                        {[
                            { label: "Builder", to: "/builder" },
                            { label: "Billing", to: "/billing" },
                        ].map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive
                                        ? "bg-purple-100 text-purple-700"
                                        : "text-[#475569] hover:bg-purple-50 hover:text-purple-700"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex min-w-0 items-center gap-3">
                        <HiOutlineUserCircle className="h-10 w-10 shrink-0 text-purple-500" aria-hidden="true" />
                        <div className="hidden min-w-0 sm:block">
                            <p className="max-w-40 truncate text-sm font-semibold text-[#081028]">
                                {user?.name || "User"}
                            </p>
                            <p className="max-w-48 truncate text-xs text-[#64748b]">{user?.email}</p>
                        </div>
                        <button

                            onClick={handleLogout}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-purple-100 px-3 py-2 text-sm font-semibold text-[#475569] transition hover:border-purple-200 hover:bg-purple-50 hover:text-red-700 cursor-pointer "
                        >
                            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default NavBar;
