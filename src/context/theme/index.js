import React, { createContext } from "react";
import { cyan, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: cyan[900],
            hover: cyan[100]
        }
    }
});

export default function Palette({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
