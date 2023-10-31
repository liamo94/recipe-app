import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { styled } from "styled-components";
import { RecipeContent, RecipeList } from "./components";
import { URL_PATHS } from "./api";

export const PageRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to={URL_PATHS.recipes} />
      </Route>
      <Route path={`/${URL_PATHS.recipes}`}>
        <Container>
          <RecipeList />
          <RecipeContent />
        </Container>
      </Route>
    </Switch>
  </Router>
);

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`;
