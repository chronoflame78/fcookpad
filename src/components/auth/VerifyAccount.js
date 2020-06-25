import React, { Component } from "react";
import '../../css/Confirm.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyAccount } from "../../actions/authActions";
const isEmpty = require("is-empty");

class VerifyAccount extends Component {
  constructor(props) {
    console.log("post constructor");
    super(props);
    this.state = {
      verify: false,
      errors: {}
    };

  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
       this.setState({
         verify: true
       })
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    console.log(this.props.match.params.token);
    console.log(this.state.errors);
    console.log(this.props);
    if(!isEmpty(this.state.errors)){
      return(<div>{this.state.errors.message}</div>);
      
    }
    if(this.state.verify === false){
      const verifyToken = {
        token: this.props.match.params.token
      };
      this.props.verifyAccount(verifyToken);
      return(<div></div>);
    }   
    return (
      <div className="parent-content">
        <div className="verify-content-wrapper">
          <div className="form-wrapper">
            <div className="back-container">
              <a href="/">
                <img src="/images/back-arrow.png" alt="Back" width="16.91" height="12.3" />
              </a>
            </div>
            <div className="justify-content">
              <div className="main-content">
                <div className="logo-container">
                  <img src="/images/Logo.png" alt="Back" width="122" height="100" />
                </div>
                <div className="oms-title">
                  <h1><b>Be like home, chief!</b></h1>
                </div>
                <div className="text-container">
                  <label>You’re officially one of us now. Start sharing your brilliant recipes to others.
                            </label>
                </div>               
                <div className="resend-btn-container">
                  <a href="/">
                    <img className="resend-btn" src="/images/go-to-home.png" alt="Go to home" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VerifyAccount.propTypes = {
  verifyAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { verifyAccount }
)(VerifyAccount);