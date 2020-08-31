import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Recipe from "./components/pages/Recipe";
import Home from "./components/pages/Home";
import Create from "./components/pages/Create";
import CreateStep2 from "./components/pages/Step2";
import CreateStep3 from "./components/pages/Step3";
import Edit from "./components/pages/Edit";
import UserProfile from "./components/pages/UserProfile";
import AccountSetting from "./components/pages/AccountSetting";
import SearchResult from "./components/pages/SearchResult";
import ViewAll from "./components/pages/ViewAll";
import TopMenu from "./components/layout/TopMenu";
import Page404 from './components/pages/error/Page404';
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ConfirmEmail from "./components/auth/ConfirmEmail";
import Policy from "./components/pages/Policy"
import ForgotPassword from "./components/auth/ForgotPassword";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import VerifyAccount from './components/auth/VerifyAccount';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/auth/ResetPassword';

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

window.addEventListener('storage', e => {
  
  if(e.key === 'jwtToken' && e.oldValue && !e.newValue) {
     store.dispatch(logoutUser());
   }

});

const DefaultContainer = () => (
  <div>
    <TopMenu />
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/posts/:id" component={Recipe} />
    <Route path="/user_profile/:id" exact component={UserProfile} />
    <PrivateRoute path="/create" component={Create} />
    <PrivateRoute path="/step2/:id" component={CreateStep2} />
    <PrivateRoute path="/step3/:id" component={CreateStep3} />
    <PrivateRoute path="/step1/:id" component={Edit} />
    <PrivateRoute path="/account_settings" component={AccountSetting} /> 
    <Route path="/search" component={SearchResult} />
    <Route path="/view_all/:name" component={ViewAll} />  
    <Route path="/policy" exact component={Policy} />
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
            <Route path="/forgot_password" component={ForgotPassword} />   
            <Route path="/reset_password/:token" component={ResetPassword} />    
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
