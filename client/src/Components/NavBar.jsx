import { NavLink, useNavigate } from "react-router-dom";
import {
    HiOutlineArrowRightOnRectangle,
    HiOutlineBars3,
    HiOutlineUserCircle,
    HiOutlineXMark,
} from "react-icons/hi2";
import axios from "axios";
import logo from "../../public/logo.png";
import { ServerUrl } from "../App";
import toast from "react-hot-toast";
import { useState } from "react";

function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = async () => {

        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true });
            setUser(null);
            setMenuOpen(false);
            toast.success("Logout successful");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed")
        }
    };

    return (
        <div className="border-b border-black/5 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <NavLink
                    to="/"
                    className="flex shrink-0 items-center gap-3"
                    onClick={() => setMenuOpen(false)}
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 shadow-[0_10px_30px_rgba(139,92,246,0.2)]">
                        <img src={logo} alt="Talko" className="h-9 w-9 rounded-xl object-cover" />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-[#081028]">Talko</span>
                </NavLink>

                <button
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#475569] transition hover:bg-purple-50 hover:text-purple-700 sm:hidden"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen
                        ? <HiOutlineXMark className="h-6 w-6 cursor-pointer "  />
                        : <HiOutlineBars3 className="h-6 w-6 cursor-pointer "  />}
                </button>

                <div className="ml-auto hidden items-center gap-2 sm:flex sm:gap-4">
                    <nav className="flex items-center gap-2" >
                        <NavLink
                            to="/builder"
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-2 text-sm  font-semibold cursor-pointer transition  ${isActive
                                    ? "bg-gradient-to-r   from-purple-500 to-emerald-500 text-white "
                                    : "text-[#475569] bg-gradient-to-r    from-purple-200 to-emerald-300 hover:bg-purple-50 hover:text-purple-700"
                                }`
                            }
                        >
                            Builder
                        </NavLink>
                        <NavLink
                            to="/billing"
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-2 text-sm font-semibold cursor-pointer transition ${isActive
                                    ? "bg-purple-100 text-purple-700"
                                    : "text-[#475569] hover:bg-purple-50 hover:text-purple-700"
                                }`
                            }
                        >
                            Billing
                        </NavLink>
                    </nav>

                    <div className="flex min-w-0 items-center gap-3">
                        <HiOutlineUserCircle className="h-10 w-10 shrink-0 text-purple-500"  />
                        <div className="hidden min-w-0 sm:block">
                            <p className="max-w-40 truncate text-sm font-semibold text-[#081028]">
                                {user?.name || "User"}
                            </p>
                            {user?.email && (
                                <p className="max-w-48 truncate text-xs text-[#64748b]">{user.email}</p>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-purple-100 px-3 py-2 text-sm font-semibold text-[#475569] transition hover:border-purple-200 hover:bg-purple-50 cursor-pointer hover:text-red-700"
                        >
                            <HiOutlineArrowRightOnRectangle className="h-5 w-5 cursor-pointer "  />
                        </button>
                    </div>
                </div>

                <div
                    id="mobile-navigation"
                    className={`${menuOpen ? "block" : "hidden"} basis-full sm:hidden`}
                >
                    <nav className="flex flex-col gap-1 border-t border-black/5 pt-3" aria-label="Main navigation">
                        <NavLink
                            to="/builder"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-sm font-semibold  cursor-pointer transition ${isActive
                                    ? "bg-purple-100 text-purple-700"
                                    : "text-[#475569] hover:bg-purple-50 hover:text-purple-700"
                                }`
                            }
                        >
                            Builder
                        </NavLink>
                        <NavLink
                            to="/billing"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer transition ${isActive
                                    ? "bg-purple-100 text-purple-700"
                                    : "text-[#475569] hover:bg-purple-50 hover:text-purple-700"
                                }`
                            }
                        >
                            Billing
                        </NavLink>
                    </nav>
                    <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-4">
                        <HiOutlineUserCircle className="h-10 w-10 shrink-0 text-purple-500"  />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#081028]">
                                {user?.name || "User"}
                            </p>
                            {user?.email && (
                                <p className="truncate text-xs text-[#64748b]">{user.email}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            aria-label="Log out"
                            onClick={handleLogout}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-purple-100 px-3 py-2 text-sm font-semibold text-[#475569] transition hover:border-purple-200 hover:bg-purple-50 cursor-pointer hover:text-red-700"
                        >
                            <HiOutlineArrowRightOnRectangle className="h-5 w-5 cursor-pointer "  />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
