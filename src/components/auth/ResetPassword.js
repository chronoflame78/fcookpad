import React, { Component } from "react";
import '../../css/Confirm.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const isEmpty = require("is-empty");

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            password: '',
            passwordConfirm: '',
            buttonLoading: false,
            errors: {}
        }
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState({
            buttonLoading: true
        })
        let token = this.props.match.params.token;
        let data = {
            token: token,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }
        axios
            .post("http://178.128.83.129:3000/api/auth/reset_password/verify", data)
            .then(res => {
                this.setState({
                    sent: true,
                    buttonLoading: false,
                    errors: {}
                })
                swal("Thành công!", "Mật khẩu của bạn đã được đổi thành công!", "success");
            })
            .catch(err =>{
                console.log(err)
                this.setState({
                    buttonLoading: false,
                    errors: err.response.data
                })
            }   
            );
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {
        console.log(this.props.match.params.token)
        let button;
        if (this.state.sent === false) {
            if (this.state.buttonLoading) {
                button =
                    <div className="resend-btn-container">
                        <button className="resend-btn"><i className="fa fa-spinner fa-spin"></i></button>
                    </div>
            }
            else {
                button =
                    <div className="resend-btn-container">
                        <button className="resend-btn" onClick={this.resetPassword}>Xác nhận</button>
                    </div>
            }

        } else {
            button =
                <div>
                    <div className="resend-btn-container">
                        <button className="resend-btn-inactive" disabled>Xác nhận</button>
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
                        <div className="login-wel-title">
                            <h4 className="login-h4">Thay đổi mật khẩu</h4>
                        </div>

                        <div className="login-form-container">
                            <form className="log-in-form" noValidate onSubmit={this.resetPassword}>
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    value={this.state.password}
                                    id="password"
                                    type="password" placeholder="Mật khẩu mới" />
                                <input onChange={this.onChange}
                                    className="login-uap-input"
                                    style={{ marginTop: '10px' }}
                                    value={this.state.passwordConfirm}
                                    id="passwordConfirm"
                                    type="password" placeholder="Xác nhận lại mật khẩu mới" />
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

export default ResetPassword