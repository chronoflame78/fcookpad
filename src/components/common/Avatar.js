import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import '../../css/Avatar.css';
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
        console.log(this.props);
        if(this.props.tooltip === true){
            return(
                <div className={"avatar-cover " + this.props.className} 
                style={{width:this.props.size, height:this.props.size, backgroundImage: "url("+this.props.image+")"}}
                id={"TooltipExample-"+this.props.signature}
                >
                 <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={"TooltipExample-"+this.props.signature} toggle={this.toggle}>
                    {this.props.name}
                    </Tooltip>   
                </div>        
                    );
        }
        else{
            return(
                <div className={"avatar-cover " + this.props.className} 
                style={{width:this.props.size, height:this.props.size, backgroundImage: "url("+this.props.image+")"}}
                id={"TooltipExample-"+this.props.signature}
                > 
                </div>        
                    );
        }
        
    }
}

export default Avatar;