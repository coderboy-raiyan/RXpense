import LoadingButton from "components/Button/LoadingButton";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import httpAuthService from "services/http.authServices";

export interface ILoginFromTypes {
    email: string;
    password: string;
}

function Login() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [userData, setUserData] = useState<ILoginFromTypes>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from: string = location?.state?.from?.pathname || "/dashboard";

    useEffect(() => {
        if (auth?.email) {
            navigate("/");
        }
    }, []);

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
            if (response.success) {
                toast.success("Logged in Successfully");
                navigate(from, { replace: true });
            }
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
        <section>
            <div className="my-6 flex items-center justify-center">
                <div className="hidden lg:inline-flex">
                    <img
                        className="w-[500px] object-contain"
                        src="https://img.freepik.com/free-vector/upselling-abstract-concept-illustration_335657-3899.jpg?w=740&t=st=1673340562~exp=1673341162~hmac=eb6c6809416d1689bcd6f98eada1cbd6427cca45edac6bfb0b492dbb5766d3ef"
                        alt=""
                    />
                </div>
                <form
                    onSubmit={handelLogin}
                    className="mx-4 flex w-full flex-col space-y-4 rounded-xl border bg-white p-6 shadow md:w-2/4 lg:w-2/6"
                >
                    <h4 className="flex flex-col space-y-2 text-center text-xl">
                        <span className="text-4xl font-bold text-gray-700">Sign In</span>
                        <span className="text-sm text-gray-700">Log in to stay update</span>
                    </h4>
                    <label className="flex flex-col space-y-2" htmlFor="email">
                        <span className="text-xs">Email</span>
                        <input
                            name="email"
                            onChange={handelInputChange}
                            id="email"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            type="email"
                            value={userData?.email}
                            autoComplete="off"
                        />
                    </label>
                    <label className="relative flex flex-col space-y-2" htmlFor="password">
                        <span className="text-xs">Password</span>
                        <input
                            className="w-full rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
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

                    <div className="flex flex-col items-center justify-center text-xs md:flex-row md:justify-between lg:flex-row lg:justify-between">
                        <p className="mb-2 lg:mb-0">
                            Don't have an account ?
                            <Link state={{ from }} className="text-indigo-600" to="/register">
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
    );
}

export default Login;
