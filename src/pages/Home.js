import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Loader from '../components/Loader';
import ItemCarousel from '../components/Category';
import Section from '../components/Section';

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
        <Section sectionName="TRENDING" tail="post_trending"/>
      </div>);
    }
  }
  
  export default Home;