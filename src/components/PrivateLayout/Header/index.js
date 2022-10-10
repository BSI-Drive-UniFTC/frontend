import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "assets/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <header className="flex flex-row items-center justify-end bg-primary w-auto h-40">
                <div className="flex items-center justify-center bg-primary h-40 w-40 ml-20">
                    <img src={logo} alt="logo" className="w-120 h-120 mt-10" />
                </div>

                <nav className="flex items-center justify-between w-full">
                    <ul>
                        <Link to="/ProjectRegistration" className="text-white font-semibold text-sm no-underline hover:underline">Cadastrar Disciplina</Link>
                        <Link to="/ConsultProject" className="text-white font-semibold text-sm no-underline hover:underline mx-16">Cadastrar Projetos</Link>
                        <Link to="/SubjectRegistration" className="text-white font-semibold text-sm no-underline hover:underline">Consultar Projetos</Link>
                    </ul>
                </nav>

                <Button
                    className="w-64 bg-primary text-white hover:bg-white hover:text-black  font-semibold mx-12 "
                    onClick={() => logout()}
                >
                    logout
                </Button>
            </header>
            <div className=" flex-1">
                <Outlet />
            </div>
        </div>
    );
}

export default Header;
