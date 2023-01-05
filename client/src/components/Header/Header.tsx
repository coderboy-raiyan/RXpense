import images from "assets/index";
import { Link } from "react-router-dom";

const url = [
    {
        name: "Sign in",
        path: "/login",
    },
    {
        name: "Sign up",
        path: "/register",
    },
];

function Header() {
    return (
        <header className="shadow">
            <nav className="mx-4 flex justify-between py-4 lg:mx-auto lg:max-w-6xl">
                {/* left side */}
                <div>
                    <Link to="/">
                        <img src={images.tempLogo} alt="" />
                    </Link>
                </div>

                {/* right side */}
                <ul className="flex space-x-4">
                    {url.map(({ name, path }) => (
                        <li key={path}>
                            <Link to={path}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
