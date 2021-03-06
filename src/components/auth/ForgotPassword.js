import React, { Component } from "react";
import "../../css/Confirm.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {apiURL} from "../../config/Constant";
const isEmpty = require("is-empty");

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      email: "",
      errors: {},
      buttonLoading: false,
    };
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  sendEmail = (e) => {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let data = {
      email: this.state.email,
    };
    axios
      .post(`${apiURL}/auth/reset_password`, data)
      .then((res) => {
        this.setState({
          sent: true,
          buttonLoading: false,
          errors: {},
        });
        swal(
          "Email đã gửi!",
          "Một email đã được gửi đến hòm thư của bạn!",
          "success"
        ).then((res) => {
          this.setState({
            email: "",
            sent: false
          })
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          buttonLoading: false,
        });
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ sent: false });
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
                className="btn btn-pink btn-login btn-send-email"
                onClick={this.sendEmail}
              >
                Gửi email
              </button>
          </div>
        );
      }
    } else {
      button = (
        <div>
          <div className="resend-btn-container">
          <button
                className="btn btn-pink btn-login btn-send-email"
                onClick={this.sendEmail}
              >
                Gửi email
              </button>
          </div>
        </div>
        
      );
    }

    return (
      <div className="login-body-wrapper">
        <div className="login-content-wrapper">
          <div className="login-form-wrapper">
            <div className="login-back-container">
              <Link to="/login">
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
            <div className="forgot-title">
              <h4 className="login-h4">Tìm lại mật khẩu</h4>
            </div>

            <div className="forgot-form-container">
              <form
                className="log-in-form"
                noValidate
                onSubmit={this.sendEmail}
              >
                <div className="forgot-text">
                  Vì lý do bảo mật, chúng tôi sẽ không lưu trữ và gửi lại mật
                  khẩu của bạn qua email.
                </div>
                <div className="forgot-text">Nhập email để tiếp tục.</div>
                <div className="form-group form-wrapper">
                  <div className="input-container">
                    <input
                      onChange={this.onChange}
                      id="email"
                      value={this.state.email}
                      autoComplete="off"
                      maxLength="100"
                      placeholder=" "
                      className="form-control login-uap-input email-input"
                      type="email"
                    />
                    <div className="forgot-email-input">
                      <label htmlFor="email" className="create-label-name">Email</label>
                    </div>
                  </div>
                </div>
                {!isEmpty(this.state.errors) && (
                  <div className="forgot-alert alert alert-danger">
                    {this.state.errors.message}
                  </div>
                )}
                <div className="forgot-btn-container">{button}</div>
              </form>
            </div>
          </div>
          <div className="login-form-image"></div>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ForgotPassword);
