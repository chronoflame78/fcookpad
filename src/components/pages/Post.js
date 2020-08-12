import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import Step from "../common/Step";
import Avatar from "../common/Avatar";
import CommentAvatar from "../common/CommentAvatar";
import "../../css/Post.css";
import CustomCarousel from "../common/ResponsiveCarousel";
import Loader from "../common/LoaderVer2";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../layout/Footer";
import Page404 from "../pages/Page404";
import Page500 from "../pages/Page500";
import Emoji from "react-emoji-render";
import {apiURL} from "../../config/Constant";

const isEmpty = require("is-empty");
const timediff = require("timediff");

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true,
      comment: "",
      isOpen: false,
      buttonLoading: false,
      comments: [],
      likes: [],
      error500: false
    };
  }

  componentDidMount() {
    this.mounted = true;
    axios
      .get(`${apiURL}/posts/${this.props.match.params.id}`)
      .then((res) => {
        if (this.mounted) {
          this.setState({
            post: res.data.post,
            loading: false,
            comments: res.data.post.comments,
            likes: res.data.post.likes,
            views: res.data.post.views,
          });
        }
      })
      .catch((error) => {
        if(error.response.status === 500){
          this.setState({
            loading: false,
            error500: true
          });
        }else{
          this.setState({
            loading: false,
          });
        }
        
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  openComment = (e) => {
    this.setState({ isOpen: true });
  };

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      content: this.state.comment,
    };
    this.setState({
      comment: "",
      buttonLoading: true,
    });
    axios
      .post(
        `${apiURL}/posts/` +
          this.props.match.params.id +
          "/comment",
        data
      )
      .then((res) => {
        this.setState({
          comments: res.data.comments,
          buttonLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error500) return <Page500 />;
    var post = this.state.post;
    var images = [];
    if (this.state.post.images) {
      images = this.state.post.images;
    }
    var items = [];
    if (images) {
      items = images.map((x) => ({ src: x }));
    }
    var comments = [];
    var topComments = [];
    if (this.state.comments) {
      comments = this.state.comments;

      comments.forEach((element) => {
        let currentTime = new Date();
        let timeDiff = timediff(element.datetime, currentTime, "YMWDHmSs");
        let flag = true;
        switch (flag) {
          case timeDiff.years:
            element.timediff = timeDiff.years + " năm trước";
            break;
          case timeDiff.months > 0:
            element.timediff = timeDiff.months + " tháng trước";
            break;
          case timeDiff.weeks > 0:
            element.timeDiff = timeDiff.weeks + " tuần trước";
            break;
          case timeDiff.days > 0:
            element.timeDiff = timeDiff.days + " ngày trước";
            break;
          case timeDiff.hours > 0:
            element.timeDiff = timeDiff.hours + " giờ trước";
            break;
          case timeDiff.minutes > 0:
            element.timeDiff = timeDiff.minutes + " phút trước";
            break;
          case timeDiff.seconds > 0:
            element.timeDiff = timeDiff.seconds + " giây trước";
            break;
          default:
            element.timeDiff = "Vừa xong";
            break;
        }
      });

      if (comments.length > 3) {
        topComments = this.state.comments.slice(-3, this.state.comments.length);
      } else {
        topComments = comments;
      }
    }

    if (this.state.comments && this.state.isOpen === true) {
      topComments = comments;
    }

    var steps = [];
    if (this.state.post.steps) {
      steps = this.state.post.steps;
    }

    var likes = [];
    if (this.state.post.likes) {
      likes = this.state.post.likes;
    }

    var views = [];
    if (this.state.post.views) {
      views = this.state.post.views;
    }

    if (Object.keys(post).length === 0 && post.constructor === Object) {
      return <Page404 />;
    }
    const { user } = this.props.auth;
    const user_avatar = localStorage.getItem("userAvatar");
    return (
      <div className="post-container">
        <Container>
          <Row className="post-main-title post-tit-ava-ingre">
            <Row className="post-tit-ava">
              <Col className="tit-desc-container" sm="10">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-title-icon">
                  <div className="post-likes">
                    <div className="heart-icon">
                      <i class="far fa-heart"></i>
                    </div>
                    <div className="like-number">
                      {this.state.post.likes.length}
                    </div>
                  </div>
                  <div className="post-views">
                    {" "}
                    <img
                      className="like-icon"
                      width={18}
                      height={21}
                      src="/images/eye.png"
                      alt=""
                    />{" "}
                    <div className="view-number">{this.state.post.views}</div>
                  </div>
                  <div className="post-share">
                    <div className="share-icon">
                      <i class="far fa-share-square"></i>
                    </div>
                  </div>
                </div>
                <div className="post-des-content post-description">
                  {post.description}
                </div>
              </Col>
              <Col sm="2">
                <div className="post-avatar">
                  <NavLink to={"/user_profile/" + post.author._id}>
                    <Avatar
                      className="post-avatar-cover"
                      signature="author"
                      image={post.author.avatar}
                      size={64}
                      name={post.author.fullName}
                      tooltip={true}
                    />
                    <div className="author-name">{post.author.name}</div>
                  </NavLink>
                </div>
              </Col>
            </Row>
            <div class="empty-block"></div>
            <Row className="ingredients">
              <Col sm="6">
                <div className="d-flex flex-column flex-md-row align-items-center slide-container">
                  <div className="post-carousel-box-updt">
                    <CustomCarousel items={items} />
                  </div>
                </div>
              </Col>
              <Col sm="6">
                <div className="ingredents-title">
                  <img
                    className="ingredient-icon"
                    width={23}
                    src="/images/ingredient.png"
                    alt=""
                  />
                  Nguyên liệu
                </div>
                <div className="post-ingredients ">
                  {post.ingredients &&
                    post.ingredients.map((x, index) => (
                      <p key={index}>
                        <i class="fas fa-carrot" /> {x}
                      </p>
                    ))}
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
            <Col>
              <div className="post-steps">
                <div className="post-step-title">
                  {" "}
                  <img
                    className="ingredient-icon"
                    width={20}
                    src="/images/step.png"
                    alt=""
                  />
                  Cách làm
                </div>
                {steps &&
                  steps.map((x, index) => (
                    <Step
                      className="step-detail"
                      key={index}
                      num={index}
                      title={index + 1}
                      description={x.content}
                      image={x.image}
                    />
                  ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="post-video-title">
                {" "}
                <img
                  className="youtube-icon"
                  width={35}
                  src="/images/youtube-black-white.png"
                  alt=""
                />
                Video
              </div>
              {post.video !== "chua co video" && (
                <div className="post-youtube-video">
                  <iframe
                    className="youtube-video"
                    title="video"
                    width="100%"
                    height="600px"
                    src={post.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </Col>
          </Row>
          <Row className="post-comment-section">
            <Col>
              <div className="">
                <div className="post-step-title">
                  {" "}
                  <img
                    className="youtube-icon"
                    width={35}
                    src="/images/comment.png"
                    alt=""
                  />
                  Bình luận
                </div>
                <div className="post-comment-container">
                  {comments.length > 3 && !this.state.isOpen && (
                    <div
                      className="post-comment-txt"
                      onClick={() => this.openComment()}
                    >
                      Xem tất cả bình luận
                    </div>
                  )}
                  {comments.length === 0 && (
                    <div className="post-comment-txt">
                      Chưa có bình luận nào
                    </div>
                  )}
                  {topComments &&
                    topComments.map((x, index) => (
                      <div
                        key={index}
                        className="post-comment-item d-flex align-items-center"
                      >
                        <NavLink to={"/user_profile/" + x.user._id}>
                          <CommentAvatar
                            signature={index}
                            image={x.user.avatar}
                            name={x.user.fullName}
                            size={40}
                            tooltip={true}
                          />
                        </NavLink>
                        <div className="post-comment-content">
                          <div className="post-user-name-comment-updt">
                            <Link
                              to={"/user_profile/" + x.user._id}
                              className="user-link"
                            >
                              <div className="username-in-comment">
                                {x.user.fullName}
                              </div>
                            </Link>
                            <div className="time-diff-in-comment">
                              {x.timeDiff}
                            </div>
                          </div>
                          <div>
                            <Emoji text={x.content} />
                          </div>
                        </div>
                      </div>
                    ))}
                  {this.state.buttonLoading && (
                    <div className="post-loading-icon">
                      <i class="fa fa-spinner fa-spin"></i>
                    </div>
                  )}
                </div>
                {isEmpty(user) && (
                  <div className="post-link-container">
                  <Link to="/login">
                    <div className="post-update-add-comment">
                      Đăng nhập để bình luận
                    </div>
                  </Link>
                  </div>
                )}
                {!isEmpty(user) && (
                  <div className="post-comment-item-login d-flex align-items-center">
                    {console.log(user)}
                    <NavLink to={"/user_profile/" + user.id}>
                      <CommentAvatar
                        signature="main-user"
                        image={user_avatar}
                        size={64}
                        name={user.user_name}
                        tooltip={true}
                      />
                    </NavLink>

                    <div className="post-add-comment-login">
                      <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                          <div
                            className="post-comment-icon-update"
                            onClick={(e) => this.handleSubmit(e)}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </div>
                          <input
                            onChange={this.onChange}
                            id="comment"
                            value={this.state.comment}
                            autoComplete="off"
                            maxLength="100"
                            placeholder=" "
                            className="form-control comment-input"
                            type="text"
                          />
                          <div className="insde-comment-input">
                            <label className="create-label-name">
                              Viết bình luận..
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
Post.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Post);
