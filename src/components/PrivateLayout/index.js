import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function PrivateLayout() {
    const { token, loading } = useContext(AuthContext);

    if (loading) {
        return <h1>Carregando....</h1>;
    }

    if (!token) {
        return <Navigate to="/" />;
    }
    return <Header />;
}

export default PrivateLayout;
