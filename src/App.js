import { createContext, contextType } from "react";
import "./custom.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./custom.css";
import Home from "./Home";
import Restaurants from "./Restaurants";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";

import RestaurantContext from "./RestaurantContext";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/restaurants/:restaurantId">
            <Restaurants />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
