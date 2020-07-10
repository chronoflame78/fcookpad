import React, { Component } from "react";
import '../../css/Section.css';
import { NavLink } from "react-router-dom";

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            itemsToShow: 4,
            loading: true
        }
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
        return today.getDate() + "/" + month + "/" + today.getFullYear();
    }

    showMore() {
        this.state.itemsToShow === 4 ? (
            this.setState({ itemsToShow: 8 })
        ) : (
                this.setState({ itemsToShow: 4 })
            )
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
                <div className="row section-title">{this.props.sectionName}</div>
                <div className="row">
                    {topFourPosts && topFourPosts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    <div className="item-cover" >
                                        <span className="section-item-view">{x.views} <i className="fa fa-eye" /></span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="section-item-title"><NavLink to={"/posts/" + x._id}>{x.title}</NavLink></div>
                            <div className="section-author-name"><NavLink to={"/userprofile/"+x.author._id}>{x.author.fullName}</NavLink></div>
                            <div className="section-rating-date"><i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="section-item-date" style={{paddingTop: '2px'}}> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={this.showMore} >
                    {this.state.itemsToShow === 4 && "XEM THÊM"}
                    {this.state.itemsToShow !== 4 && "THU GỌN"}
                </div>
            </div>

        );
    }
}

export default Section;