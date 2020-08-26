import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import "../../css/Avatar.css";
class CommentAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  //change state to show tooltip when hover on avatar
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    if (this.props.tooltip === true) {
      return (
        <div class="post-author-wrapper">
          <div
            className={"avatar-cover " + this.props.className}
            style={{
              width: this.props.size,
              height: this.props.size,
            }}
            id={"TooltipExample-" + this.props.signature}
          >
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                borderRadius: "50%"
              }}
              src={this.props.image}
              alt=""
            />
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={"TooltipExample-" + this.props.signature}
              toggle={this.toggle}
            >
              {this.props.name}
            </Tooltip>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={"avatar-cover " + this.props.className}
          style={{
            width: this.props.size,
            height: this.props.size,
          }}
          id={"TooltipExample-" + this.props.signature}
        >
          <img
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
            }}
            alt=""
            src={this.props.image}
          />
        </div>
      );
    }
  }
}

export default CommentAvatar;
