import Header from "components/Header/Header";
import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";

function Login() {
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <>
            <Header />
            <section>
                <div className="mt-20 flex items-center justify-center">
                    <form className="flex w-2/6 flex-col space-y-6 rounded-xl border bg-white p-6 shadow">
                        <h4 className="text-center text-xl font-semibold text-indigo-500">Login</h4>
                        <input
                            className="rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            type="email"
                            autoComplete="off"
                            placeholder="Email"
                        />
                        <label className="relative" htmlFor="password">
                            <input
                                className="w-full rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                id="password"
                                type={`${togglePassword ? "text" : "password"}`}
                                autoComplete="off"
                                placeholder="Password"
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
                        <button
                            className="rounded-lg bg-gray-800 py-3 text-sm text-white"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;
