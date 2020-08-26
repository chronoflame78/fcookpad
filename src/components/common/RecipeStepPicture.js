import React, { Component } from "react";
import "../../css/Picture.css";

class RecipeStepPicture extends Component {
  render() {
    return (
      <div className="post-step-picture" style={{ width: this.props.width }}>
        <img
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: "20px"
          }}
          src={this.props.src}
          alt=""
        />
      </div>
    );
  }
}

export default RecipeStepPicture;
