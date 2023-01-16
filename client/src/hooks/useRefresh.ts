import httpAuthService from "services/http.authServices";
import useAuth from "./useAuth";

function useRefresh() {
    const { setAuth, auth } = useAuth();

    async function refresh() {
        try {
            const response = await httpAuthService.refresh();
            setAuth(response);
            return response?.accessToken;
        } catch (error) {
            if (auth?.email) {
                await httpAuthService.logout();
                setAuth({});
            }
        }
    }

    return refresh;
}

export default useRefresh;
