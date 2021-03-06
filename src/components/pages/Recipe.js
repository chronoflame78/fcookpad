import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import Step from "../common/Step";
import Avatar from "../common/Avatar";
import CommentAvatar from "../common/CommentAvatar";
import "../../css/Post.css";
import CustomCarousel from "../common/ResponsiveCarousel";
import Loader from "../common/Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../layout/Footer";
import Page404 from "./error/Page404";
import Page500 from "./error/Page500";
import Emoji from "react-emoji-render";
import { apiURL } from "../../config/Constant";
import { getFormattedViews, getFormattedDate } from "../../utils/getFormat.js";
import { removeStorage } from "../../utils/removeStorage";
import swal from "sweetalert";
import { FacebookShareButton } from "react-share";
// import {Helmet} from "react-helmet";
const isEmpty = require("is-empty");

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      errors: {},
      loading: true,
      comment: "",
      isOpen: false,
      buttonLoading: false,
      comments: [],
      likes: [],
      error500: false,
      views: "",
    };
    this.views = "";
  }

  componentDidMount() {
    removeStorage();
    this.mounted = true;
    let { user } = this.props.auth;
    if(!isEmpty(user)){
      axios.all([axios.get(`${apiURL}/recipes/${this.props.match.params.id}`),
      axios.get(`${apiURL}/users/${this.props.auth.user.id}`)])
     
      .then(axios.spread((...res) => {
        if (this.mounted) {
          this.setState({
            post: res[0].data.recipe,
            loading: false,
            comments: res[0].data.recipe.comments,
            likes: res[0].data.recipe.likes,
            views: res[0].data.recipe.views,
            userInfo: res[1].data.user,
          });
        }
      }))
      .catch((error) => {
        if (error.response.status === 500) {
          this.setState({
            loading: false,
            error500: true,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    }
    else{
      axios
      .get(`${apiURL}/recipes/${this.props.match.params.id}`)
      .then((res) => {
        if (this.mounted) {
          this.setState({
            post: res.data.recipe,
            loading: false,
            comments: res.data.recipe.comments,
            likes: res.data.recipe.likes,
            views: res.data.recipe.views,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.setState({
            loading: false,
            error500: true,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    }
    
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  //handle input changes
  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  //load more comment
  openComment = () => {
    this.setState({ isOpen: true });
  };

  //handle like button click
  likeRecipe = (e, id) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/recipes/${id}/like`)
      .then((res) => {
        let post = res.data.recipe;
        this.setState({
          post: post,
        });
      })
      .catch((err) => {
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

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      content: this.state.comment,
    };
    if (data.content) {
      this.setState({
        comment: "",
        buttonLoading: true,
      });
      axios
        .post(
          `${apiURL}/recipes/` + this.props.match.params.id + "/comment",
          data
        )
        .then((res) => {
          this.setState({
            comments: res.data.comments,
            buttonLoading: false,
          });
        })
        .catch((err) => {
          this.setState({
            errors: { message: "Hãy viết bình luận để gửi nhé" },
            buttonLoading: false,
          });
        });
    }
  }

  render() {
    let shareURL = "https://mlemmlem.site" + this.props.location.pathname;
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
        element.timeDiff = getFormattedDate(element.datetime);
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

    let views = this.state.views + 1;

    if (Object.keys(post).length === 0 && post.constructor === Object) {
      return <Page404 />;
    }
    const { user } = this.props.auth;
    let user_avatar;
    let user_fullname;
    if(this.state.userInfo){
      user_avatar = this.state.userInfo.avatar;
      user_fullname = this.state.userInfo.fullName;
    }
    
    return (
      <div className="post-container">
        {/* <Helmet>
          <meta property="og:description" content={post.description} />
          <meta property="og:title" content={post.title} />
          <meta property="og:image" content={post.imageCover} />
        </Helmet> */}
        <Container className="container-padding-fix">
          <Row className="post-main-title post-tit-ava-ingre">
            <div className="col-12 col-md-12 col-sm-12 col-xl-12 col-lg-12 post-tit-ava">
              <Col className="tit-desc-container" sm="12">
                <div className="row  post-title-wrapper">
                  <div className="col-8 post-title-container">
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-title-icon">
                      <div className="post-views">
                        {" "}
                        <img
                          className="like-icon"
                          width={18}
                          height={21}
                          src="/images/eye.png"
                          alt=""
                        />{" "}
                        <div className="view-number">
                          {getFormattedViews(views)}
                        </div>
                      </div>
                      <div className="post-likes">
                        {post.isLiked && (
                          <div
                            className="heart-icon"
                            onClick={(e) => this.likeRecipe(e, post._id)}
                          >
                            <i className="fas fa-heart"></i>
                          </div>
                        )}
                        {!post.isLiked && (
                          <div
                            className="heart-icon"
                            onClick={(e) => this.likeRecipe(e, post._id)}
                          >
                            <i className="far fa-heart"></i>
                          </div>
                        )}
                        <div className="like-number">
                          {this.state.post.likes.length}
                        </div>
                      </div>
                      <div className="post-likes">
                        <div style={{ paddingTop: "2px" }}>
                          <FacebookShareButton url={shareURL}>
                            <i className="far fa-share-square"></i>
                          </FacebookShareButton>
                          {/* <a
                            href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareURL)}
                            target="_blank"
                          >
                           <i className="far fa-share-square"></i>
                          </a> */}
                        </div>
                        {/* <div className="like-number">0</div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 justify-content-end post-avatar-container">
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
                  </div>
                </div>
                <div className="col-sm-12 col-12 col-md-12 col-xl-12 col-lg-12"></div>
                <p className="post-des-content post-description">
                  {post.description}
                </p>
              </Col>
            </div>
            <div className="empty-block"></div>
            <div className="post-ingredients-and-images row">
              <div className="col-sm-7 col-12 post-images-slider-container">
                <div className="d-flex flex-column flex-md-row align-items-center slide-container">
                  <div className="post-carousel-box-updt">
                    <CustomCarousel items={items} />
                  </div>
                </div>
              </div>
              <Col className="col-sm-5 col-12">
                <div className="post-ingredients-div">
                  <div className="post-ingredients-title">
                    <img
                      className="post-ingredient-icon"
                      width={23}
                      src="/images/ingredient.png"
                      alt=""
                    />
                    Nguyên liệu
                  </div>
                  {post.ingredients &&
                    post.ingredients.length <= 5 &&
                    post.ingredients.map((x, index) => (
                      <div key={index} className="post-ingredients">
                        <p>
                          <i className="fas fa-carrot fa-xs" /> {x}
                        </p>
                      </div>
                    ))}
                  <div className="post-5-ingredients">
                    {post.ingredients &&
                      post.ingredients.length > 5 &&
                      post.ingredients.map((x, index) => (
                        <div className="col-6" key={index}>
                          <i className="fas fa-carrot fa-xs" /> {x}
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
            </div>
          </Row>
          <Row className="post-steps-container">
            <Col>
              <div className="post-steps">
                <div className="post-step-title">
                  {" "}
                  <img
                    className="post-ingredient-icon"
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
          {post.video && (
            <Row className="post-video-wrapper">
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

                <div className="post-youtube-video">
                  <iframe
                    className="youtube-video"
                    title="video"
                    width="100%"
                    height="600px"
                    src={"https://www.youtube.com/embed/" + post.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Col>
            </Row>
          )}
          <Row className="post-comment-section">
            <Col>
              <div className="">
                <div className="post-step-title post-comment-title">
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
                  {!isEmpty(this.state.errors) && (
                    <div className="alert alert-danger alert-position">
                      {this.state.errors.message}
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
                    <NavLink to={"/user_profile/" + user.id}>
                      <CommentAvatar
                        signature="main-user"
                        image={user_avatar}
                        size={64}
                        name={user_fullname}
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
                            <label
                              htmlFor="comment"
                              className="post-write-cmt-label"
                            >
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
Recipe.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Recipe);
