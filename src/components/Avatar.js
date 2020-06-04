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

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return(
        <div>
            <img src={this.props.image} 
            width={this.props.size} 
            height={this.props.size} 
            className="rounded-circle" id="TooltipExample"/>
            <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
            {this.props.name}
            </Tooltip>
        </div>
        
            );
    }
}

export default Avatar;