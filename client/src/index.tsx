import AuthProvider from "context/AuthProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
