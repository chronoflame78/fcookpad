import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from 'react-router-dom';
import '../../css/Login.css';
import { toast } from 'react-toastify';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      // this.props.history.push("/dashboard"); // push user to dashboard when they login
      toast.success('Login successfully!', { position: toast.POSITION.TOP_RIGHT });
      this.props.history.goBack();
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
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
                <img src="/images/back-arrow.png" alt="Back" width="16.91" height="12.3" />
              </Link>
            </div>
            <div className="login-logo-container">
              <img src="/images/Logo.png" alt="Back" width={122} height={100} />
            </div>
            <div className="login-wel-title">
              <h4 className="login-h4">Welcome back, chief!</h4>
            </div>
            <div className="login-form-container">
              <form className="log-in-form" noValidate onSubmit={this.onSubmit}>
                <input onChange={this.onChange}
                  className="login-uap-input"
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email" placeholder="Email" />
                <input onChange={this.onChange}
                  className="login-uap-input"
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password" placeholder="Password" />
                <input type="submit" style={{ display: 'none' }} />
                <div className="register-error">{errors && errors.message}</div>
                <a className="login-forgot-link" href="/">Forgot Username / Password?</a>
                <div className="login-btn-container">
                  <img onClick={this.onSubmit} className="login-btn" src="/images/log-in.png" alt="Log In" />
                </div>
              </form>
            </div>

            <div className="login-or-div">OR</div>
            <div className="login-gg-cont">
              <Link to="/">
                <img className="login-btn" src="/images/log-in-google.png" alt="Log In" />
              </Link>
            </div>
            <div className="login-fb-cont">
              <Link to="/">
                <img className="login-btn" src="/images/log-in-fb.png" alt="Log In" />
              </Link>
            </div>
            <div className="login-quest-text">Not on MlemMlem yet?</div>
            <div className="login-signup-btn">
              <Link to="/register">
                <img className="login-btn" src="/images/sign-up-button.png" alt="Log In" />
              </Link>
            </div>
          </div>
          <div className="login-form-image">

          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);