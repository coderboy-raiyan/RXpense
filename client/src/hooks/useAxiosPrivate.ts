import { useEffect } from "react";
import httpTransectionService from "services/http.transection";
import { PrivateInstance } from "services/httpPrivateServices";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";

function useAxiosPrivate() {
    const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        const requestInterceptors = PrivateInstance.interceptors.request.use(
            (config: any) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptors = PrivateInstance.interceptors.response.use(
            (response) => response,
            async (error: any) => {
                const prevRequest = error?.config;
                if (error?.response.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return PrivateInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            PrivateInstance.interceptors.response.eject(responseInterceptors);
            PrivateInstance.interceptors.request.eject(requestInterceptors);
        };
    }, [refresh, auth]);

    return { httpTransectionService };
}

export default useAxiosPrivate;
