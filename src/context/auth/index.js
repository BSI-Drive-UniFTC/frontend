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

    const login = ({ emailLogin, passwordLogin }) => {
        console.log("login auth", { emailLogin, passwordLogin })

        if (passwordLogin === "Teste123#") {
            setUser(emailLogin);
            setUserName(emailLogin);

            const { token } = emailLogin;
            localStorage.setItem("token", emailLogin);

            navigate("/consultproject");
        }

        // const loggedUser = userInfo.emailLogin;
        // const userNameData = userInfo.Nome;
        // const { token } = userInfo;

        // localStorage.setItem("user", loggedUser);
        // localStorage.setItem("userNameData", userNameData);
        // localStorage.setItem("token", token);

        // setUser(loggedUser);
        // setUserName(userNameData);
        // navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userNameData");
        localStorage.removeItem("token");

        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/");
    };

    const token = localStorage.getItem("token");

    return (
        <AuthContext.Provider value={(user, loading, { token, login, logout, userName })}>
            {children}
        </AuthContext.Provider>
    );
}

export const getToken = () => localStorage.getItem("token");
