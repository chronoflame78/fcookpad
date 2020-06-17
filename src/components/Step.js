import React, { Component } from "react";
import '../css/Step.css';
import Picture from '../components/Picture';

class Step extends Component {

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
              <div className="col-lg-4 col-md-5 padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="250px" src={this.props.image}/>
                </div>
              </div>
              <div className="col-lg-8 col-md-7 ">
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
              <div className="col-lg-4 col-md-5 padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="250px" src={this.props.image}/>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
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
              <div className="col-lg-8 col-md-7">
                <div className="mt-3 txt-description">
                  <div>
                    {this.props.description}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5 padding-custom">
                <div className="mt-3">
                  <Picture width="100%" height="250px" src={this.props.image}/>
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