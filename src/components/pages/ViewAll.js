import React, { Component } from "react";
import Footer from "../layout/Footer";
import Loader from '../common/LoaderVer2';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import Page404 from '../pages/Page404';

class ViewAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [],
            nextPage: 3,
            buttonLoadMore: false,
            totalRecord: 0,
        };
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

    componentDidMount() {
        localStorage.removeItem("create_id");
        localStorage.removeItem("action");
        this.mounted = true;
        let name;
        if (this.props.match.params) {
            name = this.props.match.params.name
            if (name === 'trending' || name === 'new') {
                axios.get("http://178.128.83.129:3000/api/home/post_" + name + "?limit=8&page=1")
                    .then(res => {
                        if (this.mounted) {
                            this.setState({
                                posts: res.data.posts,
                                totalRecord: res.data.total,
                                loading: false
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }


    }

    componentWillUnmount() {
        this.mounted = false;
    }

    likePost = (e, id) => {
        e.preventDefault();
        axios.post(`http://178.128.83.129:3000/api/posts/${id}/like`)
            .then(res => {
                console.log(res)
                let post = res.data.post;
                let newArr = this.state.posts;
                for (let x of newArr) {
                    if (x._id === id) {
                        Object.assign(x, post);
                    }
                }
                this.setState({
                    posts: newArr
                })
            }).catch(err => {
                console.log(err)
            })
    }

    showMore(nextPage) {
        this.setState({
            buttonLoadMore: true
        })
        let name = this.props.match.params.name;
        axios.get("http://178.128.83.129:3000/api/home/post_" + name + "?limit=4&page=" + this.state.nextPage)
            .then(res => {
                const arr = this.state.posts;
                arr.push(...res.data.posts);
                this.setState({
                    nextPage: this.state.nextPage + 1,
                    posts: arr,
                    buttonLoadMore: false
                })
            }).catch(err => {
                this.setState({
                    errors: err,
                    buttonLoadMore: false
                })
            })
    }


    render() {
        if (this.state.loading === true) return (<Loader />)
        let name;
        if (this.props.match.params) {
            name = this.props.match.params.name
            if (name !== 'trending' && name !== 'new') {
                return (<Page404 />)
            }
        }
        return (<div className="search-container">
            <div className="container search-container-child">
                <div className="row search-section-title">{name.toUpperCase()}</div>
                <div className="row search-row">
                    {this.state.posts && this.state.posts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    <div className="section-image-holder" style={{ backgroundImage: "url(" + x.images[0] + ")" }}></div>
                                    <p className="item-cover" >
                                        {!x.isLiked && <span className="section-item-view" onClick={(e) => this.likePost(e, x._id)} >{x.likes.length} <i className="far fa-heart" /></span>}
                                        {x.isLiked && <span className="section-item-view" onClick={(e) => this.likePost(e, x._id)} >{x.likes.length} <i className="fas fa-heart" /></span>}
                                    </p>
                                </div>
                            </NavLink>
                            <div className="section-item-title"><NavLink to={"/posts/" + x._id}>{x.title}</NavLink></div>
                            <div className="section-author-name"><NavLink to={"/user_profile/" + x.author._id}>{x.author.fullName}</NavLink></div>
                            <div className="section-rating-date">
                                <i className="far fa-eye" /> {x.views}
                                <span className="section-item-date" style={{ paddingTop: '2px' }}> {this.getFormattedDate(x.datetime)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {(this.state.posts.length < this.state.totalRecord) &&
                    <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={() => this.showMore(this.state.nextPage)}>
                        {!this.state.buttonLoadMore && <button type="submit" className="btn btn-more">XEM THÊM</button>}
                        {this.state.buttonLoadMore && <button type="submit" className="btn btn-more"><i className="fa fa-spinner fa-spin"></i></button>}
                    </div>}
            </div>
            <Footer />
        </div>)
    }
}

export default ViewAll;