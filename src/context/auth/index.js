import api from "services/api";
import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("token");
        const recovereduserName = localStorage.getItem("userNameData");

        if (recoveredUser) {
            setUser(recoveredUser);
            setUserName(recovereduserName);
        }

        setLoading(false);
    }, []);

    const login = (userInfo) => {
        // console.log("login auth", { emailLogin, passwordLogin })

        // if (passwordLogin === "Teste123#") {
        //     setUser(emailLogin);
        //     setUserName(emailLogin);

        //     const { token } = emailLogin;
        //     localStorage.setItem("token", emailLogin);

        //     navigate("/consultproject");
        // }

        console.log({ userInfo })

        const { token } = userInfo;
        const { id } = userInfo;

        localStorage.setItem("token", token);
        localStorage.setItem("id", id);

        navigate("/consultproject");
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("id");

        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/");
    };

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    return (
        <AuthContext.Provider value={(user, loading, { token, userId, login, logout, userName })}>
            {children}
        </AuthContext.Provider>
    );
}

export const getToken = () => localStorage.getItem("token");
