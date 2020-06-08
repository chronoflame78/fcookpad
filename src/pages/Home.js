import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Loader from '../components/Loader';
import ItemCarousel from '../components/ItemCarousel';

class Home extends Component {

    constructor(props) {
      super(props);
      this.state = {

      };
  
    }
  
    componentDidMount() {

    }
  
    componentWillUnmount() {

    }
  
    render() {
      return(<div>
        <ItemCarousel/>
      </div>);
    }
  }
  
  export default Home;