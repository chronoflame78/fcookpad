import React, { Component } from "react";
import Section from '../common/Section';
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
        loading: true
      };     
    }
  
    componentDidMount() {
      localStorage.removeItem("create_id");
      localStorage.removeItem("action");
      let params = queryString.parse(this.props.location.search);
      let data = {
        key: params.key,
        category: params.category
      }
      this.mounted = true;
      axios.get("http://178.128.83.129:3000/api/home/post_new")
            .then(res => {
                if (this.mounted) {
                    this.setState({
                        posts: res.data.posts,
                        loading: false
                    });
                }
            }).catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                })
            });
     
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

    showMore() {
        
    }
    
    render() {
      let params = queryString.parse(this.props.location.search);
      if(this.state.loading === true) return(<Loader/>)
      return(
      <div className="search-container">
        <div className="container container-max-custom">
                {params.category && <div className="row section-title">CATEGORY NAME</div>}
                {params.key && <div className="row section-title">kết quả cho</div>}
                <div className="row">
                    {this.state.posts && this.state.posts.map((x, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 py-4">
                            <NavLink to={"/posts/" + x._id} style={{ textDecoration: 'none' }}>
                                <div className="section-image-container" style={{ backgroundImage: "url(" + x.images[0] + ")" }}>
                                    <div className="item-cover" >
                                        <span className="section-item-view">{x.views} <i className="fa fa-eye" /></span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="section-item-title"><NavLink to={"/posts/" + x._id}>{x.title}</NavLink></div>
                            <div className="section-author-name"><NavLink to={"/user_profile/"+x.author._id}>{x.author.fullName}</NavLink></div>
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
                    {this.state.itemsToShow === 4 && <button className="btn btn-more">XEM THÊM</button>}
                    {this.state.itemsToShow !== 4 && <button className="btn btn-more">THU GỌN</button>}
                </div>
            </div>
        <Footer/>
      </div>);
    }
  }

export default SearchResult;