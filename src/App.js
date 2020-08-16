import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "./screens/Home/Home";
import Authentication from "./screens/Authentication/Authentication";
import Explorer from "./screens/Explorer/Explorer";
import Messages from "./screens/Messages/Messages";
import Likes from "./screens/Likes/Likes";
import Profile from "./screens/Profile/Profile";
import Reels from "./screens/Reels/Reels";
import { auth } from "firebase";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const unsuscribe = auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in ..
        setUser(authUser);
        if (window.location.pathname === "/") {
          window.location.pathname = "/home";
        }
      } else {
        // user has logged out..
        setUser(null);
      }
    });
    return () => {
      //perform cleanup action with authentication
      unsuscribe();
    };
  }, [user, username]);

  return (
    <div className="app">
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Authentication username={username} />
        </Route>
        <Route path="/home">
          <Home user={user} />
        </Route>
        <Route path="/explorer">
          <Explorer />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/likes">
          <Likes />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/reels">
          <Reels />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
