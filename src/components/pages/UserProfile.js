import React, { Component } from "react";
import axios from "axios";
import Footer from "../layout/Footer";
import SectionTop from "../common/SectionTop";
import "../../css/UserProfile.css";
import Avatar from "../common/Avatar";
import { NavLink } from "react-router-dom";
import "../../css/Section.css";
import Loader from "../common/LoaderVer2";
import { apiURL } from "../../config/Constant";
import { getFormattedViews, getFormattedDate } from "../../actions/GetFormat";
import { removeStorage } from "../../utils/removeStorage";
import swal from "sweetalert";

const isEmpty = require("is-empty");
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      posts: [],
      top: [],
      nextPage: 2,
      loading: true,
      buttonLoadMore: false,
    };
    this.showMore = this.showMore.bind(this);
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
        let newArr = this.state.posts;
        for (let x of newArr) {
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

  showMore(nextPage) {
    this.setState({
      buttonLoadMore: true,
    });
    axios
      .get(
        `${apiURL}/users/` +
          this.props.match.params.id +
          "/recipes?page=" +
          nextPage
      )
      .then((res) => {
        const arr = this.state.posts;
        arr.push(...res.data.allPosts);
        this.setState({
          buttonLoadMore: true,
        });
        axios
          .get(
            `${apiURL}/users/` +
              this.props.match.params.id +
              "/recipes?page=" +
              nextPage
          )
          .then((res) => {
            const arr = this.state.posts;
            arr.push(...res.data.allPosts);
            this.setState({
              nextPage: this.state.nextPage + 1,
              posts: arr,
              buttonLoadMore: false,
            });
            console.log(this.state.posts);
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              buttonLoadMore: false,
            });
          });
      });
  }

  componentDidMount() {
    removeStorage();
    this.mounted = true;
    axios
      .all([
        axios.get(`${apiURL}/users/${this.props.match.params.id}`),
        axios.get(
          `${apiURL}/users/` + this.props.match.params.id + "/recipes?page=1"
        ),
        axios.get(`${apiURL}/users/` + this.props.match.params.id + "/top"),
      ])
      .then(
        axios.spread((...res) => {
          console.log(...res);
          if (this.mounted) {
            if(!res[1].data.allPosts){
              this.setState({
                userInfo: res[0].data.user,
                posts: [],
                top: [],
                loading: false,
              })
            }else{
              this.setState({
                userInfo: res[0].data.user,
                posts: res[1].data.allPosts,
                top: res[2].data.topPost,
                loading: false,
              });
            }
            
          }
        })
      )
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.loading) return <Loader />;
    return (
      <div className="userp-container">
        <div className="container">
          <div className="row userp-row-updt cold-lg-12">
            <div className="col-md-4 userp-info-container-updt">
              <Avatar
                className="userp-avatar"
                image={this.state.userInfo.avatar}
                size={140}
                tooltip={false}
              />
              <div className="userp-name">{this.state.userInfo.fullName}</div>
              <div className="userp-smalltext">
                <i className="fas fa-venus-mars"></i> Giới tính:{" "}
                {this.state.userInfo.gender}
              </div>
              <div className="userp-smalltext">
                <i className="far fa-calendar-alt"></i> Ngày sinh:{" "}
                {this.getFormattedDate(this.state.userInfo.birthday)}
              </div>
              <div className="userp-num">
                <div className="userp-left">
                  <img
                    className="userp-icon"
                    width={20}
                    src="/images/post.png"
                    alt=""
                  />{" "}
                  &nbsp;Bài viết:
                </div>
                <div className="userp-right">{this.state.userInfo.posts}</div>
              </div>
              <div className="userp-views">
                <div className="userp-left">
                  <img
                    className="userp-icon"
                    width={20}
                    src="/images/eye.png"
                    alt=""
                  />{" "}
                  &nbsp;Lượt xem:
                </div>{" "}
                <div className="userp-right">{this.state.userInfo.views}</div>
              </div>
              <div className="userp-likes">
                <div className="userp-left">
                  <img
                    className="userp-icon"
                    width={20}
                    src="/images/like.png"
                    alt=""
                  />{" "}
                  &nbsp;Lượt thích:
                </div>{" "}
                <div className="userp-right">{this.state.userInfo.likes}</div>
              </div>
              <div className="userp-smalltext-end">
                Gia nhập kể từ ngày:{" "}
                {this.getFormattedDate(this.state.userInfo.createAt)}
              </div>
            </div>
            <div className="col-md-8">
              <div className="userp-title">MỘT CHÚT VỀ TÔI</div>
              <div className="userp-description">
                {this.state.userInfo.description}
              </div>
              <SectionTop sectionName="NỔI BẬT" posts={this.state.top} />
            </div>
          </div>
        </div>
        <div className="container container-max-custom">
          <div className="row section-title2">BÀI ĐĂNG</div>
          <div className="row user-profile-post">
            {isEmpty(this.state.posts) && (
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
            {!isEmpty(this.state.posts) &&
              this.state.posts.map((x, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 col-lg-4 col-12 py-4"
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
          {this.state.posts && this.state.posts.length < this.state.userInfo.posts && (
            <div
              className="row userp-see-more"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              {!this.state.buttonLoadMore && (
                <button
                  onClick={() => this.showMore(this.state.nextPage)}
                  type="submit"
                  className="btn btn-more-pink"
                >
                  XEM THÊM
                </button>
              )}
              {this.state.buttonLoadMore && (
                <button type="submit" className="btn btn-more-pink">
                  <i class="fa fa-spinner fa-spin"></i>
                </button>
              )}
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

export default UserProfile;
