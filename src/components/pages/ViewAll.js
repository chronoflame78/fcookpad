import React, { Component } from "react";
import Footer from "../layout/Footer";
import Loader from "../common/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Page404 from "./error/Page404";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import swal from "sweetalert";
import { TRENDING, NEW } from "../../config/Constant";
import { apiURL } from "../../config/Constant";
import { getFormattedViews, getFormattedDate } from "../../utils/getFormat.js";
import { removeStorage } from "../../utils/removeStorage";

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

  componentDidMount() {
    removeStorage();
    this.mounted = true;
    let name;
    if (this.props.match.params) {
      name = this.props.match.params.name;
      if (name === "trending" || name === "new") {
        axios
          .get(`${apiURL}/home/recipe_` + name + "?limit=8&page=1")
          .then((res) => {
            if (this.mounted) {
              this.setState({
                posts: res.data.recipes,
                totalRecord: res.data.total,
                loading: false,
              });
            }
          })
          .catch((err) => {

          });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      let name;
      if (this.props.match.params) {
        name = this.props.match.params.name;
        if (name === "trending" || name === "new") {
          axios
            .get(`${apiURL}/home/recipe_` + name + "?limit=8&page=1")
            .then((res) => {
              if (this.mounted) {
                this.setState({
                  posts: res.data.recipes,
                  totalRecord: res.data.total,
                });
              }
            })
            .catch((err) => {

            });
        }
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  //handle like button click
  likeRecipe = (e, id) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/recipes/${id}/like`)
      .then((res) => {
        let post = res.data.recipe;
        let newArr = this.state.posts;
        for (let x of newArr) {
          if (x._id === id) {
            Object.assign(x, post);
          }
        }
        this.setState({
          posts: newArr,
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

  showMore(nextPage) {
    this.setState({
      buttonLoadMore: true,
    });
    let name = this.props.match.params.name;
    axios
      .get(
        `${apiURL}/home/recipe_` + name + "?limit=4&page=" + this.state.nextPage
      )
      .then((res) => {
        const arr = this.state.posts;
        arr.push(...res.data.recipes);
        this.setState({
          nextPage: this.state.nextPage + 1,
          posts: arr,
          buttonLoadMore: false,
        });
      })
      .catch((err) => {
        this.setState({
          errors: err,
          buttonLoadMore: false,
        });
      });
  }

  render() {
    if (this.state.loading === true) return <Loader />;
    let name;
    if (this.props.match.params) {
      name = this.props.match.params.name;

      if (name !== "trending" && name !== "new") {
        return <Page404 />;
      }
      if (name === "trending") {
        name = TRENDING;
      }
      if (name === "new") {
        name = NEW;
      }
    }
    return (
      <div className="search-container">
        <div className="container search-container-child">
          <div className="row search-section-title">{name}</div>
          <div className="row search-row">
            {this.state.posts &&
              this.state.posts.map((x, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 py-4 col-12"
                >
                  <NavLink
                    to={"/posts/" + x._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="section-image-container"
                    >
                      <div
                        className="section-image-holder"
                      >
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
                            {x.likes.length} <i className="far fa-heart" />
                          </span>
                        )}
                        {x.isLiked && (
                          <span
                            className="section-item-view"
                            onClick={(e) => this.likeRecipe(e, x._id)}
                          >
                            {x.likes.length} <i className="fas fa-heart" />
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
                      {" "}
                      {getFormattedDate(x.datetime)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {this.state.posts.length < this.state.totalRecord && (
            <div
              className="row section-see-more"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              {!this.state.buttonLoadMore && (
                <button
                  type="submit"
                  className="btn btn-more-pink"
                  onClick={() => this.showMore(this.state.nextPage)}
                >
                  XEM THÊM
                </button>
              )}
              {this.state.buttonLoadMore && (
                <button type="submit" className="btn btn-more-pink">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

ViewAll.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ViewAll);
