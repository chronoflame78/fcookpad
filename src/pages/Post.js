import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

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
    axios.get("https://e8gbf.sse.codesandbox.io/post").then(res => {
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
    return (
      <div className="Post">
        <Container>
          <h2>{post.title}</h2>
          <h2>{post.description}</h2>
          <h2>{post.author_name}</h2>
          <h2>{post.author_avatar}</h2>
          { post.ingredients && post.ingredients.map(x => (
              <h2>{x}</h2>
            )) }
          { post.images && post.images.map(x => (
              <h2>{x}</h2>
            )) }
          
          
        </Container>
      </div>
    );
  }
}

export default Post;