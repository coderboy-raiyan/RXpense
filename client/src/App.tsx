import PersistsLogin from "components/Auth/PersistsLogin";
import Layout from "components/Layout/Layout";
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
