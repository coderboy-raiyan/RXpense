import Header from "components/Header/Header";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default Layout;
