import React, { Component } from "react";
import '../../css/Section.css';
import { NavLink } from "react-router-dom";

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
        return today.getDate() + "/" + month + "/" + today.getFullYear();
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
                            <div className="section-author-name3">{x.author.name}</div>
                            <div className="section-rating-date"><i className="fa fa-star" style={{fontSize: '14px'}} />
                                <i className="fa fa-star" style={{fontSize: '14px'}} />
                                <i className="fa fa-star" style={{fontSize: '14px'}} />
                                <i className="fa fa-star" style={{fontSize: '14px'}} />
                                <i className="fa fa-star" style={{fontSize: '14px'}} />
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