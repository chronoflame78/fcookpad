import React, { Component } from "react";
import axios from "axios";
import "../../css/Create.css";
import Footer from "../layout/Footer";
import { apiURL } from "../../config/Constant";
import { removeStorage } from "../../utils/removeStorage";
const isEmpty = require("is-empty");

class Create extends Component {
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
      isOpen: false,
      categoryName: ""
    };
    this.inputImage = React.createRef();
    this.categoryRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  cancelSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  toggleMenuOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log(this.state.isOpen);
  }
  

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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.mounted = true;
    removeStorage();
    axios
      .get(`${apiURL}/home/category`)
      .then((res) => {
        console.log(res);
        if (this.mounted) {
          this.setState({
            category: res.data.data.categorys,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      (this.state.video && this.state.video.length !== 43) ||
      (this.state.video &&
        this.state.video.indexOf("https://www.youtube.com/watch?v=") === -1)
    ) {
      this.setState({ errors: { message: "Incorrect youtube video url" } });
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
      if (this.state.video)
        formData.append(
          "video",
          this.state.video.slice(32)
          // "https://www.youtube.com/embed/" + this.state.video.slice(32)
        );
      axios
        .post(`${apiURL}/recipes/create`, formData)
        .then((res) => {
          console.log(res);
          const { id } = res.data;
          this.props.history.push("/step2/" + id);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          this.setState({
            errors: err.response.data,
            buttonLoading: false,
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
    }else{
      this.setState({
        file:"",
        imagePreviewUrl:""
      })
    }
  }

  render() {
    let { imagePreviewUrl, video } = this.state;
    let $imagePreview = null;
    let youtube_video = null;
    let embed_video = "";
    let categoryDiv, dropdownText;
    console.log(this.state.category);
    if (!this.state.categoryName) {
      dropdownText = "Danh mục";
    } else {
      dropdownText = this.state.categoryName;
    }
    if (imagePreviewUrl) {
      $imagePreview = (
        <div
          className="img-preview"
          onClick={() => console.log(this.inputImage.current.click())}
        >
          <div
            className="picture-cover"
            style={{
              width: "100%",
              height: "705px",
              backgroundImage: "url(" + imagePreviewUrl + ")",
            }}
          ></div>
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
      },
      {
        number: "2",
        name: "Nguyên liệu",
        active: false,
      },
      {
        number: "3",
        name: "Cách làm",
        active: false,
      },
    ];
    if (this.state.loading) {
      return (
        <div className="outer-div">
          <div className="container create-bg-white">
            <div className="timeline">
              <div className="timeline-progress" style={{ width: "33%" }}></div>
              <div className="timeline-items">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={"timeline-item" + (item.active ? " active" : "")}
                  >
                    <div className="timeline-number">{item.number}</div>
                    <div className="timeline-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="create-loading-container">
              <i class="fa fa-spinner fa-spin"></i>
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
            <div className="timeline-progress" style={{ width: "33%" }}></div>
            <div className="timeline-items">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={"timeline-item" + (item.active ? " active" : "")}
                >
                  <div className="timeline-number">{item.number}</div>
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
              <label className="create-label-name" for="description">
                Mô tả món ăn *
              </label>
            </div>

            <div className="row">
              <div className="col-xl-6 create-dropdown-container">
                <div className="form-group create-dropdown">
                  <div className="category-select">
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
              </div>
              <div className="col-xl-6">
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
                    for="video"
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
              {!this.state.buttonLoading && (
                <button
                  type="submit"
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Tiếp
                </button>
              )}
              {this.state.buttonLoading && (
                <button type="submit" className="btn btn-pink">
                  <i class="fa fa-spinner fa-spin"></i>
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
              {!this.state.buttonLoading && (
                <div
                  className="arrow-next"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <i class="fas fa-chevron-right"></i>
                </div>
              )}
              {this.state.buttonLoading && (
                <div type="submit" className="">
                  <i class="fa fa-spinner fa-spin"></i>
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

export default Create;
