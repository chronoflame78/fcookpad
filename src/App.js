import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import './App.css';
import Post from "./pages/Post";
import Home from "./pages/Home";
import TopMenu from "./components/TopMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Index = () => <h2>Home</h2>;
function App() {
  return (
     <Router>
      <div className="App">
        <TopMenu />
        <Route path="/" exact component={Home} />
         <Route path="/post/" exact component={Post} /> 
       
        <Route path="/post/:id" component={Post}/>

      </div>
    </Router>
  );
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
