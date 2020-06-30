import React, { Component } from "react";
import '../../css/Section.css';
import axios from "axios";
import { NavLink } from "react-router-dom";
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
        return today.getDate() + "/" + month + "/" + today.getFullYear();
    }

    showMore() {
        this.state.itemsToShow === 4 ? (
            this.setState({ itemsToShow: 8 })
        ) : (
                this.setState({ itemsToShow: 4 })
            )
    }

    componentDidMount() {
        this.mounted = true;
        axios.get("http://157.230.44.169:3000/api/home/" + this.props.tail).then(res => {
            if (this.mounted) {
                this.setState({
                    posts: res.data.posts,
                    loading: false
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
        if (this.state.posts.length < 4) {
            return(<div></div>);
        }
        if (this.state.posts.length > 4) {
            topFourPosts = this.state.posts.slice(0, this.state.itemsToShow);
        }
        return (
            <div className="container container-max-custom">
                <div className="row section-title">{this.props.sectionName}</div>
                <div className="row">
                    {topFourPosts && topFourPosts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    <div className="item-cover" >
                                        <span className="section-item-view">{x.views} <i className="fa fa-eye" /></span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="section-item-title">{x.title}</div>
                            <div className="section-author-name">{x.author.name}</div>
                            <div className="section-rating-date"><i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <span className="section-item-date" style={{paddingTop: '2px'}}> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={this.showMore} >
                    {this.state.itemsToShow === 4 && "XEM THÊM"}
                    {this.state.itemsToShow !== 4 && "THU GỌN"}
                </div>
            </div>

        );
    }
}

export default Section;