import React, { createContext, useState } from "react";

interface IAuthContext {
    setAuth: React.Dispatch<React.SetStateAction<{}>>;
    auth: any;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState({});
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
