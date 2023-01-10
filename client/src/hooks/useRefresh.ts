import httpAuthService from "services/http.authServices";
import useAuth from "./useAuth";

function useRefresh() {
    const { setAuth } = useAuth();

    async function refresh() {
        try {
            const response = await httpAuthService.refresh();
            setAuth(response);
            return response?.accessToken;
        } catch (error) {
            await httpAuthService.logout();
        }
    }

    return refresh;
}

export default useRefresh;
