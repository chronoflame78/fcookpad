import React from "react";
import '../../css/TopMenu2.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import Avatar from "../common/Avatar";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

class TopMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            pathName: window.location.pathname
        }
        this.wrapperRef = React.createRef();
        this.avatarRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if(this.wrapperRef && this.wrapperRef.current){
            if (!this.wrapperRef.current.contains(event.target) && !this.avatarRef.current.contains(event.target)) {
                this.setState({
                    isOpen: false
                })
            }
        }   
    }

    state = {
        isOpen: false
    };
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
    render() {
        const user_avatar = localStorage.getItem("userAvatar");
        const { user } = this.props.auth;
        let fixedDiv, avatar;
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
                    <Link to={"/user_profile/"+this.props.auth.user.id}><div className="topmenu-link">User Profile</div> </Link> 
                    <Link to="/account_settings"><div className="topmenu-link">Account Setting</div></Link>           
                </div>
            } else {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div"></div>
            }
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
                        <div className="input-group">
                            <input className="form-control topmenu-placeholder" type="text" placeholder="Tìm kiếm" />
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-search" /></span>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="topmenu-add-container">
                    <Link className="nav-button-container" to="/create">
                        {/* <img className="nav-add" src="/images/nav_add_button.png" alt="" /> */}
                        <button className="nav-add">Thêm món mới<img className="topmenu-plus" alt="" src="/images/Plus_Icon.png"/></button>
                        <img className="nav-add-without-txt" src="/images/nav-bar-add.png" alt="" />
                    </Link>
                </div>
                <div className="topmenu-avatar" ref={this.avatarRef} onClick={this.toggleOpen} >
                    {avatar}
                    {fixedDiv}
                </div>
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