import useAuth from "hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const location = useLocation();
    const { auth } = useAuth();

    return (
        <>
            {auth?.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
        </>
    );
}

export default RequireAuth;
