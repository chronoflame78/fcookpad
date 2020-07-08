import React, { Component } from 'react'
import axios from "axios";
import Footer from '../layout/Footer';
import SectionTop from '../common/SectionTop';
import '../../css/AccountSetting.css';
import Avatar from '../common/Avatar';
import { NavLink } from "react-router-dom";
import '../../css/Section.css';
import Loader from '../common/LoaderVer2';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const isEmpty = require("is-empty");
class AccountSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            posts: [],
            top: [],
            nextPage: 2,
            loading: false
        };
        this.showMore = this.showMore.bind(this);
    }

    getFormattedDate(date) {
        var today = new Date(date);
        var month = "";
        if (today.getMonth() < 9) {
            month = "0" + (today.getMonth() + 1)
        }
        else {
            month = today.getMonth() + 1
        }
        return today.getDate() + "/" + month + "/" + today.getFullYear();
    }

    showMore(nextPage) {
        axios.get("http://178.128.83.129:3000/api/users/" + this.props.match.params.id + "/posts?page=" + nextPage)
            .then(res => {
                const arr = this.state.posts;
                arr.push(...res.data.allPosts);
                this.setState({
                    nextPage: this.state.nextPage + 1,
                    posts: arr
                })
                console.log(this.state.posts)
            }).catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.mounted = true;
        console.log(this.props.auth.user.id)
        axios.all([axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id),
        axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id + "/posts?page=1"),
        axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id + "/top")])
            .then(axios.spread((...res) => {
                console.log(...res)
                if (this.mounted) {
                    this.setState({
                        userInfo: res[0].data.user,
                        posts: res[1].data.allPosts,
                        top: res[2].data.topPost,
                        loading: false
                    });
                }
            }))
            .catch(err =>
                console.log(err)
            );
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.loading) return <Loader />;
        return (
            <div className="asetting-container">
                <div className="container">
                    <div className="row asetting-row">
                        <div className="col-md-4 asetting-info-container">
                            <Avatar className="asetting-avatar" image={this.state.userInfo.avatar} size={140} tooltip={false} />
                            <div className="asetting-name">{this.state.userInfo.name}</div>
                            <div className="asetting-smalltext">Giới tính: {this.state.userInfo.gender}</div>
                            <div className="asetting-smalltext">Ngày sinh: {this.state.userInfo.birthday}</div>
                            <div className="asetting-num"><div className="asetting-left"><img className="asetting-icon" width={20} src="/images/post.png" /> &nbsp;Bài viết:</div><div className="asetting-right">{this.state.userInfo.posts}</div></div>
                            <div className="asetting-views"><div className="asetting-left"><img className="asetting-icon" width={20} src="/images/eye.png" /> &nbsp;Lượt xem:</div> <div className="asetting-right">{this.state.userInfo.views}</div></div>
                            <div className="asetting-likes"><div className="asetting-left"><img className="asetting-icon" width={20} src="/images/like.png" /> &nbsp;Lượt thích:</div> <div className="asetting-right">{this.state.userInfo.likes}</div></div>
                            <div className="asetting-smalltext-end">Gia nhập kể từ ngày: 01/07/2020</div>
                            <div className="asetting-line"></div>
                            <div className="asetting-tab">Thông tin tài khoản</div>
                            <div className="asetting-tab">Công thức của tôi</div>
                            <div className="asetting-tab">Danh mục yêu thích</div>
                            <div className="asetting-tab">Công thức yêu thích</div>
                            <div className="asetting-tab">Công thức gần đây</div>
                            <div className="asetting-tab">Thay đổi mật khẩu</div>
                        </div>
                        <div className="col-md-8 asetting-form-container">
                            <div className="asetting-title">
                                Nhớ bấm lưu trước khi rời khỏi trang nhé
                            </div>
                            <div className="asetting-description">
                                {this.state.userInfo.description}
                            </div>
                        </div>
                    </div>

                </div>
                

                <Footer />
            </div>
        )
    }
}

AccountSetting.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(AccountSetting);