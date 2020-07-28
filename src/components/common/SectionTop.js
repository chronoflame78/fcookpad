import React, { Component } from "react";
import '../../css/Section.css';
import { NavLink } from "react-router-dom";
const isEmpty = require("is-empty");

class SectionTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            itemsToShow: 4
        }

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


    render() {
        var topFourPosts = [];
        if (this.props.posts.length < 4) {
            topFourPosts = this.props.posts;
        }
        else {
            topFourPosts = this.props.posts.slice(0, this.state.itemsToShow);
        }
        return (
            <div className="container container-max-custom">
                <div className="row section-title3">{this.props.sectionName}</div>
                <div className="row">
                    {isEmpty(this.props.posts) && <div style={{height:'100px', paddingLeft:'15px', paddingTop:'15px'}}>Bạn chưa có bài đăng nào</div>}
                    {topFourPosts && topFourPosts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container3" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    <div className="item-cover" >
                                        <span className="section-item-view">{x.views} <i className="fa fa-eye" /></span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="section-item-title3">{x.title}</div>
                            <div className="section-author-name3">{x.author.fullName}</div>
                            <div className="section-rating-date"><i className="fa fa-star" style={{fontSize: '12px'}} />
                                <i className="fa fa-star" style={{fontSize: '12px'}} />
                                <i className="fa fa-star" style={{fontSize: '12px'}} />
                                <i className="fa fa-star" style={{fontSize: '12px'}} />
                                <i className="fa fa-star" style={{fontSize: '12px'}} />
                                <span className="section-item-date3" style={{paddingTop: '2px'}}> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>

        );
    }
}

export default SectionTop;