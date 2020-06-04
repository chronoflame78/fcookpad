import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Step from '../components/Step';
import Avatar from '../components/Avatar';
import '../css/Post.css';
import CustomCarousel from '../components/CustomCarousel';


class Post extends Component {
  
  constructor(props) {
    console.log("post constructor");
    super(props);
    this.state = {
      post: {}
    };

  }

  componentDidMount() {
    console.log("post did mount");
    this.mounted = true;
    axios.get("https://e8gbf.sse.codesandbox.io/" + this.props.match.params.id).then(res => {
      if(this.mounted){
        console.log(res.data);
        this.setState({
          post: res.data
        });
      }
      
    });
  }

  componentWillUnmount(){
    this.mounted = false;
    console.log("post will mount");
  }

  render() {
    console.log("post render");
    var post = this.state.post;
    console.log(post);
    var images = this.state.post.images;
    var items = [];
    if(images){
      items = images.map(x => ({src: x}));
    }
    var comments = [];
    if(this.state.post.comments){
      comments = this.state.post.comments;
    };
    if(Object.keys(post).length === 0 && post.constructor === Object){
      return(<h2>Post not found</h2>);
    }
    return (
      <div className="Post">
        <Container>
          <Row>
            <Col sm="9"><h1 className="title">{post.title}</h1></Col>
            <Col sm="3">
              <div className="avatar">
                <Avatar image={post.author_avatar} size={64} name={post.author_name}/>
              </div>             
              <div className="authorName">{post.author_name}</div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="info">
              <div className="d-flex flex-column flex-md-row">
                <CustomCarousel items={items}/>
                <div className="ingredients">
                { post.ingredients && post.ingredients.map(x => (
                  <p>{x}</p>
                 )) }
                </div>
              </div>
              <div className="des-title">Description</div>
              <div className="des-content">{post.description}</div>
              </div>
            </Col>
          </Row>
          <Row></Row>
          
          
          <h2>{post.author_avatar}</h2>
          { post.ingredients && post.ingredients.map(x => (
              <h2>{x}</h2>
            )) }
          { post.images && post.images.map(x => (
              <h2>{x}</h2>
            )) }
          { comments && comments.map(x => (
              <h2>{x.content}</h2>
            )) }
          <Step title={post.title}/>
          <h2>{post.datetime}</h2>
          {/* { post.comments && post.comments.map(x => (
              <h2>{x}</h2>
            )) } */}
          <iframe width="560" height="315"
           src="https://www.youtube.com/embed/TTmfGULw0Uw"
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen></iframe>
        </Container>
      </div>
    );
  }
}

export default Post;