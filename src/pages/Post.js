import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Step from '../components/Step';
import Avatar from '../components/Avatar';
import '../css/Post.css';
import CustomCarousel from '../components/CustomCarousel';
import Loader from '../components/LoaderVer2';

class Post extends Component {

  constructor(props) {
    console.log("post constructor");
    super(props);
    this.state = {
      post: {},
      login: false,
      loading: true
    };

  }

  componentDidMount() {
    console.log("post did mount");
    this.mounted = true;
    axios.get("//3.133.113.96:2000/api/posts/" + this.props.match.params.id).then(res => {
      if (this.mounted) {
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.post);
        this.setState({
          post: res.data.data.post,
          loading: false
        });
      }
    }).catch(error => {
      console.log(error.response);
      this.setState({
        loading: false
      });
  });
    // axios.get("https://e8gbf.sse.codesandbox.io/" + this.props.match.params.id).then(res => {
    //   if (this.mounted) {
    //     console.log(res.data);
    //     this.setState({
    //       post: res.data
    //     });
    //   }

    // });
  }

  componentWillUnmount() {
    this.mounted = false;
    console.log("post will mount");
  }

  render() {
    console.log("post render");
    if (this.state.loading) return <Loader />;
    var post = this.state.post;
    console.log(post);
    var images = [];
    if(this.state.post.images){
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
      return (<h2>Post not found</h2>);
    }
    return (
      <div className="Post">
        <Container>
          <Row className="main-title">
            <Col sm="9"><h1 className="title">{post.title}</h1></Col>
            <Col sm="3">
              <div className="avatar">
                <Avatar image={post.author_avatar} size={64} name={post.author_name} />
              </div>
              <div className="authorName">{post.author_name}</div>
            </Col>
          </Row>         
          <Row>
            <Col>
            <div className="line"></div>
              <div className="info">
                <div className="d-flex flex-column flex-md-row">
                  <CustomCarousel items={items} />
                  <div className="ingredients">
                    {post.ingredients && post.ingredients.map((x, index) => (
                      <p key={index}><i className="fa fa-arrow-right" /> {x}</p>
                    ))}
                  </div>
                </div>
                <div className="des-content">{post.description}</div>
              </div>
              <div className="line"></div>
              <div className="info-2">
                <div className="des-title-orange">Hướng dẫn</div>
                {steps && steps.map((x, index) => (
                  <Step key={index} num={index} description={x.content} image={x.image} />
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="line"></div>
              <div className="youtube-video">
                <iframe width="100%" height="400px"
                  src={post.video}
                  frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="comment-div">
                <div className="des-title-orange2">Bình luận</div>
                <div className="comment-txt">Xem tất cả bình luận</div>
                
                {comments && comments.map((x, index) => (
                  <div key={index} className="comment-item d-flex align-items-center">
                    <Avatar image={x.user_avatar} name={x.user_name} size={64}/>
                  <div className="comment-content">
                    <div className="user-name-comment">{x.user_name}</div>
                    <div>{x.content}</div>
                    
                    </div>
                  </div>
                                 
                ))}
                {!this.state.login && <div className="add-comment">Đăng nhập để bình luận</div>}
                {this.state.login &&
                 <div className="comment-item-login d-flex align-items-center">
                 <Avatar image={post.author_avatar} size={64} name={post.author_name} />
                <div className="add-comment-login">
                  <input placeholder="Viết bình luận.." className="input-comment" type="text" name="name" />
                </div>
                </div>
                }              
              </div>
            
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Post;