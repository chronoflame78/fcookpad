import React, { Component } from "react";
import "../../css/Section.css";
import { NavLink } from "react-router-dom";
import { getFormattedDate, getFormattedViews } from "../../utils/getFormat.js";
import axios from "axios";
import swal from "sweetalert";
import { apiURL } from "../../config/Constant";
const isEmpty = require("is-empty");

class SectionTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      itemsToShow: 4,
    };
  }

  getFormattedDate(date) {
    var today = new Date(date);
    var month = "";
    if (today.getMonth() < 9) {
      month = "0" + (today.getMonth() + 1);
    } else {
      month = today.getMonth() + 1;
    }
    return (
      today.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
      "/" +
      month +
      "/" +
      today.getFullYear()
    );
  }

  likePost = (e, id) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/recipes/${id}/like`)
      .then((res) => {
        console.log(res);
        let post = res.data.recipe;
        let newArr = this.props.posts;
        
        for (let x of newArr) {
          console.log(x._id);
          if (x._id === id) {
            Object.assign(x, post);
          }
        }
        this.setState({
          posts: newArr,
        });
      })
      .catch((err) => {
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
              Người dùng chưa có bài đăng nào
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
                  <div className="section-image-container" style={{ marginTop: "25px" }}>
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
                      className="section-image-top-holder"
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        src={x.images[0]}
                      />
                    </div>
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
