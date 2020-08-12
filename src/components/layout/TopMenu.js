import React from "react";
import "../../css/TopMenu.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import Avatar from "../common/Avatar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { withRouter } from "react-router";
import queryString from "query-string";
import {apiURL} from "../../config/Constant";
class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isMenuOpen: false,
      categories: [],
      categoryId: "",
      categoryName: "",
      searchText: "",
      avatar: "",
      email: "",
      fullName: "",
    };
    this.wrapperRef = React.createRef();
    this.avatarRef = React.createRef();
    this.categoryRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const { user } = this.props.auth;
    if (isEmpty(user)) {
      axios
        .get(`${apiURL}/home/category`)
        .then((res) => {
          this.setState({
            categories: res.data.data.categorys,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .all([
          axios.get(`${apiURL}/users`),
          axios.get(`${apiURL}/home/category`),
        ])
        .then(
          axios.spread((...res) => {
            console.log(res[0]);
            this.setState({
              avatar: res[0].data.freshUser.avatar,
              email: res[0].data.freshUser.email,
              fullName: res[0].data.freshUser.fullName,
              categories: res[1].data.data.categorys,
            });
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && this.wrapperRef.current) {
      if (
        !this.wrapperRef.current.contains(event.target) &&
        !this.avatarRef.current.contains(event.target)
      ) {
        this.setState({
          isOpen: false,
        });
      }
    }
    if (this.categoryRef && this.categoryRef.current) {
      if (!this.categoryRef.current.contains(event.target)) {
        this.setState({
          isMenuOpen: false,
        });
      }
    }
  }

  onCategoryClick = (e, id, name) => {
    this.setState({
      categoryId: id,
      categoryName: name,
      isMenuOpen: false,
    });
    let path = "/search?categoryid=" + id;
    if (this.state.searchText)
      path = path.concat("&content=" + this.state.searchText);
    this.props.history.push(path);
  };

  onAllClick = (e) => {
    this.setState({
      categoryId: "",
      categoryName: "Tất cả",
      isMenuOpen: false,
    });
    let path = "/search";
    if (this.state.searchText)
      path = path.concat("?content=" + this.state.searchText);
    this.props.history.push(path);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      let params = queryString.parse(this.props.location.search);
      if (params.categoryid) {
        let cate = this.state.categories.find(
          (x) => x._id === params.categoryid
        );
        if (cate) {
          this.setState({
            categoryName: cate.title,
            categoryId: cate._id,
          });
        }
      } else {
        if (this.props.location.pathname !== "/search")
          this.setState({
            categoryName: "Danh mục",
            categoryId: "",
            searchText: "",
          });
      }
    } else {
      const { user } = this.props.auth;
      if (!isEmpty(user)) {
        if (this.props.location.pathname === "/account_settings") {
          axios
            .get(`${apiURL}/users`)
            .then((res) => {
              if (prevState.avatar !== res.data.freshUser.avatar) {
                this.setState({
                  avatar: res.data.freshUser.avatar,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let link = "/search";
    if (this.state.categoryId) {
      link = link.concat("?categoryid=" + this.state.categoryId);
    }
    if (this.state.searchText) {
      if (this.state.categoryId) {
        link = link.concat("&content=" + this.state.searchText);
      } else {
        link = link.concat("?content=" + this.state.searchText);
      }
    }
    this.props.history.push(link);
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({
      isOpen: false,
    });
    // window.location.href = "/";
    toast.success("Logout successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  toggleMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  render() {
    const user_avatar = this.state.avatar;
    const { user } = this.props.auth;
    let fixedDiv, avatar, categoryDiv, dropdownText;
    if (!this.state.categoryName) {
      dropdownText = "Danh mục";
    } else {
      dropdownText = this.state.categoryName;
    }
    if (isEmpty(user)) {
      avatar = (
        <div>
          <Link to="/register"><div className="btn btn-topmenu-register">Đăng kí</div></Link>
          <Link to="/login"><div className="btn btn-topmenu-login">Đăng nhập</div></Link>         
          {/* <Avatar
          className="topmenu-margin-auto topmenu-bg topmenu-unauth-ava"
          signature="nav_avatar"
          image={"/images/user_white.png"}
          size={50}
          tooltip={false}
        /> */}
        <img className="topmenu-unauth-ava" width={33} height={50} alt="" src="/images/chef-icon-navbar.png"/>
        </div>

      );

      if (this.state.isOpen) {
        fixedDiv = (
          <div ref={this.wrapperRef} className="topmenu-abs-div">
            <div className="topmenu-link-con"><Link to="/login"><div className="btn-abs-login">Đăng nhập</div></Link></div>
            <div className="topmenu-link-con"><Link to="/register"><div className="btn-abs-register">Đăng kí</div></Link></div>
          </div>
        );
      } else {
        fixedDiv = (
          <div ref={this.wrapperRef} className="topmenu-abs-div"></div>
        );
      }
    } else {
      avatar = (
        <Avatar
          className="topmenu-margin-auto"
          signature="nav_avatar"
          image={user_avatar}
          size={50}
          tooltip={false}
        />
      );

      if (this.state.isOpen) {
        fixedDiv = (
          <div ref={this.wrapperRef} className="topmenu-abs-div">
            <div className="topmenu-abs-con">
              <Link to={"/user_profile/" + this.props.auth.user.id}>
                <div className="topmenu-userp-link" onClick={this.toggleOpen}>
                  <Avatar
                    className="topmenu-abs-ava"
                    signature="nav_avatar"
                    image={user_avatar}
                    size={60}
                    tooltip={false}
                  />
                  <div className="topmenu-abs-text">
                    <div className="topmenu-abs-fullname">
                      {this.state.fullName}
                    </div>
                    <div className="topmenu-abs-email">{this.state.email}</div>
                  </div>
                </div>
              </Link>

              <div className="topmenu-to-setting">
                <Link to="/account_settings">
                  <div onClick={this.toggleOpen} className="btn topmenu-btn">Trang cá nhân</div>
                </Link>
              </div>
            </div>

            <div className="topmenu-logout-link" onClick={this.onLogoutClick}>
              <i className="fas fa-power-off"></i>&nbsp;&nbsp;Đăng xuất
            </div>
          </div>
        );
      } else {
        fixedDiv = (
          <div ref={this.wrapperRef} className="topmenu-abs-div"></div>
        );
      }
    }
    if (this.state.isMenuOpen) {
      categoryDiv = (
        <div ref={this.categoryRef} className="topmenu-category-abs container">
          <div className="arrow-up"></div>
          <div className="row" style={{ paddingBottom: "5px" }}>
            <div
              onClick={(e) => this.onAllClick(e)}
              className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-12 top-cate-item cate-item-border"
            >
              Tất cả
            </div>
            {this.state.categories.map((x, index) =>
              (index + 2) % 4 !== 0 ? (
                <div
                  key={index}
                  onClick={(e) => this.onCategoryClick(e, x._id, x.title)}
                  className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-12 top-cate-item cate-item-border"
                >
                  {x.title}
                </div>
              ) : (
                <div
                  key={index}
                  onClick={(e) => this.onCategoryClick(e, x._id, x.title)}
                  className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-12 top-cate-item"
                >
                  {x.title}
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    return (
      <nav className="head-navbar">
        <div className="container topmenu-container">
          <div className="topmenu-logo-container">
            <Link to="/">
              <img width={64} height={50} src="/images/Logo.png" alt="" />
            </Link>
          </div>
          <div className="form-search-container">
            <form
              className="form-inline"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <div className="input-group topmenu-category-dropdown">
                <div
                  className="input-group-prepend"
                  onClick={() => this.toggleMenuOpen()}
                >
                  {!this.state.isMenuOpen && (
                    <span className="input-group-category">
                      <span className="topmenu-dropdown-txt">
                        {dropdownText}&nbsp;
                      </span>
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  )}
                  {this.state.isMenuOpen && (
                    <span className="input-group-category">
                      <span className="topmenu-dropdown-txt">
                        {dropdownText}&nbsp;
                      </span>
                      <i className="fas fa-chevron-up"></i>
                    </span>
                  )}
                </div>
                <input
                  autoComplete="off"
                  className="form-control topmenu-placeholder"
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={this.onChange}
                  id="searchText"
                  value={this.state.searchText}
                />
                <div
                  className="input-group-prepend"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <span className="input-group-text">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
            {categoryDiv}
          </div>
          <div className="topmenu-add-container">
            <Link className="nav-button-container" to="/create">
              <button className="nav-add">
                Thêm món mới
                <img
                  className="topmenu-plus"
                  alt=""
                  src="/images/Plus_Icon.png"
                />
              </button>
              <img
                className="nav-add-without-txt"
                src="/images/nav-bar-add.png"
                alt=""
              />
            </Link>
          </div>
          <div className="topmenu-avatar">
            <div ref={this.avatarRef}
            onClick={this.toggleOpen}>{avatar}</div>
            {fixedDiv}
          </div>
        </div>
      </nav>
    );
  }
}

TopMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { logoutUser })(TopMenu));
