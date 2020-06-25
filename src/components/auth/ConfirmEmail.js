import React, { Component } from "react";
import '../../css/Confirm.css';


class ConfirmEmail extends Component {
  render() {
    return (
      <div className="parent-content">
        <div className="content-wrapper">
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
                  <h1><b>ONE MORE STEP</b></h1>
                </div>
                <div className="text-container">
                  <label>You are almost one of us now,
                  please check your registered mail to finish to be verify your
                  registration and to officially join our community.
                            </label>
                </div>
                <div className="quest-part">
                  <label className="quest-text">
                    Haven’t recieced verification mail yet?
                    Click button below to resend other mail.
                            </label>
                </div>
                <div className="resend-btn-container">
                  <a href="/">
                    <img className="resend-btn" src="/images/resend-email.png" alt="Resend Email" />
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

export default ConfirmEmail