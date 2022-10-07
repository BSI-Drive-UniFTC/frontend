import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { AuthContext } from "context/auth";
import { useContext } from "react";

function Header() {
	const { logout } = useContext(AuthContext);

	return (
		<header className="flex flex-row items-center justify-end bg-red-900 w-auto h-40">
			<Button
				className="w-64 bg-primary text-white hover:bg-white hover:text-black  font-semibold mx-12 "
				onClick={() => logout()}
			>
				logout
			</Button>
		</header>
	);
}

export default Header;
