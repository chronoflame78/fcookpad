import React, { Component } from "react";
import Category from "../common/Category";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { apiURL } from "../../config/Constant";
import { getFormattedViews, getFormattedDate } from "../../utils/getFormat.js";
import { removeStorage } from "../../utils/removeStorage";
import "../../css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post_new: [],
      post_trending: [],
      itemsToShowTrending: 4,
      itemsToShowNew: 4,
      auth: false,
    };
    this.showMoreTrending = this.showMoreTrending.bind(this);
    this.showMoreNew = this.showMoreNew.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      this.setState({
        loading: true,
      });
      axios
        .all([
          axios.get(`${apiURL}/home/recipe_trending?page=1&limit=8`),
          axios.get(`${apiURL}/home/recipe_new?page=1&limit=8`),
        ])
        .then(
          axios.spread((...res) => {
            if (this.mounted) {
              this.setState({
                post_trending: res[0].data.recipes,
                post_new: res[1].data.recipes,
                loading: false,
              });
            }
          })
        )
        .catch((error) => {

        });
    }
  }
  componentDidMount() {
    removeStorage();
    this.mounted = true;
    axios
      .all([
        axios.get(`${apiURL}/categories/order`),
        axios.get(`${apiURL}/home/recipe_trending?page=1&limit=8`),
        axios.get(`${apiURL}/home/recipe_new?page=1&limit=8`),
      ])
      .then(
        axios.spread((...res) => {
          if (this.mounted) {
            this.setState({
              category: res[0].data.data.categorys,
              post_trending: res[1].data.recipes,
              post_new: res[2].data.recipes,
              loading: false,
            });
          }
        })
      )
      .catch((error) => {

      });

    if (this.props.location.state) {
      var { createSuccess } = this.props.location.state;
      if (createSuccess === true) {
        toast.success("Create successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.props.history.replace("", null);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  //show more trending recipes
  showMoreTrending() {
    this.state.itemsToShowTrending === 4
      ? this.setState({ itemsToShowTrending: 8 })
      : this.setState({ itemsToShowTrending: 4 });
  }

  //show more new recipes
  showMoreNew() {
    this.state.itemsToShowNew === 4
      ? this.setState({ itemsToShowNew: 8 })
      : this.setState({ itemsToShowNew: 4 });
  }

  //handle like button click
  likeRecipe = (e, id) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/recipes/${id}/like`)
      .then((res) => {
        let post = res.data.recipe;
        let newArr = this.state.post_trending;
        let newArr2 = this.state.post_new;
        let x = newArr.findIndex((a) => a._id === id);
        if (x !== -1) newArr[x] = post;
        let y = newArr2.findIndex((b) => b._id === id);
        if (y !== -1) newArr2[y] = post;
        this.setState({
          post_trending: newArr,
          post_new: newArr2,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          swal("Bạn cần đăng nhập để like bài post này!", {
            buttons: {
              cancel: "Đóng",
              login: {
                text: "Đăng nhập ngay",
                value: "login",
              },
            },
          }).then((value) => {
            switch (value) {
              case "login":
                this.props.history.push("/login");
                break;
              default:
                break;
            }
          });
        }
      });
  };

  render() {
    let trendingPosts = [];
    if (this.state.post_trending < 4) {
      trendingPosts = this.state.post_trending;
    } else {
      trendingPosts = this.state.post_trending.slice(
        0,
        this.state.itemsToShowTrending
      );
    }
    let newPosts = [];
    if (this.state.post_new < 4) {
      newPosts = this.state.post_new;
    } else {
      newPosts = this.state.post_new.slice(0, this.state.itemsToShowNew);
    }
    if (this.state.loading === true) return <Loader />;
    return (
      <div>
        <Category suggestions={this.state.category} />
        <div className="container home-container-child">
          <div className="row search-section-title home-section-title">
            <Link to="/view_all/trending">NỔI BẬT</Link>
            <div className="home-view-all">
              <Link to="/view_all/trending">
                Xem tất cả <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
          <div className="row search-row">
            {trendingPosts &&
              trendingPosts.map((x, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 py-4 col-12"
                >
                  <NavLink
                    to={"/posts/" + x._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="section-image-container">
                      <p className="item-cover">
                        {!x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likeRecipe(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="far fa-heart like-icon" />
                          </span>
                        )}
                        {x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likeRecipe(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="fas fa-heart like-icon" />
                          </span>
                        )}
                      </p>
                      <div className="section-image-holder">
                        <img
                          style={{
                            objectFit: "cover",
                            height: "100%",
                            width: "100%",
                          }}
                          alt=""
                          src={x.images[0]}
                        />
                      </div>
                    </div>
                  </NavLink>
                  <div className="section-item-title">
                    <NavLink to={"/posts/" + x._id}>{x.title}</NavLink>
                  </div>
                  <div className="section-author-name">
                    <NavLink to={"/user_profile/" + x.author._id}>
                      {x.author.fullName}
                    </NavLink>
                  </div>
                  <div className="section-rating-date">
                    <i className="far fa-eye" /> {getFormattedViews(x.views)}
                    <span
                      className="section-item-date"
                      style={{ paddingTop: "2px" }}
                    >
                      {getFormattedDate(x.datetime)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="row section-see-more"
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              borderBottom: "1px solid #ff5f6d",
            }}
          >
            {this.state.post_trending &&
              this.state.post_trending.length > 4 &&
              this.state.itemsToShowTrending === 4 && (
                <button
                  onClick={this.showMoreTrending}
                  className="btn btn-more-pink"
                >
                  XEM THÊM
                </button>
              )}
            {this.state.itemsToShowTrending !== 4 && (
              <button
                onClick={this.showMoreTrending}
                className="btn btn-more-pink"
              >
                THU GỌN
              </button>
            )}
          </div>
          <div
            className="row search-section-title home-section-title"
            style={{ paddingTop: "20px" }}
          >
            <Link to="/view_all/new">MỚI NHẤT</Link>
            <div className="home-view-all">
              <Link to="/view_all/new">
                Xem tất cả <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
          <div className="row search-row">
            {newPosts &&
              newPosts.map((x, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 py-4 col-12"
                >
                  <NavLink
                    to={"/posts/" + x._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="section-image-container">
                      <div className="section-image-holder">
                        <img 
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%"
                          }}
                          src={x.images[0]}
                          alt=""
                        />
                      </div>
                      <p className="item-cover">
                        {!x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likeRecipe(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="far fa-heart like-icon" />
                          </span>
                        )}
                        {x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likeRecipe(e, x._id)}
                          >
                            {x.likes.length}{" "}
                            <i className="fas fa-heart like-icon" />
                          </span>
                        )}
                      </p>
                    </div>
                  </NavLink>
                  <div className="section-item-title">
                    <NavLink to={"/posts/" + x._id}>{x.title}</NavLink>
                  </div>
                  <div className="section-author-name">
                    <NavLink to={"/user_profile/" + x.author._id}>
                      {x.author.fullName}
                    </NavLink>
                  </div>
                  <div className="section-rating-date">
                    <i className="far fa-eye" /> {getFormattedViews(x.views)}
                    <span
                      className="section-item-date"
                      style={{ paddingTop: "2px" }}
                    >
                      {getFormattedDate(x.datetime)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="row section-see-more"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              borderBottom: "1px solid #ff5f6d",
            }}
          >
            {this.state.post_new &&
              this.state.post_new.length > 4 &&
              this.state.itemsToShowNew === 4 && (
                <button
                  onClick={this.showMoreNew}
                  className="btn btn-more-pink"
                >
                  XEM THÊM
                </button>
              )}
            {this.state.itemsToShowNew !== 4 && (
              <button onClick={this.showMoreNew} className="btn btn-more-pink">
                THU GỌN
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
