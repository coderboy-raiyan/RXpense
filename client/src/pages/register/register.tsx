import Header from "components/Header/Header";
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

function Register() {
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <>
            <Header />
            <section>
                <div className="my-20 flex items-center justify-center">
                    <form className="flex w-2/6 flex-col space-y-4 rounded-xl border bg-white p-6 shadow">
                        <h4 className="text-center text-xl font-semibold text-indigo-500">
                            Sign up
                        </h4>
                        <label className="flex flex-col space-y-2" htmlFor="name">
                            <span className="text-xs">Name</span>
                            <input
                                id="name"
                                className="rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                name="name"
                                type="text"
                                autoComplete="off"
                            />
                        </label>
                        <label className="flex flex-col space-y-2" htmlFor="email">
                            <span className="text-xs">Email</span>
                            <input
                                id="email"
                                name="email"
                                className="rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                type="email"
                                autoComplete="off"
                            />
                        </label>
                        <label className="relative flex flex-col space-y-2" htmlFor="password">
                            <span className="text-xs">Password</span>
                            <input
                                className="w-full rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                id="password"
                                name="password"
                                type={`${togglePassword ? "text" : "password"}`}
                                autoComplete="off"
                            />
                            {togglePassword ? (
                                <button
                                    onClick={() => setTogglePassword(!togglePassword)}
                                    type="button"
                                    className="absolute right-2 h-full text-2xl"
                                >
                                    <BsEyeSlash />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setTogglePassword(!togglePassword)}
                                    type="button"
                                    className="absolute  right-2 h-full text-2xl"
                                >
                                    <BsEyeFill />
                                </button>
                            )}
                        </label>

                        <p className="text-center text-xs">
                            Already have an account ?{" "}
                            <Link className="text-indigo-600" to="/login">
                                Login
                            </Link>
                        </p>

                        <button
                            className="rounded-lg bg-gray-800 py-3 text-sm text-white"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;
