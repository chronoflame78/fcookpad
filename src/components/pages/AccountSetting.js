import React, { Component } from "react";
import axios from "axios";
import Footer from "../layout/Footer";
import "../../css/AccountSetting.css";
import { NavLink } from "react-router-dom";
import "../../css/Section.css";
import Loader from "../common/Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { apiURL } from "../../config/Constant";
import { removeStorage } from "../../utils/removeStorage";
import { MALE, FEMALE, OTHERS } from "../../config/Constant";
import { getFormattedViews } from "../../utils/getFormat";
const isEmpty = require("is-empty");

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userInfoUpdate: {
        firstName: "",
        lastName: "",
        fullName: "",
        avatar: "",
        email: "",
        birthday: new Date(),
        gender: "Khác",
        description: "",
        posts: 0,
        views: 0,
        likes: 0,
        createAt: "",
      },
      posts: [],
      nextPage: 3,
      loading: false,
      errors: {},
      errorsChangePassword: {},
      buttonLoading: false,
      buttonLoadMore: false,
      file: "",
      imagePreviewUrl: "",
      tab: 1,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      totalPost: 0,
      isOpen: false,
    };
    this.genderRef = React.createRef();
    this.showMore = this.showMore.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  getFormattedDate(date) {
    var today = new Date(date);
    var month = "";
    if (today.getMonth() < 9) {
      month = "0" + (today.getMonth() + 1);
    } else {
      month = today.getMonth() + 1;
    }
    return (
      today.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
      "/" +
      month +
      "/" +
      today.getFullYear()
    );
  }

  onDateChange = (date) => {
    this.setState({
      userInfoUpdate: { ...this.state.userInfoUpdate, birthday: date },
    });
  };

  onFirstNameChange = (e) => {
    this.setState({
      userInfoUpdate: {
        ...this.state.userInfoUpdate,
        firstName: e.target.value,
      },
    });
  };

  onLastNameChange = (e) => {
    this.setState({
      userInfoUpdate: {
        ...this.state.userInfoUpdate,
        lastName: e.target.value,
      },
    });
  };

  onGenderChange = (e, gender) => {
    this.setState({
      userInfoUpdate: { ...this.state.userInfoUpdate, gender: gender },
      isOpen: false,
    });
  };

  onDescriptionChange = (e) => {
    this.setState({
      userInfoUpdate: {
        ...this.state.userInfoUpdate,
        description: e.target.value,
      },
    });
  };

  changeTab = (e, index) => {
    this.setState({
      tab: index,
    });
  };

  handleEditClick = (e, postId, step, status) => {
    if (step === 1 && status === "Draft") {
      localStorage.setItem("returnURL", "account_setting");
      this.props.history.push("/step2/" + postId);
    } else if (step === 2 && status === "Draft") {
      localStorage.setItem("returnURL", "account_setting");
      localStorage.setItem("doneStep2", true);
      this.props.history.push("/step3/" + postId);
    } else {
      localStorage.setItem("returnURL", "account_setting");
      localStorage.setItem("action", "update");
      localStorage.setItem("doneStep2", true);
      this.props.history.push("/step1/" + postId);
    }
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleDeleteClick = (e, postId) => {
    swal({
      title: "Do you really want to delete post?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`${apiURL}/recipes/${postId}/destroy`)
          .then((res) => {
            toast.success("Delete successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            axios
              .all([
                axios.get(`${apiURL}/users/${this.props.auth.user.id}`),
                axios.get(`${apiURL}/users/recipes?page=1&limit=6`),
              ])
              .then(
                axios.spread((...resp) => {
                  this.setState({
                    userInfo: resp[0].data.user,
                    posts: resp[1].data.allRecipes,
                    totalPost: resp[1].data.total,
                  });
                })
              )
              .catch((errs) => {

              });
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      } else {

      }
    });
  };

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        file: "",
        imagePreviewUrl: "",
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let formData = new FormData();
    formData.append("firstName", this.state.userInfoUpdate.firstName);
    formData.append("lastName", this.state.userInfoUpdate.lastName);
    formData.append("birthday", this.state.userInfoUpdate.birthday);
    formData.append("description", this.state.userInfoUpdate.description);
    formData.append("gender", this.state.userInfoUpdate.gender);
    if (this.state.file) {
      formData.append("avatar", this.state.file);
    }

    axios
      .post(`${apiURL}/users`, formData)
      .then((res) => {
        toast.success("Save successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        axios
          .get(`${apiURL}/users/${this.props.auth.user.id}`)
          .then((resp) => {
            this.setState({
              userInfo: resp.data.user,
              errors: {},
              buttonLoading: false,
            });
          })
          .catch((errs) => {});
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          buttonLoading: false,
        });
      });
  };

  changePassword = (e) => {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let data = {
      passwordCurrent: this.state.currentPassword,
      password: this.state.newPassword,
      passwordConfirm: this.state.confirmPassword,
    };
    axios
      .post(`${apiURL}/users/update_password`, data)
      .then((res) => {
        toast.success("Thay đổi mật khẩu thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.setState({
          errorsChangePassword: {},
          buttonLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          errorsChangePassword: err.response.data,
          buttonLoading: false,
        });
      });
  };

  handleClickOutside(event) {
    if (this.genderRef && this.genderRef.current) {
      if (!this.genderRef.current.contains(event.target)) {
        this.setState({
          isOpen: false,
        });
      }
    }
  }

  showMore(nextPage) {
    this.setState({
      buttonLoadMore: true,
    });
    axios
      .get(`${apiURL}/users/recipes?page=${nextPage}&limit=3`)
      .then((res) => {
        const arr = this.state.posts;
        arr.push(...res.data.allRecipes);
        this.setState({
          nextPage: this.state.nextPage + 1,
          posts: arr,
          buttonLoadMore: false,
        });
      })
      .catch((err) => {
        this.setState({
          buttonLoadMore: false,
        });
      });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.mounted = true;
    removeStorage();
    this.setState({
      loading: true,
    });
    axios
      .all([
        axios.get(`${apiURL}/users/${this.props.auth.user.id}`),
        axios.get(`${apiURL}/users/recipes?page=1&limit=6`),
      ])
      .then(
        axios.spread((...res) => {
          if (this.mounted) {
            this.setState({
              userInfo: res[0].data.user,
              userInfoUpdate: res[0].data.user,
              posts: res[1].data.allRecipes,
              totalPost: res[1].data.total,
              loading: false,
            });
          }
        })
      )
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
    if (this.props.location.state) {
      var { editSuccess, postTab } = this.props.location.state;
      if (editSuccess === true) {
        toast.success("Edit successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (postTab) {
          this.setState({
            tab: postTab,
          });
        }
        this.props.history.replace("/account_settings", null);
      } else {
        if (postTab) {
          this.setState({
            tab: postTab,
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleMenuOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    let genderDiv, dropdownText;
    if (this.state.loading) return <Loader />;
    var tab1 = "asetting-tab-active";
    var tab2 = "asetting-tab";
    var tab3 = "asetting-tab";
    if (this.state.tab === 1) {
      tab1 = "asetting-tab-active";
      tab2 = "asetting-tab";
      tab3 = "asetting-tab";
    } else if (this.state.tab === 2) {
      tab1 = "asetting-tab";
      tab2 = "asetting-tab-active";
      tab3 = "asetting-tab";
    } else if (this.state.tab === 3) {
      tab1 = "asetting-tab";
      tab2 = "asetting-tab";
      tab3 = "asetting-tab-active";
    }


    if (!this.state.userInfoUpdate.gender) {
      dropdownText = "Khác";
    } else {
      dropdownText = this.state.userInfoUpdate.gender;
    }

    if (this.state.isOpen) {
      genderDiv = (
        <div ref={this.genderRef} className="asetting-gender-abs">
          <div className="row asetting-gender-container">
            <div
              onClick={(e) => this.onGenderChange(e, MALE)}
              className="col-12 asetting-gender"
            >
              Nam
            </div>
            <div
              onClick={(e) => this.onGenderChange(e, FEMALE)}
              className="col-12 asetting-gender"
            >
              Nữ
            </div>
            <div
              onClick={(e) => this.onGenderChange(e, OTHERS)}
              className="col-12 asetting-gender"
            >
              Khác
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="asetting-container">
        <div className="container asetting-container-child">
          <div className="row asetting-row">
            <div className="col-md-4 asetting-info-container">
              {!this.state.imagePreviewUrl && (
                <div
                  className="asetting-avatar-cover asetting-avatar"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                >
                  <img 
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%"
                  }}
                  alt=""
                   src={this.state.userInfo.avatar}/>
                </div>
              )}
              {this.state.imagePreviewUrl && (
                <div
                  className="asetting-avatar-cover asetting-avatar"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                >
                  <img 
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%"
                  }}
                  alt=""
                  src={this.state.imagePreviewUrl}/>
                </div>
              )}
              <div className="asetting-name">
                {this.state.userInfo.fullName}
              </div>
              <div className="asetting-smalltext">
                <i className="fas fa-venus-mars"></i> Giới tính:{" "}
                {this.state.userInfo.gender}
              </div>
              <div className="asetting-smalltext">
                <i className="far fa-calendar-alt"></i> Ngày sinh:{" "}
                {this.getFormattedDate(this.state.userInfo.birthday)}
              </div>
              <div className="asetting-num">
                <div className="asetting-left">
                  <i className="far fa-file-alt asetting-icon"></i>Bài viết:
                </div>
                <div className="asetting-right">
                  {this.state.userInfo.recipes}
                </div>
              </div>
              <div className="asetting-views">
                <div className="asetting-left">
                  <i className="far fa-eye asetting-icon"></i>Lượt xem:
                </div>{" "}
                <div className="asetting-right">
                  {getFormattedViews(this.state.userInfo.views)}
                </div>
              </div>
              <div className="asetting-likes">
                <div className="asetting-left">
                  <i className="far fa-heart asetting-icon"></i>Lượt thích:
                </div>{" "}
                <div className="asetting-right">
                  {this.state.userInfo.likes}
                </div>
              </div>
              <div className="asetting-smalltext-end">
                Gia nhập kể từ ngày:{" "}
                {this.getFormattedDate(this.state.userInfo.createAt)}
              </div>
              <div className="asetting-line"></div>
              <div
                className={tab1}
                onClick={(e, index) => this.changeTab(e, 1)}
              >
                Thông tin tài khoản
              </div>
              <div
                className={tab2}
                onClick={(e, index) => this.changeTab(e, 2)}
              >
                Công thức của tôi
              </div>
              <div
                className={tab3}
                onClick={(e, index) => this.changeTab(e, 3)}
              >
                Thay đổi mật khẩu
              </div>
              <div className="asetting-line asetting-line-display"></div>
            </div>
            {this.state.tab === 1 && (
              <div className="col-md-8 asetting-form-container">
                <div className="asetting-title">Thông tin tài khoản</div>
                <form
                  className="asetting-form"
                  onSubmit={(e) => this.handleSubmit(e)}
                >
                  <div className="form-group asetting-form-group asetting-form-position">
                    <input
                      readOnly
                      autoComplete="off"
                      maxLength="100"
                      id="email"
                      value={this.state.userInfoUpdate.email}
                      type="text"
                      className="form-control asetting-input-email"
                      placeholder=" "
                    />
                    <label className="asetting-label-email" htmlFor="email">
                      Email
                    </label>
                  </div>
                  <div className="form-group asetting-form-group asetting-form-position">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={this.onFirstNameChange}
                      id="firstName"
                      value={this.state.userInfoUpdate.firstName}
                      type="text"
                      className="form-control asetting-input-name"
                      placeholder=" "
                    />
                    <label className="asetting-label-name" htmlFor="firstName">
                      Họ
                    </label>
                  </div>
                  <div className="form-group asetting-form-group asetting-form-position">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={this.onLastNameChange}
                      id="lastName"
                      value={this.state.userInfoUpdate.lastName}
                      type="text"
                      className="form-control asetting-input-name"
                      placeholder=" "
                    />
                    <label className="asetting-label-name" htmlFor="lastName">
                      Tên
                    </label>
                  </div>
                  <div className="form-group asetting-dropdown">
                    <label
                      className="asetting-label-gender"
                      htmlFor="dropdown_value"
                    >
                      Giới tính
                    </label>
                    <div className="form-group create-dropdown">
                      <div className="asetting-select">
                        <div
                          className="input-group-prepend"
                          onClick={() => this.toggleMenuOpen()}
                        >
                          {!this.state.isOpen && (
                            <div className="asetting-gender-group">
                              <span className="create-dropdown-txt">
                                {dropdownText}&nbsp;
                              </span>
                              <i className="fas fa-chevron-down down-arrow"></i>
                            </div>
                          )}
                          {this.state.isOpen && (
                            <div className="asetting-gender-group">
                              <span className="create-dropdown-pink-txt">
                                {dropdownText}&nbsp;
                              </span>
                              <i className="fas fa-chevron-up up-arrow"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="gender-dropdown-container">
                        {genderDiv}
                      </div>
                    </div>
                  </div>
                  <div className="form-group asetting-form-group">
                    <label className="asetting-label-date" htmlFor="title">
                      Ngày sinh
                    </label>
                    <div className="asetting-datepicker row">
                      <DatePicker
                        onChange={this.onDateChange}
                        selected={new Date(this.state.userInfoUpdate.birthday)}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        id="datepicker-birthday"
                        className="form-control asetting-date-text"
                        wrapperClassName="asetting-datepicker-wrapper col-11"
                        popperClassName="asetting-datepicker-popper"
                      ></DatePicker>
                      <div className="date-picker-icon col-1">
                        <label htmlFor="datepicker-birthday">
                          <i class="far fa-calendar-alt"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group asetting-form-group asetting-description-form-group">
                    <textarea
                      id="description"
                      value={this.state.userInfoUpdate.description}
                      style={{ resize: "none" }}
                      maxLength="1000"
                      onChange={this.onDescriptionChange}
                      rows="3"
                      placeholder=" "
                      className="form-control asetting-description-input"
                      spellCheck="false"
                    />
                    <label
                      htmlFor="description"
                      className="asetting-description-label"
                    >
                      Mô tả về bản thân
                    </label>
                  </div>
                  <div className="form-group asetting-form-group">
                    <label
                      className="asetting-label-description"
                      htmlFor="upload_image"
                    >
                      Thay đổi ảnh đại diện
                    </label>
                    <input
                      className="asetting-image-upload"
                      accept="image/*"
                      id="upload_image"
                      type="file"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                  </div>

                  {!isEmpty(this.state.errors) && (
                    <div className="alert alert-danger">
                      {this.state.errors.message}
                    </div>
                  )}
                  <div className="asetting-button-container">
                    {!this.state.buttonLoading && (
                      <button
                        type="submit"
                        className="btn btn-pink"
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Lưu
                      </button>
                    )}
                    {this.state.buttonLoading && (
                      <button type="submit" className="btn btn-pink">
                        <i className="fa fa-spinner fa-spin"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
            {this.state.tab === 2 && (
              <div className="col-md-8 asetting-form-container">
                <div className="asetting-title-tab2">Công thức của tôi</div>
                <div className="row" style={{ padding: "0 15px" }}>
                  {isEmpty(this.state.posts) && (
                    <div
                      style={{
                        height: "100px",
                        paddingLeft: "15px",
                        paddingTop: "15px",
                      }}
                    >
                      Bạn chưa có bài đăng nào
                    </div>
                  )}
                  {!isEmpty(this.state.posts) &&
                    this.state.posts.map((x, index) => (
                      <div
                        key={index}
                        className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 py-4"
                      >
                        <div className="asetting-image-container">
                          <div className="item-cover">
                            <span
                              className="asetting-icon-edit"
                              onClick={(e) =>
                                this.handleEditClick(e, x._id, x.step, x.status)
                              }
                            >
                              <i className="far fa-edit" />
                            </span>
                            <span className="asetting-icon-line"></span>
                            <span
                              className="asetting-icon-delete"
                              onClick={(e) => this.handleDeleteClick(e, x._id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </span>
                          </div>
                          <div
                            className="asetting-image-holder"
                            style={{
                              backgroundImage: "url(" + x.images[0] + ")",
                            }}
                          ></div>
                        </div>

                        <div className="asetting-item-title">
                          <NavLink
                            to={"/posts/" + x._id}
                            style={{ textDecoration: "none" }}
                          >
                            {x.title}
                          </NavLink>
                        </div>
                        {x.status === "Approved" && (
                          <div className="asetting-status-container">
                            <div className="asetting-label">Trạng thái:</div>
                            <div className="asetting-status-approved">
                              Đã thông qua
                            </div>
                          </div>
                        )}
                        {x.status === "Draft" && (
                          <div className="asetting-status-container">
                            <div className="asetting-label">Trạng thái:</div>
                            <div className="asetting-status-draft">Nháp</div>
                          </div>
                        )}
                        {x.status === "Rejected" && (
                          <div className="asetting-status-container">
                            <div className="asetting-label">Trạng thái:</div>
                            <div className="asetting-status-rejected">
                              Đã từ chối
                            </div>
                          </div>
                        )}
                        {x.status === "Pending" && (
                          <div className="asetting-status-container">
                            <div className="asetting-label">Trạng thái:</div>
                            <div className="asetting-status-pending">
                              Đang duyệt
                            </div>
                          </div>
                        )}
                        <div className="asetting-view-container">
                          <div className="asetting-label">Lượt xem:</div>
                          <div className="asetting-view">{x.views}</div>
                        </div>
                      </div>
                    ))}
                </div>
                {this.state.posts &&
                  this.state.posts.length < this.state.totalPost && (
                    <div
                      className="row asetting-see-more"
                      style={{ marginLeft: "0px", marginRight: "0px" }}
                    >
                      {!this.state.buttonLoadMore && (
                        <button
                          onClick={() => this.showMore(this.state.nextPage)}
                          type="submit"
                          className="btn btn-more-pink"
                        >
                          XEM THÊM
                        </button>
                      )}
                      {this.state.buttonLoadMore && (
                        <button type="submit" className="btn btn-more-pink">
                          <i className="fa fa-spinner fa-spin"></i>
                        </button>
                      )}
                    </div>
                  )}
              </div>
            )}
            {this.state.tab === 3 && (
              <div className="col-md-8 asetting-form-container">
                <div className="asetting-title">Thay đổi mật khẩu</div>
                <form
                  className="asetting-form"
                  onSubmit={(e) => this.changePassword(e)}
                >
                  <div className="form-group asetting-form-group">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={this.onChange}
                      id="currentPassword"
                      value={this.state.currentPassword}
                      type="password"
                      className="form-control asetting-input-email"
                      placeholder=" "
                    />
                    <label
                      className="asetting-label-email"
                      htmlFor="currentPassword"
                    >
                      Mật khẩu hiện tại
                    </label>
                  </div>
                  <div className="form-group asetting-form-group">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={this.onChange}
                      id="newPassword"
                      value={this.state.newPassword}
                      type="password"
                      className="form-control asetting-input-email"
                      placeholder=" "
                    />
                    <label
                      className="asetting-label-email"
                      htmlFor="newPassword"
                    >
                      Mật khẩu mới
                    </label>
                  </div>
                  <div
                    className="form-group asetting-form-group"
                    style={{ marginBottom: "0px" }}
                  >
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={this.onChange}
                      id="confirmPassword"
                      value={this.state.confirmPassword}
                      type="password"
                      className="form-control asetting-input-email"
                      placeholder=" "
                    />
                    <label
                      className="asetting-label-email"
                      htmlFor="confirmPassword"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                  </div>
                  {!isEmpty(this.state.errorsChangePassword) && (
                    <div className="alert alert-danger">
                      {this.state.errorsChangePassword.message}
                    </div>
                  )}
                  <div
                    className="asetting-button-container"
                    style={{ marginTop: "20px" }}
                  >
                    {!this.state.buttonLoading && (
                      <button
                        type="submit"
                        className="btn btn-pink"
                        onClick={(e) => this.changePassword(e)}
                      >
                        Lưu
                      </button>
                    )}
                    {this.state.buttonLoading && (
                      <button type="submit" className="btn btn-pink">
                        <i class="fa fa-spinner fa-spin"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

AccountSetting.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AccountSetting);
