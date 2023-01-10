import LoadingButton from "components/Button/LoadingButton";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import httpAuthService from "services/http.authServices";

export interface IRegistrationFromTypes {
    name: string;
    email: string;
    password: string;
}

function Register() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<IRegistrationFromTypes>({
        name: "",
        email: "",
        password: "",
    });

    function handelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handelRegistration(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await httpAuthService.signUp(userData);
            setAuth(response);
            if (response.success) {
                toast.success("Signed up Successfully");
                navigate(location?.state?.from);
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
            name: "",
            email: "",
            password: "",
        }));
    }

    return (
        <section>
            <div className="my-6 flex flex-row-reverse items-center justify-center">
                <div className="hidden lg:inline-flex">
                    <img
                        className="w-[500px] object-contain"
                        src="https://img.freepik.com/free-vector/upselling-abstract-concept-illustration_335657-3899.jpg?w=740&t=st=1673340562~exp=1673341162~hmac=eb6c6809416d1689bcd6f98eada1cbd6427cca45edac6bfb0b492dbb5766d3ef"
                        alt=""
                    />
                </div>
                <form
                    onSubmit={handelRegistration}
                    className="mx-4 flex w-full flex-col space-y-4 rounded-xl border bg-white p-6 shadow md:w-2/4 lg:w-2/6"
                >
                    <h4 className="flex flex-col space-y-2 text-center text-xl">
                        <span className="text-4xl font-bold text-gray-700">Sign Up</span>
                        <span className="text-sm text-gray-700">
                            Let's sign Up first enter into Bitrix24 website!
                        </span>
                    </h4>
                    <label className="flex flex-col space-y-2" htmlFor="name">
                        <span className="text-xs">Name</span>
                        <input
                            id="name"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            name="name"
                            value={userData?.name}
                            type="text"
                            onChange={handelInputChange}
                            autoComplete="off"
                        />
                    </label>
                    <label className="flex flex-col space-y-2" htmlFor="email">
                        <span className="text-xs">Email</span>
                        <input
                            id="email"
                            name="email"
                            className="rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            value={userData?.email}
                            type="email"
                            onChange={handelInputChange}
                            autoComplete="off"
                        />
                    </label>
                    <label className="relative flex flex-col space-y-2" htmlFor="password">
                        <span className="text-xs">Password</span>
                        <input
                            className="w-full rounded border-gray-300 py-3 text-sm focus:outline-none focus:ring-0"
                            required
                            id="password"
                            value={userData?.password}
                            onChange={handelInputChange}
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

export default Register;
