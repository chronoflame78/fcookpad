import React, { Component } from "react";
import axios from "axios";
import "../../css/Create.css";
import Footer from "../layout/Footer";
import { apiURL } from "../../config/Constant";
const isEmpty = require("is-empty");

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      file: "",
      imagePreviewUrl: "",
      video: "",
      errors: {},
      category: [],
      dropdown_value: "",
      buttonLoading: false,
      loading: true,
      error404: false,
      isOpen: false,
      categoryName: "",
    };
    this.inputImage = React.createRef();
    this.categoryRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  //handle image changes
  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  //handle cancle submit button onclick
  cancelSubmit = (e) => {
    e.preventDefault();
    let returnURL = localStorage.getItem("returnURL");
    if (returnURL === "account_setting") {
      this.props.history.push({
        pathname: "/account_settings",
        state: {
          postTab: 2,
        },
      });
    } else {
      this.props.history.push("/");
    }
  };

  toggleMenuOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onCategoryClick = (e, id, name) => {
    this.setState({
      isOpen: false,
      categoryName: name,
      dropdown_value: id,
    });
  };

  handleClickOutside(event) {
    if (this.categoryRef && this.categoryRef.current) {
      if (!this.categoryRef.current.contains(event.target)) {
        this.setState({
          isOpen: false,
        });
      }
    }
  }

  //handle change step
  onStepClick = (e, index) => {
    e.preventDefault();
    let doneStep2 = localStorage.getItem("doneStep2");
    if (index === "2") {
      this.props.history.push("/step2/" + this.props.match.params.id);
    }
    if (doneStep2 && index === "3") {
      this.props.history.push("/step3/" + this.props.match.params.id);
    }
  };

  componentDidMount() {
    this.mounted = true;
    let id = this.props.match.params.id;
    axios
      .all([
        axios.get(`${apiURL}/home/category`),
        axios.get(`${apiURL}/users/recipe/${id}`),
      ])
      .then(
        axios.spread((...res) => {
          if (this.mounted) {
            if (res[1].data.recipe.video) {
              let video_url =
                "https://www.youtube.com/watch?v=" + res[1].data.recipe.video;
              this.setState({
                category: res[0].data.data.categorys,
                title: res[1].data.recipe.title,
                description: res[1].data.recipe.description,
                imagePreviewUrl: res[1].data.recipe.images[0],
                video: video_url,
                dropdown_value: res[1].data.recipe.category,
                loading: false,
              });
            } else {
              this.setState({
                category: res[0].data.data.categorys,
                title: res[1].data.recipe.title,
                description: res[1].data.recipe.description,
                imagePreviewUrl: res[1].data.recipe.images[0],
                dropdown_value: res[1].data.recipe.category,
                loading: false,
              });
            }
          }
        })
      )
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            this.setState({
              error404: true,
              loading: false,
            });
          } else {
            this.setState({
              errors: error.response.data,
            });
          }
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    let action = localStorage.getItem("action");
    let id = this.props.match.params.id;
    if (
      (this.state.video && this.state.video.length !== 43) ||
      (this.state.video &&
        this.state.video.indexOf("https://www.youtube.com/watch?v=") === -1)
    ) {
      this.setState({
        errors: { message: "Sai định dạng đường dẫn đến video trên youtube" },
      });
    } else {
      this.setState({
        buttonLoading: true,
      });
      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("description", this.state.description);
      formData.append("step", 1);
      formData.append("imageCover", this.state.file);
      formData.append("category", this.state.dropdown_value);
      if (this.state.video){
        formData.append(
          "video",
          this.state.video.slice(32)
        );
      }
      else{
        formData.append(
          "video", ""
        );
      }
        
      axios
        .post(`${apiURL}/recipes/` + id + "/update", formData)
        .then((res) => {
          if (action === "update") {
            this.props.history.push({
              pathname: "/account_settings",
              state: {
                editSuccess: true,
                postTab: 2,
              },
            });
          } else {
            this.props.history.push("/step2/" + id);
          }
        })
        .catch((err) => {
          this.setState({
            errors: err.response.data,
            buttonLoading: false
          });
        });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      this.setState({
        file: "",
        imagePreviewUrl: "",
      });
    }
  }

  render() {
    let action = localStorage.getItem("action");
    let doneStep2 = localStorage.getItem("doneStep2");
    if (!doneStep2) doneStep2 = false;
    let { imagePreviewUrl, video } = this.state;
    let $imagePreview = null;
    let youtube_video = null;
    let embed_video = "";
    let categoryDiv, dropdownText;

    if (!this.state.categoryName) {
      dropdownText = "Danh mục";
    } else {
      dropdownText = this.state.categoryName;
    }

    if (imagePreviewUrl) {
      $imagePreview = (
        <div
          className="img-preview"
          onClick={() => this.inputImage.current.click()}
        >
          <div
            className="picture-cover"
            style={{
              width: "100%",
              height: "705px",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
              }}
              alt=""
              src={imagePreviewUrl}
            />
          </div>
        </div>
      );
    } else {
      $imagePreview = (
        <div
          className="previewText"
          onClick={() => this.inputImage.current.click()}
        >
          <img
            className="create-post-image"
            alt=""
            src="/images/photo_icon.png"
          />
          <div className="create-txt-field1">
            Hôm nay có món gì vậy bếp trưởng?
          </div>
          <div className="create-txt-field2">
            Hãy chia sẻ hình ảnh để mọi người chiêm ngưỡng
          </div>
          <div className="create-txt-field3">tác phẩm của bạn nào :D</div>
        </div>
      );
    }
    if (video.indexOf("https://www.youtube.com/watch?v=") > -1) {
      embed_video = "https://www.youtube.com/embed/" + video.slice(32);
      youtube_video = (
        <iframe
          title="video"
          style={{ margin: "0 0 30px 0" }}
          width="100%"
          height="250px"
          src={embed_video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    let items = [
      {
        number: "1",
        name: "Món ăn mới",
        active: true,
        done: false,
      },
      {
        number: "2",
        name: "Nguyên liệu",
        active: false,
        done: true,
      },
      {
        number: "3",
        name: "Cách làm",
        active: false,
        done: doneStep2,
      },
    ];
    if (this.state.loading) {
      return (
        <div className="outer-div">
          <div className="container create-bg-white">
            <div className="timeline">
              {!doneStep2 && (
                <div
                  className="timeline-progress"
                  style={{ width: "67%" }}
                ></div>
              )}
              {doneStep2 && (
                <div
                  className="timeline-progress"
                  style={{ width: "100%" }}
                ></div>
              )}
              <div className="timeline-items">
                {items.map((item, i) => (
                  <div
                    onClick={(e) => this.onStepClick(e, item.number)}
                    key={i}
                    className={
                      "timeline-item" +
                      (item.active ? " active" : "") +
                      (item.done ? " done" : "")
                    }
                  >
                    <div
                      className={"timeline-number" + (item.done ? " done" : "")}
                    >
                      {item.number}
                    </div>
                    <div className="timeline-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="create-loading-container">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    if (this.state.isOpen) {
      categoryDiv = (
        <div ref={this.categoryRef} className="create-category-abs">
          <div className="row create-cate-item-container">
            {this.state.category.map((x, index) => (
              <div
                key={index}
                onClick={(e) => this.onCategoryClick(e, x._id, x.title)}
                className="col-12 create-cate-item"
              >
                {x.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="outer-div">
        <div className="container create-bg-white">
          <div className="timeline">
            {!doneStep2 && (
              <div className="timeline-progress" style={{ width: "67%" }}></div>
            )}
            {doneStep2 && (
              <div
                className="timeline-progress"
                style={{ width: "100%" }}
              ></div>
            )}
            <div className="timeline-items">
              {items.map((item, i) => (
                <div
                  onClick={(e) => this.onStepClick(e, item.number)}
                  key={i}
                  className={
                    "timeline-item" +
                    (item.active ? " active" : "") +
                    (item.done ? " done" : "")
                  }
                >
                  <div
                    className={"timeline-number" + (item.done ? " done" : "")}
                  >
                    {item.number}
                  </div>
                  <div className="timeline-name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="imgPreview">{$imagePreview}</div>
          <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group create-form-group-name">
              <input
                autoComplete="off"
                maxLength="100"
                onChange={this.onChange}
                id="title"
                value={this.state.title}
                type="text"
                className="form-control create-input-name"
                placeholder=" "
              />
              <label className="create-label-name" htmlFor="title">
                Tên món ăn *
              </label>
            </div>
            <div className="form-group create-form-group-description">
              <textarea
                spellCheck="false"
                maxLength="1000"
                onChange={this.onChange}
                id="description"
                style={{ resize: "none" }}
                value={this.state.description}
                className="form-control create-input-description"
                rows="3"
                placeholder=" "
              ></textarea>
              <label className="create-label-name" htmlFor="description">
                Mô tả món ăn *
              </label>
            </div>

            <div className="row">
              <div className="col-md-6 create-dropdown-container">
                <div className="form-group create-dropdown edit-dropdown">
                  <div
                    className="input-group-prepend"
                    onClick={() => this.toggleMenuOpen()}
                  >
                    {!this.state.isOpen && (
                      <div className="create-category">
                        <span className="create-dropdown-txt">
                          {dropdownText}&nbsp;
                        </span>
                        <i className="fas fa-chevron-down down-arrow"></i>
                      </div>
                    )}
                    {this.state.isOpen && (
                      <div className="create-category">
                        <span className="create-dropdown-pink-txt">
                          {dropdownText}&nbsp;
                        </span>
                        <i className="fas fa-chevron-up up-arrow"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="dropdown-container">{categoryDiv}</div>
              </div>
              <div className="col-md-6 col-xl-6">
                <div className="form-group create-form-group create-form-group-youtube">
                  <input
                    autoComplete="off"
                    maxLength="100"
                    onChange={this.onChange}
                    id="video"
                    value={this.state.video}
                    type="text"
                    className="form-control create-input-name create-input-yt"
                    placeholder=" "
                  />
                  <label
                    className="create-label-name create-input-yt-label"
                    htmlFor="video"
                  >
                    Link youtube video{" "}
                    <span className="create-mini-text">
                      (Ví dụ: https://www.youtube.com/watch?v=RBYDnaP3sto)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">{youtube_video}</div>
            </div>

            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              ref={this.inputImage}
              id="upload_image"
              onChange={(e) => this.handleImageChange(e)}
            />
            {!isEmpty(this.state.errors) && (
              <div className="alert alert-danger alert-position">
                {this.state.errors.message}
              </div>
            )}
          </form>
          <div className="create-form">
            <div className="create-button-container">
              <button
                className="btn btn-gray"
                onClick={(e) => this.cancelSubmit(e)}
              >
                Hủy
              </button>
              {this.state.buttonLoading && (
                <button type="submit" className="btn btn-pink">
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              )}
              {!this.state.buttonLoading && action !== "update" && (
                <button
                  type="submit"
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Tiếp
                </button>
              )}
              {!this.state.buttonLoading && action === "update" && (
                <button
                  type="submit"
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Lưu
                </button>
              )}
            </div>
            <div className="create-button-container-phone">
              <button
                className="btn btn-gray"
                onClick={(e) => this.cancelSubmit(e)}
              >
                Hủy
              </button>
              {!this.state.buttonLoading && action !== "update" && (
                <div
                  className="arrow-next"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <i className="fas fa-chevron-right"></i>
                </div>
              )}
              {!this.state.buttonLoading && action === "update" && (
                <div
                  className="arrow-next"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <i className="fas fa-check"></i>
                </div>
              )}
              {this.state.buttonLoading && (
                <div type="submit" className="">
                  <i className="fa fa-spinner fa-spin"></i>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Edit;
