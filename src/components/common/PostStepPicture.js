import React, { Component } from "react";
import '../../css/Picture.css';

class PostStepPicture extends Component{
    render(){
        return(
            <div className="post-step-picture" 
            style={{width:this.props.width, height:this.props.height, backgroundImage: "url("+this.props.src+")"}}>
                
            </div>   
            );
    }
}

export default PostStepPicture;