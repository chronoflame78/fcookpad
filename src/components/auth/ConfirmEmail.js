import React, { Component } from "react";
import "../../css/Confirm.css";
import queryString from "query-string";
import axios from "axios";
import { Link } from "react-router-dom";
import Timer from "../common/Timer";
import {apiURL} from "../../config/Constant";
class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      buttonLoading: false,
    };
  }

  resendEmail = (e) => {
    let params = queryString.parse(this.props.location.search);
    this.setState({
      buttonLoading: true,
    });
    let data = {
      email: params.email,
    };
    axios
      .post(`${apiURL}/auth/resendEmail`, data)
      .then((res) =>
        this.setState({
          sent: true,
          buttonLoading: false
        })
      ).then((res) => {
        setTimeout(
          () =>
            this.setState({
              sent: false,
            }),
          60000
        )
      }).catch((err) => {
        console.log(err);
        this.setState({
          buttonLoading: false
        })
      });
  };

  render() {
    let button;
    if (this.state.sent === false) {
      if(this.state.buttonLoading){
        button = (<div className="resend-btn-container">
          <button className="btn btn-pink btn-login">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        </div>)
      }
      else{
        button = (
          <div className="resend-btn-container">
            <button className="btn btn-pink btn-login" onClick={this.resendEmail}>
              Gửi lại
            </button>
          </div>
        );
      }
      
    } else {
      button = (
        <div>
          <div className="resend-btn-container">
            <button className="btn btn-pink-disabled btn-login" disabled>
              <div class="inside-disabled-btn">
                <div>Đã gửi, thử lại sau</div>
                <Timer />
              </div>
            </button>
          </div>
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
                    src="/images/NewLogo.png"
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
                    Nếu chưa nhận được mail xác nhận, hãy bấm nút bên dưới để
                    gửi lại một email khác.
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
