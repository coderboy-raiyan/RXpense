/* eslint-disable no-unused-expressions */
import LoadingButton from "components/Button/LoadingButton";
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

    return (
        <>
            {loading ? (
                <LoadingButton
                    svg="w-16 h-screen flex justify-center items-center text-indigo-500"
                    styles="mx-auto"
                />
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default PersistsLogin;
