import React, { Component } from "react";
import "../../css/Picture.css";

class Picture extends Component {
  render() {
    return (
      <div
        className="step-picture"
        style={{
          width: this.props.width,
          height: this.props.height,
          backgroundImage: "url(" + this.props.src + ")",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
          src={this.props.src}
          alt=""
        />
      </div>
    );
  }
}

export default Picture;
