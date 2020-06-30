import React from "react";
import '../../css/TopMenu2.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import isEmpty from "is-empty";
import Avatar from "../common/Avatar";
class TopMenu extends React.Component {

    constructor(props) {
        super(props);

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
        window.location.href = "/";
    };
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    render() {
        if (window.location.pathname === '/login' ||
            window.location.pathname === '/register' ||
            window.location.pathname === '/confirm' ||
            window.location.pathname.indexOf('/verify') !== -1) {
            return (<div></div>);
        }
        const { user } = this.props.auth;
        let fixedDiv, avatar;
        if (isEmpty(user)) {
            avatar = <Avatar className="topmenu-margin-auto topmenu-bg" signature="nav_avatar" image={"/images/user_white.png"} size={50} tooltip={false} />;

            if (this.state.isOpen) {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <div><a className="topmenu-link" href="/login">Login</a></div>
                    <div><a className="topmenu-link" href="/register">Register</a></div>
                </div>
            } else {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <div><a className="topmenu-hidden-link" href="/login">Login</a></div>
                    <div><a className="topmenu-hidden-link" href="/register">Register</a></div>
                </div>
            }
        } else {
            avatar = <Avatar className="topmenu-margin-auto" signature="nav_avatar" image={user.user_avatar} size={50} tooltip={false} />

            if (this.state.isOpen) {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <div><a className="topmenu-link" onClick={this.onLogoutClick}>Logout</a></div>
                    <div><a className="topmenu-link" href="/dashboard">Dashboard</a></div>
                </div>
            } else {
                fixedDiv = <div ref={this.wrapperRef} className="topmenu-abs-div">
                    <div><a className="topmenu-hidden-link" onClick={this.onLogoutClick}>Logout</a></div>
                    <div><a className="topmenu-hidden-link" href="/dashboard">Dashboard</a></div>
                </div>
            }
        }
        return (
            <nav className="head-navbar">
                <div className="topmenu-logo-container">
                    <a href="/">
                        <img width={64} height={50} src="/images/Logo.png" alt="" />
                    </a>
                </div>
                <div className="form-search-container">
                    <form className="form-inline">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Tìm kiếm" />
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-search" /></span>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="topmenu-add-container">
                    <a className="nav-button-container" href="/create">
                        <img className="nav-add" src="/images/nav_add_button.png" alt="" />
                        <img className="nav-add-without-txt" src="/images/nav-bar-add.png" alt="" />
                    </a>
                </div>
                <div className="topmenu-avatar" ref={this.avatarRef} onClick={this.toggleOpen} >
                    {avatar}
                    {fixedDiv}
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