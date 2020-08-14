import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "../../css/Login.css";
const isEmpty = require("is-empty");
class Register extends Component {
  constructor() {
    super();
    this.state = {
      // name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {},
      agree: false,
    };
    this.onAgree = this.onAgree.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onAgree() {
    this.setState({
      agree: !this.state.agree,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(this.state.email)) {
      this.setState({
        errors: {
          status: "fail",
          message: "Email không được để trống",
        },
      });
    } else if (isEmpty(this.state.password)) {
      this.setState({
        errors: {
          status: "fail",
          message: "Password không được để trống",
        },
      });
    } else if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errors: {
          status: "fail",
          message: "Passwood nhập lại không khớp",
        },
      });
    } else if (this.state.agree === false) {
      this.setState({
        errors: {
          status: "fail",
          message: "Please read our terms of service and tick the checkbox",
        },
      });
    } else {
      const newUser = {
        //   name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      };
      this.props.registerUser(newUser, this.props.history);
    }
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
              <h4 className="login-h4">Chào mừng bếp trưởng</h4>
            </div>
            <div className="register-form-container">
              <form
                className="register-form"
                noValidate
                onSubmit={this.onSubmit}
              >
                <div className="register-form-wrapper">
                  <div className="register-text-input-container">
                    <div className="input-container-register">
                      <div className="input-container input-register">
                        <input
                          onChange={this.onChange}
                          id="email"
                          value={this.state.email}
                          error={errors.email}
                          autoComplete="off"
                          maxLength="100"
                          placeholder=" "
                          className="form-control login-uap-input"
                          type="email"
                        />
                        <div className="input-register-placeholder">
                          <label className="create-label-name">Email</label>
                        </div>
                      </div>
                    </div>
                    <div className="input-container-register">
                      <div className="input-container input-register">
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
                        <div className="input-register-placeholder">
                          <label className="create-label-name">Mật khẩu</label>
                        </div>
                      </div>
                    </div>
                    <div className="input-container-register">
                      <div className="input-container input-register">
                        <input
                          onChange={this.onChange}
                          value={this.state.passwordConfirm}
                          error={errors.passwordConfirm}
                          autoComplete="off"
                          maxLength="100"
                          placeholder=" "
                          className="form-control login-uap-input"
                          id="passwordConfirm"
                          type="password"
                        />
                        <div className="input-register-placeholder">
                          <label className="create-label-name">
                            Nhập lại mật khẩu
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="submit" style={{ display: "none" }} />
                <div className="register-policy-part">
                  <input onClick={this.onAgree} type="checkbox" />
                  <label className="register-pol-text">
                    Khi sử dụng MlemMlem, bạn đồng ý với
                    <b> Điều Khoản Dịch Vụ & Chính Sách Bảo Mật</b> của chúng
                    tôi.
                  </label>
                </div>
                <div className="register-error">{errors && errors.message}</div>
                <div className="login-btn-container">
                  <button
                    type="submit"
                    className="btn btn-pink btn-login"
                    onClick={this.onSubmit}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </form>
            </div>
            <div className="login-quest-text">
              Bạn chưa có tài khoản của MlemMlem? <Link to="/login">Đăng nhập</Link>
            </div>

            {/* <div className="login-or-div">OR</div>
            <div className="login-gg-cont">
              <Link to="/">
                <img
                  className="login-btn"
                  src="/images/log-in-google.png"
                  alt="Log In"
                />
              </Link>
            </div>
            <div className="login-fb-cont">
              <Link to="/">
                <img
                  className="login-btn"
                  src="/images/log-in-fb.png"
                  alt="Log In"
                />
              </Link>
            </div> */}
          </div>
          <div className="login-form-image"></div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
