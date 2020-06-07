import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import '../css/Step.css';

class Step extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    if(this.props.num === 0){
      return (
        <div className="custom-div">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 padding-custom">
                <div className="mt-3">
                  <img src={this.props.image} alt="" className="img-fluid mx-auto d-block img-thumbnail custom-image" />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="mt-3 txt-description">
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
    else if (this.props.num % 2 === 0) {
      return (
        <div className="custom-div">
          <div className="line-bottom"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 padding-custom">
                <div className="mt-3">
                  <img src={this.props.image} alt="" className="img-fluid mx-auto d-block img-thumbnail custom-image" />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="mt-3 txt-description">
                  <div>
                    {this.props.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="custom-div">
          <div className="line-bottom"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="mt-3 txt-description">
                  <div>
                    {this.props.description}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 padding-custom">
                <div className="mt-3">
                  <img src={this.props.image} alt="" className="img-fluid mx-auto d-block img-thumbnail custom-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }


  }
}

export default Step;