/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import httpAuthService from "services/http.authServices";

const url = [
    {
        name: "Resource",
        path: "/",
    },
    {
        name: "Pricing",
        path: "/",
    },
];

function Header() {
    const { auth, setAuth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    async function logout() {
        try {
            const response = await httpAuthService.logout();
            if (response.success) {
                setAuth({});
            }
        } catch (error) {
            setAuth({});
            console.log(error);
        }
    }

    return (
        <header className="border-general sticky top-0 z-[100] border-b">
            <nav className=" mx-4  lg:mx-0 lg:bg-slate-50/60 lg:backdrop-blur-2xl lg:transition-colors lg:duration-500">
                <div className="container lg:mx-auto lg:max-w-6xl">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* left side */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-lg font-bold text-gray-600">
                                RXpense.
                            </Link>
                        </div>
                        {/* hamburger menu for mobile */}
                        <div
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="z-40 flex cursor-pointer flex-col space-y-2 lg:hidden"
                        >
                            <div
                                className={`${
                                    menuOpen && "translate-y-2 rotate-45 transform "
                                }  h-[2px] w-8 rounded-lg ${
                                    menuOpen ? "bg-[#FD71AF]" : "bg-[#7b68ee]"
                                } transition-all`}
                            />
                            <div
                                className={`${
                                    menuOpen && "hidden"
                                } h-[2px] w-8 rounded bg-[#7b68ee]  transition-all`}
                            />
                            <div
                                className={`${
                                    menuOpen && "-translate-y-[2px] -rotate-45"
                                } h-[2px] w-8 rounded ${
                                    menuOpen ? "bg-[#FD71AF]" : "bg-[#7b68ee]"
                                } transition-all`}
                            />
                        </div>

                        {/* right side */}
                        <ul className="hidden items-center  space-x-6 text-sm lg:flex">
                            {url.map(({ name, path }, i: number) => (
                                <li key={i}>
                                    <Link to={path}>{name}</Link>
                                </li>
                            ))}
                            {!auth.email && (
                                <>
                                    <li className="rounded-xl bg-indigo-500 py-2 px-4 text-white">
                                        <Link to="/login">Sign In</Link>
                                    </li>
                                    <li className="rounded-xl bg-gray-800 py-2 px-4 text-white">
                                        <Link to="/register">Sign Up</Link>
                                    </li>
                                </>
                            )}

                            {auth.email && (
                                <>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="font-bold">Welcome, {auth?.name}</li>
                                    <li>
                                        <button
                                            className="rounded-xl bg-gray-700 py-2 px-4 text-white"
                                            onClick={logout}
                                            type="button"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <ul
                        className={`
                               fixed
                                 shadow-2xl transition-all lg:hidden ${
                                     menuOpen ? "right-0" : "-right-full"
                                 } top-0 z-20 flex h-full w-full  flex-col items-center  justify-center space-y-16 bg-white px-4   text-2xl font-semibold  md:w-[450px] md:text-4xl`}
                    >
                        {url.map(({ name, path }, i: number) => (
                            <li key={i}>
                                <Link to={path}>{name}</Link>
                            </li>
                        ))}
                        {!auth.email && (
                            <>
                                <li className="rounded-xl bg-indigo-500 py-2 px-4 text-white">
                                    <Link to="/login">Sign In</Link>
                                </li>
                                <li className="rounded-xl bg-gray-800 py-2 px-4 text-white">
                                    <Link to="/register">Sign Up</Link>
                                </li>
                            </>
                        )}

                        {auth.email && (
                            <>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="font-bold">Welcome, {auth?.name}</li>
                                <li>
                                    <button
                                        className="rounded-xl bg-gray-700 py-2 px-4 text-white"
                                        onClick={logout}
                                        type="button"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
