import React from "react";
import "./App.css";
import MediaCard from "./components/cards/Card";
import Cart from "./components/cart/cart";
import history from "./history";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    
    <div>
      <Router history={history}>
        <Route exact path="/">
          <MediaCard />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Router>
    </div>
  );
}

export default App;
