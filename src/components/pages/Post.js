import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from 'react-router-dom';
import Step from '../common/Step';
import Avatar from '../common/Avatar';
import '../../css/Post.css';
import CustomCarousel from '../common/ResponsiveCarousel';
import Loader from '../common/LoaderVer2';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../layout/Footer";
import Page404 from '../pages/Page404';

const isEmpty = require("is-empty");


class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      loading: true,
      comment: ''
    };

  }

  componentDidMount() {
    this.mounted = true;
    axios.get("http://178.128.83.129:3000/api/posts/" + this.props.match.params.id).then(res => {
      if (this.mounted) {
        this.setState({
          post: res.data.post,
          loading: false
        });
      }
    }).catch(error => {
      this.setState({
        loading: false
      });
    });

  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      content: this.state.comment
    }
    this.setState({
      comment:''
    })
    axios.post("http://178.128.83.129:3000/api/posts/"+ this.props.match.params.id +"/comment", data)
      .then(res => {
        axios.get("http://178.128.83.129:3000/api/posts/" + this.props.match.params.id).then(resp => {
          if (this.mounted) {
            this.setState({
              post: resp.data.post
            });
          }
        }).catch(error => {
          console.log(error);
        });
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    if (this.state.loading) return <Loader />;
    var post = this.state.post;
    var images = [];
    if (this.state.post.images) {
      images = this.state.post.images;
    }
    var items = [];
    if (images) {
      items = images.map(x => ({ src: x }));
    }
    var comments = [];
    if (this.state.post.comments) {
      comments = this.state.post.comments;
    };
    var steps = [];
    if (this.state.post.steps) {
      steps = this.state.post.steps;
    };
    if (Object.keys(post).length === 0 && post.constructor === Object) {
      return (<Page404 />);
    }
    const { user } = this.props.auth;
    const user_avatar = localStorage.getItem('userAvatar');
    return (
      <div className="post-container">
        <Container>
          <Row className="post-main-title">
            <Col sm="9"><h1 className="post-title">{post.title}</h1></Col>
            <Col sm="3">
              <div className="post-avatar">
                <NavLink to={"/userprofile/" + post.author._id}>
                  <Avatar className="post-avatar-cover" signature="author" image={post.author.avatar} size={64} name={post.author.fullName} tooltip={true} />
                </NavLink>
              </div>
              <div className="post-author-name">{post.author.name}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="post-line"></div>
              <div className="post-info">
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <div className="post-carousel-box">
                    <CustomCarousel items={items} />
                  </div>
                  <div className="post-ingredients">
                    {post.ingredients && post.ingredients.map((x, index) => (
                      <p key={index}><i className="fa fa-arrow-right" /> {x}</p>
                    ))}
                  </div>
                </div>
                <div className="post-des-content">{post.description}</div>
              </div>
              <div className="post-line"></div>
              <div className="post-info-2">
                <div className="post-des-title">Hướng dẫn</div>
                {steps && steps.map((x, index) => (
                  <Step key={index} num={index} description={x.content} image={x.image} />
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="post-line"></div>
              {post.video !== 'chua co video' &&
                <div className="post-youtube-video">
                  <iframe title="video" width="100%" height="400px"
                    src={post.video}
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                </div>
              }

            </Col>
          </Row>
          <Row>
            <Col>
              <div className="post-comment-div">
                <div className="post-des-title-2">Bình luận</div>
                <div className="post-comment-txt">Xem tất cả bình luận</div>

                {comments && comments.map((x, index) => (
                  <div key={index} className="post-comment-item d-flex align-items-center">
                    <Avatar signature={index} image={x.user.avatar} name={x.user.name} size={64} tooltip={true} />
                    <div className="post-comment-content">
                      <div className="post-user-name-comment">{x.user_name}</div>
                      <div>{x.content}</div>

                    </div>
                  </div>

                ))}
                {isEmpty(user) && <Link to="/login"><div className="post-add-comment">Đăng nhập để bình luận</div></Link>}
                {!isEmpty(user) &&
                  <div className="post-comment-item-login d-flex align-items-center">
                    <Avatar signature="main-user" image={user_avatar} size={64} name={user.user_name} tooltip={true} />
                    <div className="post-add-comment-login">
                      <form className="post-form-comment" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="post-input-container">
                          <input onChange={this.onChange} id="comment" value={this.state.comment} autoComplete="off" maxLength="100" placeholder="Viết bình luận.." className="post-input-comment" type="text" />
                        </div>
                        <div className="post-comment-icon" onClick={(e) => this.handleSubmit(e)}><i class="fas fa-paper-plane"></i></div>
                      </form>
                    </div>
                  </div>
                }
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
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
)(Post);