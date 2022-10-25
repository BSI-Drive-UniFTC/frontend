import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Private({ children }) {
	return children;
}

export default Private;
