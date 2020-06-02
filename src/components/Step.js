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
              <h4 className="mt-4">Hello! <span className="text-custom font-weight-bold">I'M Kerri Deo.</span></h4>
              <p className="text-muted mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
              <p className="text-muted mt-2">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
              <p className="text-muted mt-2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
            </div>
          </div>
        </div>
      </div>
        </div>
        );
        
    }
}

export default Step;