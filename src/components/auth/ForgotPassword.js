import React, { Component } from "react";
import '../../css/Confirm.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const isEmpty = require("is-empty");

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            email: '',
            errors: {},
            buttonLoading: false
        }
    }

    sendEmail = e => {
        e.preventDefault();
        this.setState({
            buttonLoading: true
        })
        let data = {
            email: this.state.email
        }
        axios
            .post("http://178.128.83.129:3000/api/auth/reset_password", data)
            .then(res => {
                this.setState({
                    sent: true,
                    buttonLoading: false,
                    errors: {}
                })
                swal("Email sent!", "Một email đã được gửi đến hòm thư của bạn!", "success");
            })
            .catch(err =>{
                this.setState({
                    errors: err.response.data,
                    buttonLoading: false
                })
            }
                
            );
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        this.setState({sent: false})
    };


    render() {
        let button;
        if (this.state.sent === false) {
            if(this.state.buttonLoading){
                button =
                <div className="resend-btn-container">
                    <button className="resend-btn"><i className="fa fa-spinner fa-spin"></i></button>
                </div>;
            }else{
                button =
                <div className="resend-btn-container">
                    <button className="resend-btn" onClick={this.sendEmail}>Send email</button>
                </div>;
            }     
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
            <div className="login-body-wrapper">
                <div className="login-content-wrapper">
                    <div className="login-form-wrapper">
                        <div className="login-back-container">
                            <Link to="/">
                                <img src="/images/back-arrow.png" alt="Back" width="16.91" height="12.3" />
                            </Link>
                        </div>
                        <div className="forgot-logo-container">
                            <img src="/images/NewLogo.png" alt="Back" width={122} height={100} />
                        </div>
                        <div className="forgot-title">
                            <h4 className="login-h4">Forgot something?</h4>
                        </div>

                        <div className="login-form-container">
                            <form className="log-in-form" noValidate onSubmit={this.sendEmail}>
                                <div className="forgot-text">
                                    Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                                </div>
                                <div className="forgot-text">
                                    For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
                                </div>
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    value={this.state.email}
                                    autoComplete="off"
                                    maxLength="40"
                                    id="email"
                                    type="email" placeholder="Email" />
                                {!isEmpty(this.state.errors) && <div className="forgot-alert alert alert-danger">{this.state.errors.message}</div>}
                                <div className="forgot-btn-container">
                                    {button}
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="login-form-image">

                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword