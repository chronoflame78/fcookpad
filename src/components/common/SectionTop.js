import React, { Component } from "react";
import "../../css/Section.css";
import { NavLink } from "react-router-dom";
import { getFormattedDate, getFormattedViews } from "../../utils/GetFormat";
const isEmpty = require("is-empty");

class SectionTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      itemsToShow: 4,
    };
  }

  render() {
    var topFourPosts = [];
    if (this.props.posts.length < 4) {
      topFourPosts = this.props.posts;
    } else {
      topFourPosts = this.props.posts.slice(0, this.state.itemsToShow);
    }
    return (
      <div className="container container-max-custom">
        <div className="row section-title3">{this.props.sectionName}</div>
        <div className="row">
          {isEmpty(this.props.posts) && (
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
          {topFourPosts &&
            topFourPosts.map((x, index) => (
              <div
                key={index}
                className="col-6 col-sm-6 col-md-6 col-lg-4 col-12 food-item"
              >
                  <NavLink
                    to={"/posts/" + x._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="section-image-container">
                      <p className="item-cover">
                        {!x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likePost(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="far fa-heart like-icon" />
                          </span>
                        )}
                        {x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likePost(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="fas fa-heart like-icon" />
                          </span>
                        )}
                      </p>
                      <div
                        className="section-image-holder"
                        style={{ backgroundImage: "url(" + x.images[0] + ")" }}
                      ></div>
                    </div>
                  </NavLink>
                  <div className="section-item-title">
                    <NavLink to={"/posts/" + x._id}>{x.title}</NavLink>
                  </div>
                  <div className="section-author-name">
                    <NavLink to={"/user_profile/" + x.author._id}>
                      {x.author.fullName}
                    </NavLink>
                  </div>
                  <div className="section-rating-date">
                    <i className="far fa-eye" /> {getFormattedViews(x.views)}
                    <span
                      className="section-item-date"
                      style={{ paddingTop: "2px" }}
                    >
                      {getFormattedDate(x.datetime)}
                    </span>
                  </div>
                </div>
            ))}
        </div>
      </div>
    );
  }
}

export default SectionTop;
