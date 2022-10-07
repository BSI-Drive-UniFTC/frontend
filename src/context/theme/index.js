import React, { createContext } from "react";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: red[900],
			hover: red[100]
		}
	}
});

export default function Palette({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
