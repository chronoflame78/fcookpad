import React, { Component } from "react";
import "../../css/Step.css";
import PostStepPicture from "../common/PostStepPicture";

class Step extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    if (this.props.num === 0) {
      console.log(this.props.image.length);
      return (
        <div className="step-custom-div step-1-custom-div">
          <div className="container">
            {this.props.image.length !== 26 && (
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="mt-3 step-txt-description">
                    <div className="step-title">{this.props.title}</div>
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>
                <div className="col-lg-6 col-12 step-padding-custom">
                  <div className="mt-3">
                    <PostStepPicture
                      width="100%"
                      height="300px"
                      src={this.props.image}
                      className="post-step-picture"
                    />
                  </div>
                </div>
              </div>
            )}
            {this.props.image.length === 26 && (
              <div className="row no-image-step">
                <div className="col-lg-6">
                  <div className="mt-3 step-txt-description">
                    <div className="step-title">{this.props.title}</div>
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (this.props.num % 2 === 0) {
      console.log(this.props.image.length);

      return (
        <div className="step-custom-div">
          <div className="step-line-bottom"></div>

          <div className="container">
            {this.props.image.length !== 26 && (
              <div className="row">
                <div className="col-lg-6">
                  <div className="mt-3 step-txt-description">
                    <div class="step-title">{this.props.title}</div>
                    {console.log(this.props.title)}
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>
                <div className="col-lg-6 step-padding-custom">
                  <div className="mt-3">
                    <PostStepPicture
                      width="100%"
                      height="300px"
                      src={this.props.image}
                      className="post-step-picture"
                    />
                  </div>
                </div>
              </div>
            )}
            {this.props.image.length === 26 && (
              <div className="row no-image-step">
                <div className="col-md-6">
                  <div className="mt-3 step-txt-description">
                    <div className="step-title">{this.props.title}</div>
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="step-custom-div">
          <div className="step-line-bottom"></div>
          <div className="container">
            {this.props.image.length !== 26 && (
              <div className="row">
                <div className="col-lg-6 order-lg-2">
                  <div className="mt-3 step-txt-description">
                    <div class="step-title">{this.props.title}</div>
                    {console.log(this.props.title)}
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>

                <div className="col-lg-6 order-lg-1">
                  <div className="mt-3">
                    <PostStepPicture
                      width="100%"
                      height="300px"
                      src={this.props.image}
                      className="post-step-picture"
                    />
                  </div>
                </div>
              </div>
            )}
            {this.props.image.length === 26 && (
              <div className="row no-image-step">
                <div className="col-md-6">
                  <div className="mt-3 step-txt-description">
                    <div className="step-title">{this.props.title}</div>
                    <div className="step-content">{this.props.description}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Step;
