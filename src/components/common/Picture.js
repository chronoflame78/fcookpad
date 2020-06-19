import React, { Component } from "react";
import '../../css/Picture.css';

class Picture extends Component{
    constructor(props){
        super(props);

    }


    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return(
            <div className="picture-cover" 
            style={{width:this.props.width, height:this.props.height, backgroundImage: "url("+this.props.src+")"}}>
                
            </div>   
            );
    }
}

export default Picture;