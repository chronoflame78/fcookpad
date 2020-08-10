import React, { Component } from "react";
import "../../css/Confirm.css";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const isEmpty = require("is-empty");

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      password: "",
      passwordConfirm: "",
      buttonLoading: false,
      errors: {},
    };
  }

  resetPassword = (e) => {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let token = this.props.match.params.token;
    let data = {
      token: token,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    axios
      .post("http://api.mlemmlem.site/api/auth/reset_password/verify", data)
      .then((res) => {
        this.setState({
          sent: true,
          buttonLoading: false,
          errors: {},
        });
        swal(
          "Thành công!",
          "Mật khẩu của bạn đã được đổi thành công!",
          "success"
        ).then(() => {
          let jwtToken = res.data.token;
          localStorage.setItem("jwtToken", jwtToken);
          window.location = "/";
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          buttonLoading: false,
          errors: err.response.data,
        });
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    let button;
    if (this.state.sent === false) {
      if (this.state.buttonLoading) {
        button = (
          <div className="resend-btn-container">
            <button className="btn btn-pink-disabled btn-login">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        );
      } else {
        button = (
          <div className="resend-btn-container">
            <button
              className="btn btn-pink btn-login"
              onClick={this.resetPassword}
            >
              Xác nhận
            </button>
          </div>
        );
      }
    } else {
      button = (
        <div>
          <div className="resend-btn-container">
            <button
              className="btn btn-pink-disabled btn-login succeed-changed"
              disabled
            >
              Đổi mật khẩu thành công!
            </button>
          </div>
          {/* <span className="confirm-alert">Email sent! Please wait <span><Countdown timer={20}/></span>  seconds before try again</span> */}
        </div>
      );
    }

    return (
      <div className="login-body-wrapper">
        <div className="login-content-wrapper">
          <div className="login-form-wrapper">
            <div className="login-back-container">
              <Link to="/">
                <img
                  src="/images/back-arrow.png"
                  alt="Back"
                  width="16.91"
                  height="12.3"
                />
              </Link>
            </div>
            <div className="forgot-logo-container">
              <img
                src="/images/NewLogo.png"
                alt="Back"
                width={122}
                height={100}
              />
            </div>
            <div className="login-wel-title">
              <h4 className="login-h4">Thay đổi mật khẩu</h4>
            </div>

            <div className="login-form-container">
              <form
                className="log-in-form"
                noValidate
                onSubmit={this.resetPassword}
              >
                <div className="input-container">
                  <div className="input-container-register">
                    <div className="input-container input-rs-pwd">
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        autoComplete="off"
                        maxLength="100"
                        placeholder=" "
                        className="form-control login-uap-input"
                        id="password"
                        type="password"
                      />
                      <div className="forgot-email-input">
                        <label className="create-label-name">Mật khẩu</label>
                      </div>
                    </div>
                  </div>
                  <div className="input-container-register">
                    <div className="input-container input-rs-pwd">
                      <input
                        onChange={this.onChange}
                        value={this.state.passwordConfirm}
                        style={{ marginTop: "10px" }}
                        autoComplete="off"
                        maxLength="100"
                        placeholder=" "
                        className="form-control login-uap-input"
                        id="passwordConfirm"
                        type="password"
                      />
                      <div className="forgot-email-input">
                        <label className="create-label-name">
                          Nhập lại mật khẩu
                        </label>
                      </div>
                    </div>
                  </div>

                  {!isEmpty(this.state.errors) && (
                    <div className="forgot-alert alert alert-danger">
                      {this.state.errors.message}
                    </div>
                  )}
                  <div className="forgot-btn-container">{button}</div>
                </div>
              </form>
            </div>
          </div>
          <div className="login-form-image"></div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
