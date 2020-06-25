import React from "react";
import '../../css/TopMenu2.css';

export default class TopMenu extends React.Component {

    state = {
        isOpen: false
      };
    
      toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <nav className="head-navbar">
                <div className="logo-container">
                    <a href="/">
                        <img className="nav-bar-logo" src="/images/Logo.png" alt="" />
                        <span className="sr-only">(current)</span></a>
                </div>
                <div className="form-search-container">
                    <form className="form-inline">
                        <input className="form-control col-md-8" type="text" placeholder="Search" />
                    </form>
                </div>
                <div className="list-container">
                    <ul className="nav-links">
                        <li>
                            <a className="nav-button-container" href="#">
                                <img className="nav-add" src="/images/nav_add_button.png" alt="" />
                                <img className="nav-add-without-txt" src="/images/nav-bar-add.png" alt="" />
                            </a>
                        </li>
                        <li>
                            <a className="nav-notification-container" href="#">
                                <img className="nav-bar-notification" src="/images/notification.png" alt="" />
                            </a>
                        </li>
                        <li className="nav-item dropdown" onClick={this.toggleOpen}>
                            <a className="nav-avatar-container nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="nav-bar-avatar" src="/images/avatar.jpg" alt="" />
                            </a>
                            <div className={menuClass} aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Dashboard</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
