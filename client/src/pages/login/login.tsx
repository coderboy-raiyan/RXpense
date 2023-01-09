import LoadingButton from "components/Button/LoadingButton";
import Header from "components/Header/Header";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import httpAuthService from "services/http.authServices";

export interface ILoginFromTypes {
    email: string;
    password: string;
}

function Login() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [userData, setUserData] = useState<ILoginFromTypes>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { setAuth } = useAuth();

    function handelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handelLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await httpAuthService.login(userData);
            setAuth(response);
            console.log(response);
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message;
            if (!error?.response) {
                toast.error("No server response!!!");
            }
            if (errorMsg) {
                toast.error(`${errorMsg}!!!`);
            } else {
                toast.error("Internal server error");
            }
        } finally {
            setLoading(false);
        }
        setUserData(() => ({
            email: "",
            password: "",
        }));
    }

    return (
        <>
            <Header />
            <section>
                <div className="mt-20 flex items-center justify-center">
                    <form
                        onSubmit={handelLogin}
                        className="mx-4 flex w-full flex-col space-y-4 rounded-xl border bg-white p-6 shadow md:w-2/4 lg:w-2/6"
                    >
                        <h4 className="text-center text-xl font-semibold text-indigo-500">Login</h4>
                        <label className="flex flex-col space-y-2" htmlFor="email">
                            <span className="text-xs">Email</span>
                            <input
                                name="email"
                                onChange={handelInputChange}
                                id="email"
                                className="rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                type="email"
                                value={userData?.email}
                                autoComplete="off"
                            />
                        </label>
                        <label className="relative flex flex-col space-y-2" htmlFor="password">
                            <span className="text-xs">Password</span>
                            <input
                                className="w-full rounded border-gray-400 py-3 text-sm focus:outline-none focus:ring-0"
                                required
                                name="password"
                                onChange={handelInputChange}
                                id="password"
                                value={userData?.password}
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

                        <div className="flex justify-between text-xs">
                            <p>
                                Don't have an account ?{" "}
                                <Link className="text-indigo-600" to="/register">
                                    Sign up
                                </Link>
                            </p>
                            <p className="text-indigo-600">Forget password?</p>
                        </div>
                        {loading ? (
                            <LoadingButton
                                text="Please wait..."
                                styles="bg-gray-800 justify-center text-white py-3 text-sm rounded-lg"
                            />
                        ) : (
                            <button
                                className="rounded-lg bg-gray-800 py-3 text-sm text-white"
                                type="submit"
                                disabled={loading}
                            >
                                Sign In
                            </button>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;
