import React, { Component } from "react";
import '../../css/Confirm.css';
import queryString from 'query-string';
import axios from "axios";
import {Link} from 'react-router-dom';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
    }
  }

  resendEmail = e => {
    let params = queryString.parse(this.props.location.search);
    let data = {
      email: params.email
    }
    axios
      .post("http://178.128.83.129:3000/api/auth/resendEmail", data)
      .then(res => this.setState({
        sent: true
      }))
      .catch(err =>
        console.log(err)
      );
  }


  render() {
    let button;
    if (this.state.sent === false) {
      button =
        <div className="resend-btn-container">
          <button className="resend-btn" onClick={this.resendEmail}>Resend mail</button>
        </div>;
    } else {
      button =
        <div>
          <div className="resend-btn-container">
            <button className="resend-btn-inactive" disabled>Email sent</button>
          </div>
          {/* <span className="confirm-alert">Email sent! Please wait <span><Countdown timer={20}/></span>  seconds before try again</span> */}
        </div>

    }

    return (
      <div className="parent-content">
        <div className="content-wrapper">
          <div className="form-wrapper">
            <div className="back-container">
              <Link to="/">
                <img src="/images/back-arrow.png" alt="Back" width="16.91" height="12.3" />
              </Link>
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
                {button}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmEmail