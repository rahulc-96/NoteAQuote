import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import React from "react";
import NewQuote from "./components/pages/NewQuote";
import QuoteDetail from "./components/pages/QuoteDetail";
import NotFound from "./components/UI/NotFound";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/new_quote">
          <NewQuote />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
