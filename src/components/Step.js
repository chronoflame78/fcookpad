import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import '../css/Step.css';

class Step extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return(
            <div className="custom-div">
            <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mt-3">
              <img src={this.props.image} alt="" className="img-fluid mx-auto d-block img-thumbnail custom-image" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mt-3">
              <div>
                {this.props.description}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        );
        
    }
}

export default Step;