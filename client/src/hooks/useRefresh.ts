import { useLocation, useNavigate } from "react-router-dom";
import httpAuthService from "services/http.authServices";
import useAuth from "./useAuth";

function useRefresh() {
    const { setAuth, auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    async function refresh() {
        try {
            const response = await httpAuthService.refresh();
            setAuth(response);
            return response?.accessToken;
        } catch (error) {
            if (auth?.email) {
                await httpAuthService.logout();
                setAuth({});
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    }

    return refresh;
}

export default useRefresh;
