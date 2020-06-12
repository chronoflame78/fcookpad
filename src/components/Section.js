import React, { Component } from "react";
import '../css/Section.css';
import axios from "axios";
import {NavLink} from "react-router-dom";
class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            itemsToShow: 4
        }
        this.showMore = this.showMore.bind(this);
    }

    getFormattedDate(date) {
        var today = new Date(date);
        var month = "";
        if(today.getMonth() < 9){
            month = "0" + (today.getMonth()+1)
        }
        else{
            month = today.getMonth() + 1
        }
        return today.getDate() + "/" + month + "/" + today.getFullYear();
    }

    showMore() {
        this.state.itemsToShow === 4 ? (
          this.setState({ itemsToShow: 8 })
        ) : (
          this.setState({ itemsToShow: 4})
        )
      }

    componentDidMount() {
        this.mounted = true;
        axios.get("http://3.133.113.96:2000/api/home/" + this.props.tail).then(res => {
            if (this.mounted) {
                this.setState({
                    posts: res.data.data.post,
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        var topFourPosts = [];
        if (this.state.posts.length > 4) {
            topFourPosts = this.state.posts.slice(0, this.state.itemsToShow);
        }
        return (
            <div className="container container-max-custom">
                <div className="row section-title">{this.props.sectionName}</div>
                <div className="row">
                    {topFourPosts && topFourPosts.map((x, index) => (
                        <div key={index} className="col-sm-6 col-md-3 py-4">
                            <NavLink to={"/posts/"+x._id}>
                            <div className="item-cover" style={{backgroundImage: "url("+x.images[0]+")"}}></div>
                            </NavLink>
                            <div className="item-title">{x.title}</div>
                            <div className="item-author-name">{x.author_name}</div>
                            <div className="rating-and-date"><i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <span className="item-date"> {this.getFormattedDate(x.datetime)}</span>
                            </div>                          
                        </div>
                    ))}
                </div>
                <div className="row see-more" style={{marginLeft: '0px', marginRight: '0px'}} onClick={this.showMore} >
                    {this.state.itemsToShow===4 && "XEM THÊM"}
                    {this.state.itemsToShow!==4 && "THU GỌN"}
                </div>
            </div>

        );
    }
}

export default Section;