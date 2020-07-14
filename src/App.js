import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Post from "./components/pages/Post";
import Home from "./components/pages/Home";
import Create from "./components/pages/Create";
import CreateStep2 from "./components/pages/CreateStep2";
import CreateStep3 from "./components/pages/CreateStep3";
import UserProfile from "./components/pages/UserProfile";
import AccountSetting from "./components/pages/AccountSetting";
import TopMenu from "./components/layout/TopMenu2";
import Page404 from './components/pages/Page404';
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./components/auth/Login2";
import Register from "./components/auth/Register2";
import ConfirmEmail from "./components/auth/ConfirmEmail";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/pages/Dashboard";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import VerifyAccount from './components/auth/VerifyAccount';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const DefaultContainer = () => (
  <div>
    <TopMenu />
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts/:id" component={Post} />
    <Route path="/userprofile/:id" component={UserProfile} />
    <PrivateRoute path="/create" component={Create} />
    <PrivateRoute path="/step2" component={CreateStep2} />
    <PrivateRoute path="/step3" component={CreateStep3} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/accountsetting" component={AccountSetting} /> 
    <Route path="*" component={Page404} />
    </Switch>
  </div>
)

toast.configure()
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/confirm" component={ConfirmEmail} />
            <Route path="/register/verify/:token" exact component={VerifyAccount} />      
            <Route component={DefaultContainer} />           
          </Switch>

        </div>
      </Router>
    </Provider>
  );
}



export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
