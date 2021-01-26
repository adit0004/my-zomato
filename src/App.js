import "./custom.scss";
import "./custom.css";
import Home from "./Home";
import Restaurants from "./Restaurants";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/restaurants/:cityId">
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
