import React, { Component } from 'react'
import axios from "axios";
import Footer from '../layout/Footer';
import '../../css/AccountSetting.css';
import { NavLink } from "react-router-dom";
import '../../css/Section.css';
import Loader from '../common/LoaderVer2';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import swal from 'sweetalert';
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
            nextPage: 2,
            loading: false,
            errors: {},
            buttonLoading: false,
            buttonLoadMore: false,
            file: '',
            imagePreviewUrl: '',
            tab: 1,
            currentPassword:'',
            newPassword:'',
            confirmPassword: ''
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
        return today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2}) + "/" + month + "/" + today.getFullYear();
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

    changeTab = (e, index) => {
        this.setState({
            tab: index
        })
    }

    handleEditClick = (e, postId) => {
        localStorage.setItem("create_id", postId);
        localStorage.setItem("action", "update");
        this.props.history.push("/create");
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    handleDeleteClick = (e, postId) => {
        swal({
            title: "Do you really want to delete post?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios
                        .post("http://178.128.83.129:3000/api/users/posts/" + postId+"/destroy")
                        .then(res => {
                            toast.success('Delete successfully!', { position: toast.POSITION.TOP_RIGHT });
                            axios.all([axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id),
                            axios.get("http://178.128.83.129:3000/api/users/posts?page=1&limit=3")])
                                .then(axios.spread((...resp) => {
                                    this.setState({
                                        userInfo: resp[0].data.user,
                                        posts: resp[1].data.allPosts
                                    })
                                })).catch(errs =>
                                    console.log(errs)
                                );
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(err.response.data.message, { position: toast.POSITION.TOP_RIGHT });
                        }
                        );
                    // swal("Poof! Your post has been deleted!", {
                    //     icon: "success",
                    // });
                } else {
                    // swal("Your imaginary file is safe!");
                }
            });

    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file)
        }
        else {
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
        if (this.state.file) {
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
                this.setState({
                    errors: err.response.data,
                    buttonLoading: false
                })
            }
            );
    }

    changePassword = e =>{
        e.preventDefault();
        this.setState({
            buttonLoading: true
        })
        let data = {
            passwordCurrent: this.state.currentPassword,
            password: this.state.newPassword,
            passwordConfirm: this.state.confirmPassword
        }
        axios
            .post("http://178.128.83.129:3000/api/users/update_password", data)
            .then(res => {
                toast.success('Thay đổi mật khẩu thành công!', { position: toast.POSITION.TOP_RIGHT });
                this.setState({
                    errors: {},
                    buttonLoading: false
                })
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    buttonLoading: false
                })
            }
            );
    }

    showMore(nextPage) {
        this.setState({
            buttonLoadMore: true
        })
        axios.get("http://178.128.83.129:3000/api/users/posts?page=" + nextPage + "&limit=3")
            .then(res => {
                const arr = this.state.posts;
                arr.push(...res.data.allPosts);
                this.setState({
                    nextPage: this.state.nextPage + 1,
                    posts: arr,
                    buttonLoadMore: false
                })
            }).catch(err => {
                this.setState({
                    errors: err,
                    buttonLoadMore: false
                })
            })
    }

    componentDidMount() {
        this.mounted = true;
        localStorage.removeItem("action");
        localStorage.removeItem("create_id");
        this.setState({
            loading: true
        })
        axios.all([axios.get("http://178.128.83.129:3000/api/users/" + this.props.auth.user.id),
        axios.get("http://178.128.83.129:3000/api/users/posts?page=1&limit=3")])
            .then(axios.spread((...res) => {
                if (this.mounted) {
                    this.setState({
                        userInfo: res[0].data.user,
                        userInfoUpdate: res[0].data.user,
                        posts: res[1].data.allPosts,
                        loading: false
                    });
                }
            }))
            .catch(err =>
                this.setState({
                    errors: err,
                    loading: false
                })
            );
        if (this.props.location.state) {
            var { editSuccess, postTab } = this.props.location.state;
            if (editSuccess === true) {
                toast.success('Edit successfully!', { position: toast.POSITION.TOP_RIGHT });
                if (postTab) {
                    this.setState({
                        tab: postTab
                    })
                }
                this.props.history.replace('/account_settings', null);
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.loading) return <Loader />;
        var tab1 = 'asetting-tab-active';
        var tab2 = 'asetting-tab';
        var tab3 = 'asetting-tab';
        if (this.state.tab === 1) {
            tab1 = 'asetting-tab-active';
            tab2 = 'asetting-tab';
            tab3 = 'asetting-tab';
        }
        else if (this.state.tab === 2) {
            tab1 = 'asetting-tab';
            tab2 = 'asetting-tab-active';
            tab3 = 'asetting-tab';
        }
        else if (this.state.tab === 3) {
            tab1 = 'asetting-tab';
            tab2 = 'asetting-tab';
            tab3 = 'asetting-tab-active';
        }
        return (
            <div className="asetting-container">
                <div className="container asetting-container-child">
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
                            <div className="asetting-smalltext-end">Gia nhập kể từ ngày: {this.getFormattedDate(this.state.userInfo.createAt)}</div>
                            <div className="asetting-line"></div>
                            <div className={tab1} onClick={(e, index) => this.changeTab(e, 1)}>Thông tin tài khoản</div>
                            <div className={tab2} onClick={(e, index) => this.changeTab(e, 2)}>Công thức của tôi</div>
                            <div className={tab3} onClick={(e, index) => this.changeTab(e, 3)}>Thay đổi mật khẩu</div>
                            {/* <div className="asetting-tab">Danh mục yêu thích</div>
                            <div className="asetting-tab">Công thức yêu thích</div>
                            <div className="asetting-tab">Công thức gần đây</div>
                            <div className="asetting-tab">Thay đổi mật khẩu</div> */}
                        </div>
                        {this.state.tab === 1 && <div className="col-md-8 asetting-form-container">
                            <div className="asetting-title">
                                Thông tin tài khoản
                            </div>
                            <form className="asetting-form" onSubmit={(e) => this.handleSubmit(e)}>
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
                                            className="form-control asetting-date-text"
                                            wrapperClassName="asetting-datepicker-wrapper"
                                            popperClassName="asetting-datepicker-popper"
                                        />
                                    </div>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <label className="asetting-label-description" htmlFor="description">Mô tả về bản thân</label>
                                    <textarea spellCheck="false" maxLength="1000" onChange={this.onDescriptionChange} id="description" style={{ resize: 'none' }} value={this.state.userInfoUpdate.description}
                                        className="form-control asetting-description" rows="3" placeholder=" "></textarea>

                                </div>
                                <div className="form-group asetting-form-group">
                                    <label className="asetting-label-description" htmlFor="upload_image">Thay đổi ảnh đại diện</label>
                                    <input className="asetting-image-upload" accept="image/*" type="file" id="upload_image" onChange={(e) => this.handleImageChange(e)} />
                                </div>

                                {!isEmpty(this.state.errors) && <div className="alert alert-danger">{this.state.errors.message}</div>}
                                <div className="asetting-button-container">
                                    {!this.state.buttonLoading && <button type="submit" className="btn btn-pink" onClick={(e) => this.handleSubmit(e)}>Lưu</button>}
                                    {this.state.buttonLoading && <button type="submit" className="btn btn-pink"><i className="fa fa-spinner fa-spin"></i></button>}
                                </div>
                            </form>
                        </div>}
                        {this.state.tab === 2 && <div className="col-md-8 asetting-form-container">
                            <div className="asetting-title-tab2">
                                Công thức của tôi
                            </div>
                            <div className="row" style={{ padding: '0 15px' }}>
                                {isEmpty(this.state.posts) && <div style={{ height: '100px', paddingLeft: '15px', paddingTop: '15px' }}>Bạn chưa có bài đăng nào</div>}
                                {!isEmpty(this.state.posts) && this.state.posts.map((x, index) => (
                                    <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 py-4">

                                        <div className="asetting-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                            <div className="item-cover">
                                                <span className="asetting-icon-edit" onClick={(e) => this.handleEditClick(e, x._id)}><i className="far fa-edit" /></span>
                                                <span className="asetting-icon-line"></span>
                                                <span className="asetting-icon-delete" onClick={(e) => this.handleDeleteClick(e, x._id)}><i className="fas fa-trash-alt" /></span>
                                            </div>
                                        </div>

                                        <div className="asetting-item-title"><NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>{x.title}</NavLink></div>
                                        <div className="asetting-status-container"><div className="asetting-label">Trạng thái:</div><div className="asetting-status">{x.status}</div></div>
                                        <div className="asetting-view-container"><div className="asetting-label">Lượt xem:</div><div className="asetting-view">{x.views}</div></div>
                                    </div>
                                ))}
                            </div>
                            {(this.state.posts.length < this.state.userInfo.posts) &&
                                <div className="row asetting-see-more" style={{ marginLeft: '0px', marginRight: '0px' }}  >
                                    {!this.state.buttonLoadMore && <button onClick={() => this.showMore(this.state.nextPage)} type="submit" className="btn btn-more-pink">XEM THÊM</button>}
                                    {this.state.buttonLoadMore && <button type="submit" className="btn btn-more-pink"><i className="fa fa-spinner fa-spin"></i></button>}
                                </div>}
                        </div>}
                        {this.state.tab === 3 && <div className="col-md-8 asetting-form-container">
                            <div className="asetting-title">
                                Thay đổi mật khẩu
                            </div>
                            <form className="asetting-form" onSubmit={(e) => this.changePassword(e)}>
                                <div className="form-group asetting-form-group">
                                    <input autoComplete="off" maxLength="100" onChange={this.onChange} id="currentPassword" value={this.state.currentPassword} type="password" className="form-control asetting-input-email" placeholder=" " />
                                    <label className="asetting-label-email" htmlFor="currentPassword">Mật khẩu hiện tại</label>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <input autoComplete="off" maxLength="100" onChange={this.onChange}  id="newPassword" value={this.state.newPassword} type="password" className="form-control asetting-input-email" placeholder=" " />
                                    <label className="asetting-label-email" htmlFor="newPassword">Mật khẩu mới</label>
                                </div>
                                <div className="form-group asetting-form-group">
                                    <input autoComplete="off" maxLength="100" onChange={this.onChange}  id="confirmPassword" value={this.state.confirmPassword} type="password" className="form-control asetting-input-email" placeholder=" " />
                                    <label className="asetting-label-email" htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                                </div>
                                {!isEmpty(this.state.errors) && <div className="alert alert-danger">{this.state.errors.message}</div>}
                                <div className="asetting-button-container">
                                    {!this.state.buttonLoading && <button type="submit" className="btn btn-pink" onClick={(e) => this.changePassword(e)}>Lưu</button>}
                                    {this.state.buttonLoading && <button type="submit" className="btn btn-pink"><i class="fa fa-spinner fa-spin"></i></button>}
                                </div>
                            </form>
                        </div>}
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