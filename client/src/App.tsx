import PersistsLogin from "components/Auth/PersistsLogin";
import RequireAuth from "components/Auth/RequireAuth";
import Layout from "components/Layout/Layout";
import Dashboard from "pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
    const { auth } = useAuth();
    console.log(auth);

    return (
        <Routes>
            <Route element={<PersistsLogin />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
