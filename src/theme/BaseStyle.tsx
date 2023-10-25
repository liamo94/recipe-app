import { FC, PropsWithChildren } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

export const GlobalStyle = createGlobalStyle`
  .MuiButton-text, .MuiButtonBase-root {
    && {
        text-transform: none;
        font-size: 16px;
    }
  }
`;

export const BaseStyle: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "24px",
        fontWeight: 700,
      },
      h2: {
        fontSize: "20px",
        fontWeight: 700,
      },
      h3: {
        fontSize: "18px",
        fontWeight: 700,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </MuiThemeProvider>
    </ThemeProvider>
  );
};
