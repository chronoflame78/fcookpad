import React, { Component } from "react";
import '../../css/Confirm.css';


class VerifyAccount extends Component {

  render() {
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

export default VerifyAccount