import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";


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
            <div>
            <div className="container" style={{borderRadius: '4px', border: '1px solid'}}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mt-3">
              <img src={require('../images/logo.png')} alt="" className="img-fluid mx-auto d-block img-thumbnail" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mt-3">
              <h2>{this.props.title}</h2>
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