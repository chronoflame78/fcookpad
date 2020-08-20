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
import { apiURL } from "../../config/Constant";
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
      selectedIndex: "",
      allSelected: "",
    };

    this.categoryRefs = [];

    this.wrapperRef = React.createRef();
    this.avatarRef = React.createRef();
    this.categoryRef = React.createRef();
    this.selectedRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setRef = (ref) => {
    this.categoryRefs.push(ref);
  };

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

  onCategoryClick = (e, id, name, index) => {
    this.setState({
      categoryId: id,
      categoryName: name,
      isMenuOpen: false,
      selectedIndex: index,
    });


    let path = "/search?categoryid=" + id;
    if (this.state.searchText)
      path = path.concat("&content=" + this.state.searchText);
    this.props.history.push(path);
  };

  //handle event click on all
  onAllClick = (e) => {
    this.setState({
      categoryId: "",
      categoryName: "Tất cả",
      isMenuOpen: false,
      selectedIndex: "",
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
            selectedIndex: "",
            // allSelected: false
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
          <Link to="/register">
            <div className="btn btn-topmenu-register">Đăng kí</div>
          </Link>
          <Link to="/login">
            <div className="btn btn-topmenu-login">Đăng nhập</div>
          </Link>
          <img
            className="topmenu-unauth-ava"
            width={33}
            height={50}
            alt=""
            src="/images/chef-icon-navbar.png"
          />
        </div>
      );

      if (this.state.isOpen) {
        fixedDiv = (
          <div ref={this.wrapperRef} className="topmenu-abs-div">
            <div className="topmenu-link-con">
              <Link to="/login">
                <div className="btn-abs-login">Đăng nhập</div>
              </Link>
            </div>
            <div className="topmenu-link-con">
              <Link to="/register">
                <div className="btn-abs-register">Đăng kí</div>
              </Link>
            </div>
          </div>
        );
      } else {
        fixedDiv = (
          <div
            ref={this.wrapperRef}
            className="topmenu-abs-div"
            style={{ display: "none" }}
          ></div>
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
                  <div onClick={this.toggleOpen} className="btn topmenu-btn">
                    Trang cá nhân
                  </div>
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
          <div
            ref={this.wrapperRef}
            className="topmenu-abs-div"
            style={{ display: "none" }}
          ></div>
        );
      }
    }
    if (this.state.isMenuOpen) {
      categoryDiv = (
        <div ref={this.categoryRef} className="topmenu-category-abs container">
          <div className="arrow-up"></div>
          <div className="row topcate-row-con" style={{ paddingBottom: "5px" }}>
            <div
              className={
                "col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 top-cate-item cate-item-border "
              }
            >
              <div onClick={(e) => this.onAllClick(e)}>Tất cả</div>
            </div>

            {this.state.categories.map((x, index) =>
              (index + 2) % 4 !== 0 ? (
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 top-cate-item cate-item-border">
                  <div
                    key={index}
                    ref={this.setRef}
                    onClick={(e) =>
                      this.onCategoryClick(e, x._id, x.title, index)
                    }
                    className={
                      this.state.selectedIndex !== index
                        ? ""
                        : "border-bottom-selected"
                    }
                  >
                    {x.title}
                  </div>
                </div>
              ) : (
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 top-cate-item ">
                  <div
                    key={index}
                    ref={this.setRef}
                    onClick={(e) =>
                      this.onCategoryClick(e, x._id, x.title, index)
                    }
                    className={
                      this.state.selectedIndex !== index
                        ? ""
                        : "border-bottom-selected"
                    }
                  >
                    {x.title}
                  </div>
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
                {/* <img
                  className="topmenu-plus"
                  alt=""
                  src="/images/Plus_Icon.png"
                /> */}
                {/* <svg version="1.1" id="Capa_1" x="0px" y="0px"
	 viewBox="0 0 512 512" className="topmenu-plus-icon">
     <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
			v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
   </svg> */}
                <svg className="topmenu-plus-icon" viewBox="0 0 242.43 242.43">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <line
                        className="cls-1"
                        x1="121.21"
                        y1="15"
                        x2="121.21"
                        y2="227.43"
                      />
                      <line
                        className="cls-1"
                        x1="15"
                        y1="121.21"
                        x2="227.43"
                        y2="121.21"
                      />
                    </g>
                  </g>
                </svg>
              </button>
              <img
                className="nav-add-without-txt"
                src="/images/nav-bar-add.png"
                alt=""
              />
              {/* <div className="nav-add-without-txt">
              <svg className="topmenu-plus-icon-responsive" viewBox="0 0 242.43 242.43">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <line
                        class="cls-1"
                        x1="121.21"
                        y1="15"
                        x2="121.21"
                        y2="227.43"
                      />
                      <line
                        class="cls-1"
                        x1="15"
                        y1="121.21"
                        x2="227.43"
                        y2="121.21"
                      />
                    </g>
                  </g>
                </svg>
              </div> */}
            </Link>
          </div>
          <div className="topmenu-avatar">
            <div ref={this.avatarRef} onClick={this.toggleOpen}>
              {avatar}
            </div>
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
