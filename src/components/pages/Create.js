import React, { Component } from "react";
import axios from "axios";
import "../../css/Create.css";
import Footer from "../layout/Footer";
const isEmpty = require("is-empty");
const items = [
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
    };
    this.inputImage = React.createRef();
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  cancelSubmit = (e) => {
    e.preventDefault();
    window.open("/", "_self");
  };

  onStepClick = (e, index) =>{
    console.log(index)
    e.preventDefault();
    if(index !== '1'){
      this.handleSubmit(e, index);
    }
  }

  componentDidMount() {
    this.mounted = true;
    let create_id = localStorage.getItem("create_id");
    if (create_id) {
      axios
        .all([
          axios.get("https://api.mlemmlem.site/api/home/category"),
          axios.get("https://api.mlemmlem.site/api/posts/" + create_id),
        ])
        .then(
          axios.spread((...res) => {
            console.log(res[1]);
            if (this.mounted) {
              let video_url = res[1].data.post.video.replace(
                "embed/",
                "watch?v="
              );
              this.setState({
                category: res[0].data.data.categorys,
                title: res[1].data.post.title,
                description: res[1].data.post.description,
                imagePreviewUrl: res[1].data.post.images[0],
                video: video_url,
                dropdown_value: res[1].data.post.category,
              });
            }
          })
        )
        .catch((error) => {
          this.setState({
            errors: error.response.data,
          });
        });
    } else {
      axios
        .get("https://api.mlemmlem.site/api/home/category")
        .then((res) => {
          if (this.mounted) {
            this.setState({
              category: res.data.data.categorys,
            });
          }
        })
        .catch((error) => {
          this.setState({
            errors: error.response.data,
          });
        });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit(e, index) {
    console.log(index);
    e.preventDefault();
    let create_id = localStorage.getItem("create_id");
    if (
      this.state.video &&
      this.state.video.indexOf("https://www.youtube.com/watch?v=") !== -1 &&
      this.state.video.length !== 43
    ) {
      this.setState({ errors: { message: "Incorrect youtube video url" } });
      return;
    }
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
        "https://www.youtube.com/embed/" + this.state.video.slice(32)
      );
    console.log(formData);
    if (!create_id) {
      axios
        .post("https://api.mlemmlem.site/api/posts/create", formData)
        .then((res) => {
          console.log(res);
          const { id } = res.data;
          localStorage.setItem("create_id", id);
          if(index === '3'){
            this.props.history.push('/step3');
          }
          else{
            this.props.history.push('/step2');
          }
          
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          this.setState({
            errors: err.response.data,
            buttonLoading: false,
          });
        });
    } else {
      axios
        .post(
          "https://api.mlemmlem.site/api/posts/" +
            localStorage.getItem("create_id") +
            "/update",
          formData
        )
        .then((res) => {
          if(index === '3'){
            this.props.history.push('/step3');
          }
          else{
            this.props.history.push('/step2');
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          this.setState({
            errors: err.response.data,
          });
        });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    console.log(this.state.errors);
    let { imagePreviewUrl, video } = this.state;
    let $imagePreview = null;
    let youtube_video = null;
    let embed_video = "";
    if (imagePreviewUrl) {
      $imagePreview = (
        <div
          style={{ padding: "0 100px" }}
          onClick={() => console.log(this.inputImage.current.click())}
        >
          <div
            className="picture-cover"
            style={{
              width: "100%",
              height: "400px",
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
            className="create-step1-image"
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
          width="100%"
          height="250px"
          src={embed_video}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <div>
        <div className="container create-bg-white">
          <div className="timeline">
            <div className="timeline-progress" style={{ width: "15%" }}></div>
            <div className="timeline-items">
              {items.map((item, i) => (
                <div
                  onClick={(e) => this.onStepClick(e, item.number)}
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
          <form className="create-form" onSubmit={(e) => this.handleSubmit(e, 2)}>
            <div className="form-group create-form-group">
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
              <label className="create-label-name" for="title">
                Tên món ăn *
              </label>
            </div>
            <div className="form-group create-form-group">
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
              <div className="col-md-6">
                <div className="form-group create-dropdown">
                  <select
                    onChange={this.onChange}
                    className="form-control create-form-group create-dropdown-color create-dropdown-style"
                    value={this.state.dropdown_value}
                    id="dropdown_value"
                  >
                    <option
                      className="create-option"
                      disabled
                      defaultValue
                      hidden
                      value=""
                    >
                      Danh mục
                    </option>
                    {this.state.category &&
                      this.state.category.map((x, i) => (
                        <option className="create-option" key={i} value={x._id}>
                          {x.title}
                        </option>
                      ))}
                  </select>
                  {/* <p class="selecionado_opcion" onclick="open_select(this)"></p>
                  <span onclick="open_select(this)" class="icon_select_mate">
                    <svg
                      fill="#000000"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                      <path d="M0-.75h24v24H0z" fill="none" />
                    </svg>
                  </span> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group create-form-group">
                  <input
                    autoComplete="off"
                    maxLength="100"
                    onChange={this.onChange}
                    id="video"
                    value={this.state.video}
                    type="text"
                    className="form-control create-input-name"
                    placeholder=" "
                  />
                  <label className="create-label-name" for="video">
                    Link youtube video{" "}
                    <span className="create-mini-text">
                      (Ex: https://www.youtube.com/watch?v=RBYDnaP3sto)
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
              ref={this.inputImage}
              id="upload_image"
              onChange={(e) => this.handleImageChange(e)}
            />
            {!isEmpty(this.state.errors) && (
              <div className="alert alert-danger">
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Create;
