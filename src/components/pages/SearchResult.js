import React, { Component } from "react";
import Footer from "../layout/Footer";
import Loader from '../common/LoaderVer2';
import axios from "axios";
import queryString from 'query-string';
import '../../css/SearchResult.css';
import { NavLink } from "react-router-dom";

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            nextPage: 3,
            buttonLoadMore: false,
            totalRecord: 0,
            categoryName: ''
        };
    }

    componentDidMount() {
        localStorage.removeItem("create_id");
        localStorage.removeItem("action");
        let params = queryString.parse(this.props.location.search);
        let data = {
            content: params.content,
            categoryid: params.categoryid
        }
        let apiLink = "http://178.128.83.129:3000/api/search?page=1&limit=8";
        if (data.content) {
            apiLink = apiLink.concat("&content=" + data.content);
        }
        if (data.categoryid) {
            apiLink = apiLink.concat("&categoryid=" + data.categoryid);
        }
        this.mounted = true;
        axios.get(apiLink)
            .then(res => {
                console.log(res);
                if (this.mounted) {
                    this.setState({
                        posts: res.data.posts,
                        loading: false,
                        totalRecord: res.data.total,
                        categoryName: res.data.category
                    });
                }
            }).catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                loading: true
            })
            let params = queryString.parse(this.props.location.search);
            let data = {
                content: params.content,
                categoryid: params.categoryid
            }
            let apiLink = "http://178.128.83.129:3000/api/search?page=1&limit=8";
            if (data.content) {
                apiLink = apiLink.concat("&content=" + data.content);
            }
            if (data.categoryid) {
                apiLink = apiLink.concat("&categoryid=" + data.categoryid);
            }
            this.mounted = true;
            axios.get(apiLink)
                .then(res => {
                    if (this.mounted) {
                        this.setState({
                            posts: res.data.posts,
                            loading: false,
                            totalRecord: res.data.total,
                            categoryName: res.data.category
                        });
                    }
                }).catch(error => {
                    console.log(error)
                    this.setState({
                        loading: false
                    })
                });
        }

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

    componentWillUnmount() {
        this.mounted = false;
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

    showMore(nextPage) {
        this.setState({
            buttonLoadMore: true
        })
        let params = queryString.parse(this.props.location.search);
        let data = {
            content: params.content,
            categoryid: params.categoryid
        }
        let apiLink = "http://178.128.83.129:3000/api/search?page=" + nextPage + "&limit=4";
        if (data.content) {
            apiLink = apiLink.concat("&content=" + data.content);
        }
        if (data.categoryid) {
            apiLink = apiLink.concat("&categoryid=" + data.categoryid);
        }
        axios.get(apiLink)
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
        console.log(this.state.totalRecord)
        let params = queryString.parse(this.props.location.search);
        if (this.state.loading === true) return (<Loader />)
        return (
            <div className="search-container">
                <div className="container search-container-child">
                    {this.state.categoryName && <div className="row search-section-title">{this.state.categoryName.toUpperCase()}</div>}
                    {params.content && <div className="row search-section-result">{this.state.totalRecord} kết quả cho &nbsp;<span className="search-pink-text">{params.content}</span></div>}
                    <div className="row search-row">
                        {this.state.posts && this.state.posts.map((x, index) => (
                            <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                                <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                    <div className="section-image-container">
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
                        {/* {this.state.posts.length === 0 && <div>Không tìm thấy kết quả</div>} */}
                    </div>
                    {(this.state.posts.length < this.state.totalRecord) &&
                        <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={() => this.showMore(this.state.nextPage)}>
                            {!this.state.buttonLoadMore && <button type="submit" className="btn btn-more">XEM THÊM</button>}
                            {this.state.buttonLoadMore && <button type="submit" className="btn btn-more"><i class="fa fa-spinner fa-spin"></i></button>}
                        </div>}
                </div>
                <Footer />
            </div>);
    }
}

export default SearchResult;