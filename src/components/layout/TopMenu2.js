import React from "react";
import '../../css/TopMenu2.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import Avatar from "../common/Avatar";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

class TopMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathName: window.location.pathname,
            isOpen: false,
            isMenuOpen: false,
            categories: [],
            categoryId: '',
            categoryName: ''
        }
        this.wrapperRef = React.createRef();
        this.avatarRef = React.createRef();
        this.categoryRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        axios.get("http://178.128.83.129:3000/api/home/category")
            .then(res => {
                this.setState({
                    categories: res.data.data.categorys
                })
            })
            .catch()
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && this.wrapperRef.current) {
            if (!this.wrapperRef.current.contains(event.target) && !this.avatarRef.current.contains(event.target)) {
                this.setState({
                    isOpen: false
                })
            }
        }
        if (this.categoryRef && this.categoryRef.current) {
            if (!this.categoryRef.current.contains(event.target)) {
                this.setState({
                    isMenuOpen: false
                })
            }
        }
    }

    onCategoryClick = (e, id, name) => {
        this.setState({
            categoryId: id,
            categoryName: name,
            isMenuOpen: false
        })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.setState({
            isOpen: false
        })
        toast.success('Logout successfully!', { position: toast.POSITION.TOP_RIGHT });
        // window.location.href = "/";
    };
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    toggleMenuOpen = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

    render() {
        const user_avatar = localStorage.getItem("userAvatar");
        const { user } = this.props.auth;
        let fixedDiv, avatar, categoryDiv, dropdownText;
        if (!this.state.categoryName) {
            dropdownText = 'Danh mục'
        }
        else {
            dropdownText = this.state.categoryName
        }
        if (isEmpty(user)) {
            avatar = <Avatar className="topmenu-margin-auto topmenu-bg" signature="nav_avatar" image={"/images/user_white.png"} size={50} tooltip={false} />;

            if (this.state.isOpen) {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <Link to="/login"><div className="topmenu-link">Login</div></Link>
                    <Link to="/register"><div className="topmenu-link">Register</div></Link>
                </div>
            } else {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div"></div>
            }
        } else {
            avatar = <Avatar className="topmenu-margin-auto" signature="nav_avatar" image={user_avatar} size={50} tooltip={false} />

            if (this.state.isOpen) {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <div className="topmenu-link" onClick={this.onLogoutClick}>Logout</div>
                    <Link to={"/user_profile/" + this.props.auth.user.id}><div className="topmenu-link">User Profile</div> </Link>
                    <Link to="/account_settings"><div className="topmenu-link">Account Setting</div></Link>
                </div>
            } else {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div"></div>
            }
        }
        if (this.state.isMenuOpen) {
            categoryDiv = <div ref={this.categoryRef} className="topmenu-category-abs container">
                <div class="arrow-up"></div>
                <div className="row">
                    {
                        this.state.categories.map((x, index) => (
                            <div key={index} onClick={(e) => this.onCategoryClick(e, x._id, x.title)} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 top-cate-item">
                                {x.title}
                            </div>
                        ))

                    }
                </div>
            </div>
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
                        <form className="form-inline">
                            <div className="input-group topmenu-category-dropdown">
                                <div className="input-group-prepend" onClick={() => this.toggleMenuOpen()}>
                                    {!this.state.isMenuOpen && <span className="input-group-category">{dropdownText}&nbsp;<i className="fas fa-chevron-down"></i></span>}
                                    {this.state.isMenuOpen && <span className="input-group-category">{dropdownText}&nbsp;<i className="fas fa-chevron-up"></i></span>}
                                </div>
                                <input className="form-control topmenu-placeholder" type="text" placeholder="Tìm kiếm" />
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search" /></span>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="topmenu-add-container">
                        <Link className="nav-button-container" to="/create">
                            <button className="nav-add">Thêm món mới<img className="topmenu-plus" alt="" src="/images/Plus_Icon.png" /></button>
                            <img className="nav-add-without-txt" src="/images/nav-bar-add.png" alt="" />
                        </Link>
                    </div>
                    <div className="topmenu-avatar" ref={this.avatarRef} onClick={this.toggleOpen} >
                        {avatar}
                        {fixedDiv}
                    </div>
                    {categoryDiv}
                </div>



            </nav>

        );
    }
}

TopMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(TopMenu);