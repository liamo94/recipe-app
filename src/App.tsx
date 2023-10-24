import { FC, PropsWithChildren } from "react";
import "./App.scss";
import { RecipeContent, RecipeList } from "./components";
import { createGlobalStyle, styled, ThemeProvider } from "styled-components";

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  .MuiButton-text, .MuiButtonBase-root {
    && {
        text-transform: none;
    }
  }
`;

export const BaseStyle: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Router>{children}</Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BaseStyle>
        <Container>
          <RecipeList />
          <RecipeContent />
        </Container>
      </BaseStyle>
    </QueryClientProvider>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  gap: 8px;
  height: 100%;
`;
