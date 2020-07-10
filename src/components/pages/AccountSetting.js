import React, { Component } from 'react'
import axios from "axios";
import Footer from '../layout/Footer';
import SectionTop from '../common/SectionTop';
import '../../css/AccountSetting.css';
import Avatar from '../common/Avatar';
import { NavLink } from "react-router-dom";
import '../../css/Section.css';
import Loader from '../common/LoaderVer2';
import ButtonLoader from '../common/Loader';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
const isEmpty = require("is-empty");
class AccountSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            userInfoUpdate: {
                firstName: '',
                lastName: '',
                fullName: '',
                avatar: '',
                email: '',
                birthday: new Date(),
                gender: 'Khác',
                description: '',
                posts: 0,
                views: 0,
                likes: 0,
                createAt: ''
            },
            posts: [],
            top: [],
            nextPage: 2,
            loading: false,
            errors: {},
            buttonLoading: false,
            file: '',
            imagePreviewUrl: ''
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

    onDateChange = date => {
        this.setState({
            userInfoUpdate: { ...this.state.userInfoUpdate, birthday: date }
        })
    }

    onFirstNameChange = e => {
        this.setState({
            userInfoUpdate: { ...this.state.userInfoUpdate, firstName: e.target.value }
        })
    }

    onLastNameChange = e => {
        this.setState({
            userInfoUpdate: { ...this.state.userInfoUpdate, lastName: e.target.value }
        })
    }

    onGenderChange = e => {
        this.setState({
            userInfoUpdate: { ...this.state.userInfoUpdate, gender: e.target.value }
        })
    }

    onDescriptionChange = e => {
        this.setState({
            userInfoUpdate: { ...this.state.userInfoUpdate, description: e.target.value }
        })
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if(file){
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
    
            reader.readAsDataURL(file)
        }
        else{
                this.setState({
                    file: '',
                    imagePreviewUrl: ''
                });           
        }
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            buttonLoading: true
        })
        let formData = new FormData();
        formData.append('firstName', this.state.userInfoUpdate.firstName);
        formData.append('lastName', this.state.userInfoUpdate.lastName);
        formData.append('birthday', this.state.userInfoUpdate.birthday);
        formData.append('description', this.state.userInfoUpdate.description);
        formData.append('gender', this.state.userInfoUpdate.gender);
        if(this.state.file){
            formData.append('avatar', this.state.file);
        }
        
        axios
            .post("http://178.128.83.129:3000/api/users", formData)
            .then(res => {
                toast.success('Save successfully!', { position: toast.POSITION.TOP_RIGHT });
                axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id)
                    .then(resp => {                       
                        this.setState({
                            userInfo: resp.data.user,
                            errors: {},
                            buttonLoading: false
                        })
                    }).catch(errs =>
                        console.log(errs)
                    );
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data);
                this.setState({
                    errors: err.response.data,
                    buttonLoading: false
                })
            }
            );
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
                        userInfoUpdate: res[0].data.user,
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
                            {!this.state.imagePreviewUrl && <div className="asetting-avatar-cover asetting-avatar"
                                style={{ width: 200, height: 200, backgroundImage: "url(" + this.state.userInfo.avatar + ")" }}>
                            </div>}
                            {this.state.imagePreviewUrl && <div className="asetting-avatar-cover asetting-avatar"
                                style={{ width: 200, height: 200, backgroundImage: "url(" + this.state.imagePreviewUrl + ")" }}>
                            </div>}
                            <div className="asetting-name">{this.state.userInfo.fullName}</div>
                            <div className="asetting-smalltext"><i className="fas fa-venus-mars"></i> Giới tính: {this.state.userInfo.gender}</div>
                            <div className="asetting-smalltext"><i className="far fa-calendar-alt"></i> Ngày sinh: {this.getFormattedDate(this.state.userInfo.birthday)}</div>
                            <div className="asetting-num"><div className="asetting-left"><i className="far fa-file-alt asetting-icon"></i>Bài viết:</div><div className="asetting-right">{this.state.userInfo.posts}</div></div>
                            <div className="asetting-views"><div className="asetting-left"><i className="far fa-eye asetting-icon"></i>Lượt xem:</div> <div className="asetting-right">{this.state.userInfo.views}</div></div>
                            <div className="asetting-likes"><div className="asetting-left"><i className="far fa-heart asetting-icon"></i>Lượt thích:</div> <div className="asetting-right">{this.state.userInfo.likes}</div></div>
                            <div className="asetting-smalltext-end">Gia nhập kể từ ngày: 01/07/2020</div>
                            <div className="asetting-line"></div>
                            <div className="asetting-tab">Thông tin tài khoản</div>
                            <div className="asetting-tab">Công thức của tôi</div>
                            {/* <div className="asetting-tab">Danh mục yêu thích</div>
                            <div className="asetting-tab">Công thức yêu thích</div>
                            <div className="asetting-tab">Công thức gần đây</div>
                            <div className="asetting-tab">Thay đổi mật khẩu</div> */}
                        </div>
                        <div className="col-md-8 asetting-form-container">
                            <div className="asetting-title">
                                Nhớ bấm lưu trước khi rời khỏi trang nhé
                            </div>
                            <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="form-group asetting-form-group">
                                    <input readOnly autoComplete="off" maxLength="100" id="email" value={this.state.userInfoUpdate.email} type="text" className="form-control asetting-input-email" placeholder=" " />
                                    <label className="asetting-label-email" htmlFor="email">Email</label>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <input autoComplete="off" maxLength="100" onChange={this.onFirstNameChange} id="firstName" value={this.state.userInfoUpdate.firstName} type="text" className="form-control asetting-input-name" placeholder=" " />
                                    <label className="asetting-label-name" htmlFor="firstName">Họ</label>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <input autoComplete="off" maxLength="100" onChange={this.onLastNameChange} id="lastName" value={this.state.userInfoUpdate.lastName} type="text" className="form-control asetting-input-name" placeholder=" " />
                                    <label className="asetting-label-name" htmlFor="lastName">Tên</label>
                                </div>
                                <div className="form-group asetting-dropdown">
                                    <label className="asetting-label-gender" htmlFor="dropdown_value">Giới tính</label>
                                    <select onChange={this.onGenderChange} className="form-control asetting-dropdown-color" value={this.state.userInfoUpdate.gender} id="dropdown_value">
                                        <option className="asetting-option" value='Nam'>Nam</option>
                                        <option className="asetting-option" value='Nữ'>Nữ</option>
                                        <option className="asetting-option" value='Khác'>Khác</option>
                                    </select>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <label className="asetting-label-date" htmlFor="title">Ngày sinh</label>
                                    <div className="asetting-datepicker">
                                        <DatePicker
                                            onChange={this.onDateChange}
                                            selected={new Date(this.state.userInfoUpdate.birthday)}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            className="form-control"
                                            wrapperClassName="asetting-datepicker-wrapper"
                                            popperClassName="asetting-datepicker-popper"
                                        />
                                    </div>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <label className="asetting-label-description" htmlFor="description">Mô tả về bản thân</label>
                                    <textarea spellCheck="false" maxLength="1000" onChange={this.onDescriptionChange} id="description" style={{ resize: 'none' }} value={this.state.userInfoUpdate.description}
                                        className="form-control" rows="3" placeholder=" "></textarea>

                                </div>
                                <div className="form-group asetting-form-group">
                                <label className="asetting-label-description" htmlFor="upload_image">Thay đổi ảnh đại diện</label>
                                <input className="asetting-image-upload" accept="image/*" type="file" id="upload_image" onChange={(e) => this.handleImageChange(e)} />
                                </div>
                                
                                {!isEmpty(this.state.errors) && <div className="alert alert-danger">{this.state.errors.message}</div>}
                                <div className="asetting-button-container">
                                    {!this.state.buttonLoading && <button type="submit" className="btn btn-pink" onClick={(e) => this.handleSubmit(e)}>Lưu</button>}
                                    {this.state.buttonLoading && <button type="submit" className="btn btn-pink"><i class="fa fa-spinner fa-spin"></i></button>}
                                </div>
                            </form>
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