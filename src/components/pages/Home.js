import React, { Component } from "react";
import Category from '../common/Category';
import Section from '../common/Section';
import Footer from "../layout/Footer";
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
        <Category/>
        <Section sectionName="TRENDING" tail="post_trending"/>
        <Section sectionName="NEW" tail="post_new"/>
        <Footer/>
      </div>);
    }
  }
  
  export default Home;