import React, { Component } from "react";
import "../../css/Step.css";
import Picture from "../common/Picture";

class Step extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.num === 0) {
      return (
        <div className="step-custom-div">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="mt-3 step-txt-description step-content">
                  <div className="step-title">{this.props.title}</div>
                  {console.log(this.props.title)}
                  <div className="step-content">{this.props.description}</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 step-padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="300px" src={this.props.image} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.num % 2 === 0) {
      return (
        <div className="step-custom-div">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 step-padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="300px" src={this.props.image} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 ">
                <div className="mt-3 step-txt-description">
                  <div class="step-title">{this.props.title}</div>
                  {console.log(this.props.title)}
                  <div className="step-content">{this.props.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="step-custom-div">
          <div className="step-line-bottom"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 step-padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="300px" src={this.props.image} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="mt-3 step-txt-description">
                  <div class="step-title">{this.props.title}</div>
                  {console.log(this.props.title)}
                  <div className="step-content">{this.props.description}</div>
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
