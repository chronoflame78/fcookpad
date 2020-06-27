import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import '../../css/Login.css';
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
            agree: false
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
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onAgree(){
        this.setState({
            agree: !this.state.agree
        })
    }
    onSubmit = e => {
        e.preventDefault();
        if(isEmpty(this.state.email)){
            this.setState({
                errors:{
                    status: 'fail',
                    message: 'Email không được để trống'
                }
            })
        }
        else if(isEmpty(this.state.password)){
            this.setState({
                errors:{
                    status: 'fail',
                    message: 'Password không được để trống'
                }
            })
        }
        else if(this.state.password !== this.state.passwordConfirm){
            this.setState({
                errors:{
                    status: 'fail',
                    message: 'Passwood nhập lại không khớp'
                }
            })
        }
        else if(this.state.agree === false){
            this.setState({
                errors:{
                    status: 'fail',
                    message: 'Please read our terms of service and tick the checkbox'
                }
            });
        }
        else{
            const newUser = {
                //   name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
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
                            <a href="/">
                                <img src="/images/back-arrow.png" alt="Back" width="16.91" height="12.3" />
                            </a>
                        </div>
                        <div className="login-logo-container">
                            <img src="/images/Logo.png" alt="Back" width={122} height={100} />
                        </div>
                        <div className="login-wel-title">
                            <h4 className="login-h4">Welcome, chief!</h4>
                        </div>
                        <div className="login-form-container">
                            <form className="log-in-form" noValidate onSubmit={this.onSubmit}>
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    value={this.state.email}
                                    maxLength="40"
                                    id="email"
                                    type="email" placeholder="Email" />
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    value={this.state.password}
                                    maxLength="30"
                                    id="password"
                                    type="password" placeholder="Password" />
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    value={this.state.passwordConfirm}
                                    maxLength="30"
                                    id="passwordConfirm"
                                    type="password" placeholder="Confirm Password" /> 
                                <input type="submit" style={{display: 'none'}}/>                               
                                <div className="register-policy-part">
                                    <input onClick={this.onAgree} type="checkbox" />
                                    <label className="register-pol-text">By continuing, you agree to MlemMlem's
                                    <b> Terms of Service, Privacy Policy</b>
                                    </label>
                                </div>
                                <div className="register-error">{errors && errors.message}</div>
                                <div className="login-btn-container">
                                    <img onClick={this.onSubmit} className="login-btn" src="/images/create-account.png" alt="create account" />
                                </div>
                            </form>
                        </div>

                        <div className="login-or-div">OR</div>
                        <div className="login-gg-cont">
                            <a href="/">
                                <img className="login-btn" src="/images/log-in-google.png" alt="Log In" />
                            </a>
                        </div>
                        <div className="login-fb-cont">
                            <a href="/">
                                <img className="login-btn" src="/images/log-in-fb.png" alt="Log In" />
                            </a>
                        </div>
                    </div>
                    <div className="login-form-image">

                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));