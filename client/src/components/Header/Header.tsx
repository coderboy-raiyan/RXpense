import images from "assets/index";
import { Link } from "react-router-dom";

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
    return (
        <header className=" border-b bg-slate-50/60 ">
            <nav className="sticky  top-0 z-40 mx-4 flex items-center justify-between py-4 backdrop-blur-2xl transition-colors duration-500 lg:mx-auto lg:max-w-6xl">
                {/* left side */}
                <div>
                    <Link to="/">
                        <img className="w-[100px] object-contain" src={images.tempLogo} alt="" />
                    </Link>
                </div>

                {/* right side */}
                <ul className="flex items-center space-x-4 text-sm">
                    {url.map(({ name, path }, i: number) => (
                        <li key={i}>
                            <Link to={path}>{name}</Link>
                        </li>
                    ))}
                    <li className="rounded-xl bg-indigo-500 py-2 px-4 text-white">
                        <Link to="/login">Sign In</Link>
                    </li>
                    <li className="rounded-xl bg-gray-800 py-2 px-4 text-white">
                        <Link to="/register">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
