import React, { Component } from "react";
import '../../css/Picture.css';

class RecipeStepPicture extends Component{
    render(){
        return(
            <div className="post-step-picture" 
            style={{width:this.props.width, backgroundImage: "url("+this.props.src+")"}}>
                
            </div>   
            );
    }
}

export default RecipeStepPicture;