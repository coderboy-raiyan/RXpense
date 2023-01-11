import React, { createContext, useState } from "react";

export interface IAuthContextState {
    accessToken: string;
    email: string;
    name: string;
    password: null;
    success: boolean;
    __v: number;
    _id: string;
}

export interface IAuthContext {
    setAuth: React.Dispatch<React.SetStateAction<{}>>;
    auth: any;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState({});

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
