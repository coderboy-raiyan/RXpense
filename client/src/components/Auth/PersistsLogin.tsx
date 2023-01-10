/* eslint-disable no-unused-expressions */
import useAuth from "hooks/useAuth";
import useRefresh from "hooks/useRefresh";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function PersistsLogin() {
    const [loading, setLoading] = useState(true);
    const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        async function verifyRefreshToken() {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    }, []);

    return <>{loading ? "Loading..." : <Outlet />}</>;
}

export default PersistsLogin;
