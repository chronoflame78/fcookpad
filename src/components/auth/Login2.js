import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "../../css/Login.css";
import { toast } from "react-toastify";
const isEmpty = require("is-empty");
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
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
      // this.props.history.push("/dashboard"); // push user to dashboard when they login
      toast.success("Login successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.props.history.goBack();
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
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
            <div className="login-logo-container">
              <img
                src="/images/NewLogo.png"
                alt="Back"
                width={122}
                height={100}
              />
            </div>
            <div className="login-wel-title">
              <h4 className="login-h4">Đăng nhập</h4>
            </div>
            <div className="login-form-container">
              <form className="log-in-form" noValidate onSubmit={this.onSubmit}>
                <div className="log-in-form-wrapper">
                  <div className="input-container input-container-login">
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      autoComplete="off"
                      maxLength="100"
                      placeholder=" "
                      className="form-control login-uap-input"
                      id="email"
                      type="email"
                    />
                    <div className="forgot-email-input">
                      <label className="create-label-name">Email</label>
                    </div>
                  </div>
                  <div className="input-container input-container-login">
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
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

                  <input type="submit" style={{ display: "none" }} />
                  {!isEmpty(errors) && (
                    <div className="register-error alert alert-danger">
                      {errors.message}
                    </div>
                  )}
                  <div className="login-forgot-link">
                    <Link to="/forgot_password">Tìm lại mật khẩu</Link>
                  </div>
                  <div className="login-btn-container">
                    <button
                      type="submit"
                      className="btn btn-pink btn-login"
                      onClick={this.onSubmit}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="login-quest-text">
              Bạn chưa có tài khoản của MlemMlem?
            </div>
            <div className="login-signup-btn">
              <Link to="/register">
                <button
                  // type="submit"
                  className="btn btn-pink"
                >
                  Đăng ký
                </button>
              </Link>
            </div>
          </div>
          <div className="login-form-image"></div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
