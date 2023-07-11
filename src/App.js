import { Route, Switch } from "react-router-dom";
import "./App.css";
import Forgot from "./Components/Forgot";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forgot">
          <Forgot />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
