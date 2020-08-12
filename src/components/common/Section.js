import React, { Component } from "react";
import '../../css/Section.css';
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            itemsToShow: 4,
            loading: true
        }
        this.showMore = this.showMore.bind(this);
    }

    getFormattedDate(date) {
        var today = new Date(date);
        var month = "";
        if (today.getMonth() < 9) {
            month = "0" + (today.getMonth() + 1)
        }
        else {
            month = today.getMonth() + 1
        }
        return today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2}) + "/" + month + "/" + today.getFullYear();
    }

    showMore() {
        this.state.itemsToShow === 4 ? (
            this.setState({ itemsToShow: 8 })
        ) : (
                this.setState({ itemsToShow: 4 })
            )
    }

    likePost = (e,id) =>{
        e.preventDefault();
        axios.post(`http://188.166.237.72:3000/api/posts/${id}/like`)
        .then(res => {
            console.log(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }

    render() {
        let posts = [];
        if (this.props.posts.length < 4) {
            posts = this.props.posts;
        }
        else {
            posts = this.props.posts.slice(0, this.state.itemsToShow);
        }
        return (
            <div className="container container-max-custom">
                <div className="row section-title"><Link to={"/view_all/" + this.props.sectionName}>{this.props.sectionName.toUpperCase()}</Link></div>
                <div className="row">
                    {posts && posts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    {/* <div className="section-image-holder"></div> */}
                                    <div className="item-cover" >
                                        {!x.isLiked && <span className="section-item-view">{x.likes.length} <i className="far fa-heart" onClick={(e) => this.likePost(e, x._id)} /></span>}
                                        {x.isLiked && <span className="section-item-view">{x.likes.length} <i className="fas fa-heart" onClick={(e) => this.likePost(e, x._id)} /></span>}
                                    </div>
                                </div>
                            </NavLink>
                            <div className="section-item-title"><NavLink to={"/posts/" + x._id}>{x.title}</NavLink></div>
                            <div className="section-author-name"><NavLink to={"/user_profile/"+x.author._id}>{x.author.fullName}</NavLink></div>
                            <div className="section-rating-date">
                                <i className="far fa-eye" /> {x.views} 
                                <span className="section-item-date" style={{paddingTop: '2px'}}> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={this.showMore} >
                    {this.state.itemsToShow === 4 && <button className="btn btn-more">XEM THÊM</button>}
                    {this.state.itemsToShow !== 4 && <button className="btn btn-more">THU GỌN</button>}
                </div>
            </div>

        );
    }
}

export default Section;