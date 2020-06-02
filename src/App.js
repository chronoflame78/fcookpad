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
import TopMenu from "./components/TopMenu";
import "bootstrap/dist/css/bootstrap.min.css";
const Index = () => <h2>Home</h2>;
function App() {
  return (
     <Router>
      <div className="App">
        <TopMenu />
        <Route path="/" exact component={Index} />
         <Route path="/post/" exact component={Post} /> 
       
        <Route path="/post/:id" component={Post}/>

      </div>
    </Router>
  );
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
