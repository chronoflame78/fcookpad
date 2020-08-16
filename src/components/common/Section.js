import React, { Component } from "react";
import "../../css/Section.css";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../config/Constant";
import { getFormattedViews, getFormattedDate } from "../../utils/GetFormat.js";
import { connect } from "react-redux";
import swal from "sweetalert";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true,
    };
  }

  likePost = (e, id) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/recipes/${id}/like`)
      .then((res) => {
        console.log(res.data);
      })      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          swal("Bạn cần đăng nhập để like bài post này!", {
            buttons: {
              cancel: "Đóng",
              login: {
                text: "Đăng nhập ngay",
                value: "login",
              },
            },
          }).then((value) => {
            switch (value) {
              case "login":
                this.props.history.push("/login");
                break;
              default:
                break;
            }
          });
        }
      });
  };

  render() {
    return (
      <div
        key={this.props.index}
        className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 py-4 col-12"
      >
        <NavLink to={"/posts/" + this.props.postId} style={{ textDecoration: "none" }}>
          <div className="section-image-container">
            <div
              className="section-image-holder"
              style={{ backgroundImage: "url(" + this.props.image + ")" }}
            ></div>
            <p className="item-cover">
              {!this.props.isLiked && (
                <span
                  className="section-item-view"
                  onClick={(e) => this.likePost(e, this.props.postId)}
                >
                  {this.props.likes}
                  <i className="far fa-heart like-icon" />
                </span>
              )}
              {this.props.isLiked && (
                <span
                  className="section-item-view"
                  onClick={(e) => this.likePost(e, this.props.postId)}
                >
                  {this.props.likes}
                  <i className="fas fa-heart like-icon" />
                </span>
              )}
            </p>
          </div>
        </NavLink>
        <div className="section-item-title">
          <NavLink to={"/posts/" + this.props.postId}>{this.props.postTitle}</NavLink>
        </div>
        <div className="section-author-name">
          <NavLink to={"/user_profile/" + this.props.authorId}>{this.props.authorFullname}</NavLink>
        </div>
        <div className="section-rating-date">
          <i className="far fa-eye" />
          {getFormattedViews(this.props.postViews)}
          <span className="section-item-date" style={{ paddingTop: "2px" }}>
            {getFormattedDate(this.props.dateTime)}
          </span>
        </div>
      </div>
    );
  }
}

export default Section;
