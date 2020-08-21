import React, { Component } from "react";
import "../../css/Confirm.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {apiURL} from "../../config/Constant";

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerify: false,
      isError: false
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      let data = {
        token: this.props.match.params.token
      }
      axios
        .post(`${apiURL}/auth/verify`, data)
        .then((res) => {
          // Set token to localStorage
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          this.setState({
            isVerify: true
          })
        })
        .catch((err) =>{
          console.log(err);
          this.setState({
            isError: true
          })
        });
    }
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="parent-content">
          <div className="verify-content-wrapper">
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
                      <b>Lỗi!</b>
                    </h1>
                  </div>
                  <div className="text-container">
                    <label>Token không đúng hoặc đã hết hạn.</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if(this.state.isVerify === true){
      return (
        <div className="parent-content">
          <div className="verify-content-wrapper">
            <div className="form-wrapper">
              <div className="back-container">
                <a href="/">
                  <img
                    src="/images/back-arrow.png"
                    alt="Back"
                    width="16.91"
                    height="12.3"
                  />
                </a>
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
                      <b>Cứ tự nhiên nhé bếp trưởng!</b>
                    </h1>
                  </div>
                  <div className="text-container">
                    <label>
                      Bạn đã đăng ký thành công, bắt đầu chia sẻ công thức của
                      mình nào.
                    </label>
                  </div>
                  <div className="resend-btn-container">
                    <a href="/">
                      <button className="btn btn-pink btn-login">
                        Quay về trang chủ
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return <div></div>;
    }
    
  }
}

VerifyAccount.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(VerifyAccount);
