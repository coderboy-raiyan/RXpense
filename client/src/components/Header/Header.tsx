import useAuth from "hooks/useAuth";
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
        <header className="sticky top-0 z-[100]">
            <nav className="border-general  border-b bg-slate-50/60 backdrop-blur-2xl transition-colors duration-500">
                <div className="container lg:mx-auto lg:max-w-6xl">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* left side */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-lg font-bold text-gray-600">
                                RXpense.
                            </Link>
                        </div>

                        {/* right side */}
                        <ul className="flex items-center space-x-6 text-sm">
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
                </div>
            </nav>
        </header>
    );
}

export default Header;
