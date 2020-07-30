import React, { Component } from "react";
import "../../css/Confirm.css";
import queryString from "query-string";
import axios from "axios";
import { Link } from "react-router-dom";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
    };
  }

  resendEmail = (e) => {
    let params = queryString.parse(this.props.location.search);
    let data = {
      email: params.email,
    };
    axios
      .post("http://178.128.83.129:3000/api/auth/resendEmail", data)
      .then((res) =>
        this.setState({
          sent: true,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    let button;
    if (this.state.sent === false) {
      button = (
        <div className="resend-btn-container">
          <button className="resend-btn" onClick={this.resendEmail}>
            Gửi lại
          </button>
        </div>
      );
    } else {
      button = (
        <div>
          <div className="resend-btn-container">
            <button className="resend-btn-inactive" disabled>
              Đã gửi
            </button>
          </div>
          {/* <span className="confirm-alert">Email sent! Please wait <span><Countdown timer={20}/></span>  seconds before try again</span> */}
        </div>
      );
    }

    return (
      <div className="parent-content">
        <div className="content-wrapper">
          <div className="form-wrapper">
            <div className="back-container">
              <Link to="/">
                <img
                  src="/images/back-arrow.png"
                  alt="Back"
                  width="16.91"
                  height="12.3"
                />
              </Link>
            </div>
            <div className="justify-content">
              <div className="main-content">
                <div className="logo-container">
                  <img
                    src="/images/Logo.png"
                    alt="Back"
                    width="122"
                    height="100"
                  />
                </div>
                <div className="oms-title">
                  <h1>
                    <b>MỘT CHÚT NỮA THÔI</b>
                  </h1>
                </div>
                <div className="text-container">
                  <label>
                    Hãy kiểm tra email bạn đã đăng ký và bấm vào đường link xác
                    nhận để chính thức gia nhập MlemMlem.
                  </label>
                </div>
                <div className="quest-part">
                  <label className="quest-text">
                    Nếu chưa nhận được mail xác nhận, hãy bấm nút bên dưới để gửi lại một email khác.
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

export default ConfirmEmail;
