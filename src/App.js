import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Post from "./pages/Post";
import Home from "./pages/Home";
import TopMenu from "./components/TopMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
     <Router>
      <div className="App">
        <TopMenu />
        <Route path="/" exact component={Home} />
         <Route path="/posts/" exact component={Post} /> 
       
        <Route path="/posts/:id" component={Post}/>

      </div>
    </Router>
  );
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
