import React, { Component } from 'react'
import axios from "axios";
import Footer from '../layout/Footer';
import SectionTop from '../common/SectionTop';
import '../../css/UserProfile.css';
import Avatar from '../common/Avatar';
import { NavLink } from "react-router-dom";
import '../../css/Section.css';
const isEmpty = require("is-empty");
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            posts: [],
            top: [],
            nextPage: 2
        };
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

    showMore(nextPage) {
        axios.get("http://178.128.83.129:3000/api/users/"+this.props.match.params.id+"/posts?page="+nextPage)
        .then(res =>{
            const arr = this.state.posts;
            arr.push(...res.data.allPosts);
            this.setState({
                nextPage: this.state.nextPage + 1,
                posts: arr
            })
            console.log(this.state.posts)
        }).catch(err => {
            console.log(err)
        })  
    }
    
    componentDidMount(){
        this.mounted = true;
        axios.all([axios.get("http://178.128.83.129:3000/api/users/"+this.props.match.params.id),
        axios.get("http://178.128.83.129:3000/api/users/"+this.props.match.params.id+"/posts?page=1"),
        axios.get("http://178.128.83.129:3000/api/users/"+this.props.match.params.id+"/top")])        
        .then(axios.spread((...res) => {
            console.log(...res)
            if (this.mounted) {
                this.setState({
                    userInfo: res[0].data.user,
                    posts: res[1].data.allPosts,
                    top: res[2].data.topPost
                });
            }
        })) 
        .catch(err =>
            console.log(err)
         );
    }

    componentWillUnmount() {
        this.mounted = false;
      }

    render() {
        return (
            <div className="userp-container">
            <div className="container">
                <div className="row userp-row">
                    <div className="col-md-4 userp-info-container">
                        <Avatar className="userp-avatar" image={"/images/user_white.png"} size={140} tooltip={false}/>
                        <div className="userp-name">{this.state.userInfo.name}</div>
                        <div className="userp-smalltext">Giới tính: Nam</div>
                        <div className="userp-smalltext">Ngày sinh: 01/07/2000</div>
                        <div className="userp-num"><div className="userp-left">Bài viết:</div><div className="userp-right">145</div></div>
                        <div className="userp-views"><div className="userp-left">Lượt xem:</div> <div className="userp-right">1020</div></div>
                        <div className="userp-likes"><div className="userp-left">Lượt thích:</div> <div className="userp-right">220</div></div>
                        <div className="userp-smalltext-end">Gia nhập kể từ ngày: 01/07/2020</div>
                    </div>
                    <div className="col-md-8">
                        <div className="userp-title">
                            MỘT CHÚT VỀ TÔI
                        </div>
                        <div className="userp-description">
                        Không chỉ có đam mê về đồ ăn, tôi còn đam mê làm bố, thích được mọi người gọi mình là một daddy. Hôm nay là một ngày đẹp trời. Sinh nhật của tôi là 01/07/2000. 1..2..3..Dzô
                        </div>
                        <SectionTop sectionName="NỔI BẬT" posts={this.state.top}/>
                    </div>
                </div>
                
            </div>
            <div className="container container-max-custom">
                <div className="row section-title">BÀI ĐĂNG</div>
                <div className="row">
                    {!isEmpty(this.state.posts)&&this.state.posts.map((x, index) => (
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
                {(this.state.posts.length < this.state.userInfo.posts)&&
                <div className="row section-see-more" style={{ marginLeft: '0px', marginRight: '0px' }} onClick={() => this.showMore(this.state.nextPage)} >
                XEM THÊM
            </div>}
                
            </div>

            <Footer/>
            </div>
        )
    }
}


export default UserProfile;