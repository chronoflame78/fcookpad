import React, { Component } from "react";
import { Tooltip } from "reactstrap";
class Avatar extends Component{
    constructor(props){
        super(props);
        this.state = {
            tooltipOpen: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            tooltipOpen : !this.state.tooltipOpen
        });       
    }

    render(){
        return(
        <div>
            <img src={this.props.image} 
            width={this.props.size} 
            height={this.props.size} 
            alt=""
            className="rounded-circle" id={"TooltipExample-"+this.props.signature}/>
            <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={"TooltipExample-"+this.props.signature} toggle={this.toggle}>
            {this.props.name}
            </Tooltip>
        </div>
        
            );
    }
}

export default Avatar;