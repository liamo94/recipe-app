import { FC } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { styled } from "styled-components";
import { RecipeContent, RecipeList } from "./components";

export const PageRouter: FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="recipes" />
      </Route>
      <Route path="/recipes">
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
  gap: 8px;
  height: 100%;
`;
