import React, { Component } from "react";
import axios from "axios";
import Footer from "../layout/Footer";
import Page404 from "../pages/Page404";
const isEmpty = require("is-empty");

class CreateStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [""],
      errors: {},
      buttonLoading: false
    };
  }

  componentDidMount() {
    this.mounted = true;
    let create_id = localStorage.getItem("create_id");
    if (create_id) {
      axios
        .get("http://188.166.237.72:3000/api/users/recipe/" + create_id)
        .then((res) => {
          if (this.mounted) {
            localStorage.setItem("doneStep2", true);
            if (res.data.post.ingredients.length > 0) {
              this.setState({
                ingredients: res.data.post.ingredients,
              });
            }
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

  handleChange(e, index) {
    this.state.ingredients[index] = e.target.value;
    this.setState({ ingredients: this.state.ingredients });
  }

  handleBack(e) {
    this.props.history.push("/create");
  }

  cancelSubmit(e) {
    window.open("/", "_self");
  }

  onStepClick = (e, index) => {
    e.preventDefault();
    let doneStep2 = localStorage.getItem("doneStep2");
    if (index === "1") {
      this.props.history.push("/create");
    }
    if (doneStep2 && index === "3") {
        this.props.history.push("/step3");
      }
  };

  addIngredient(e) {
    e.preventDefault();
    if (this.state.ingredients.length < 10) {
      this.setState({
        ingredients: [...this.state.ingredients, ""],
      });
    }
  }

  handleRemove(e, index) {
    e.preventDefault();
    this.state.ingredients.splice(index, 1);
    this.setState({ ingredients: this.state.ingredients });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let data = {
      ingredients: this.state.ingredients,
      step: 2,
    };

    axios
      .post(
        "http://188.166.237.72:3000/api/posts/" +
          localStorage.getItem("create_id") +
          "/update",
        data
      )
      .then((res) => {
        this.props.history.push("/step3");
      })
      .catch((err) =>
        this.setState({
          errors: err.response.data,
          buttonLoading: false,
        })
      );
  }

  render() {
    let create_id = localStorage.getItem("create_id");
    if (!create_id) return <Page404 />;
    let doneStep2 = localStorage.getItem("doneStep2");
    if(!doneStep2) doneStep2 = false;
    let items = [
        {
          number: "1",
          name: "Món ăn mới",
          active: false,
          done: true
        },
        {
          number: "2",
          name: "Nguyên liệu",
          active: true,
          done: false,
        },
        {
          number: "3",
          name: "Cách làm",
          active: false,
          done: doneStep2
        },
      ];
    return (
      <div>
        <div className="container create-bg-white">
          <div className="timeline">
          {!doneStep2 && <div className="timeline-progress" style={{ width: "67%" }}></div>}
          {doneStep2 && <div className="timeline-progress" style={{ width: "100%" }}></div>}
            <div className="timeline-items">
              {items.map((item, i) => (
                <div
                  onClick={(e) => this.onStepClick(e, item.number)}
                  key={i}
                  className={"timeline-item" + (item.active ? " active" : "") + (item.done ? " done": "")}
                >
                  <div className={"timeline-number" + (item.done ? " done": "")}>{item.number}</div>
                  <div className="timeline-name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="create-txt-field4">
            Món này cần những nguyên liệu gì thế bếp trưởng?
          </div>
          <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
            {this.state.ingredients.map((ingredient, index) => {
              if (index === 0) {
                return (
                  <div key={index} className="form-group create-form-group">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={(e) => this.handleChange(e, index)}
                      id={index}
                      value={ingredient}
                      type="text"
                      className="form-control create-input-name"
                      placeholder=" "
                    />
                    <label className="create-label-name" for={index}>
                      Nguyên liệu chính *
                    </label>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="form-group create-form-group">
                    <input
                      autoComplete="off"
                      maxLength="100"
                      onChange={(e) => this.handleChange(e, index)}
                      id={index}
                      value={ingredient}
                      type="text"
                      className="form-control create-input-name"
                      placeholder=" "
                    />
                    <label className="create-label-name" for={index}>
                      Nguyên liệu
                    </label>
                    <div className="float-right">
                      <button
                        type="button"
                        className="create-close-btn"
                        onClick={(e) => this.handleRemove(e, index)}
                      >
                        <i className="fa fa-times" />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
            <div className="create-add-btn-container">
              <button
                className="create-add-ingre"
                onClick={(e) => this.addIngredient(e)}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
            {!isEmpty(this.state.errors) && (
              <div className="alert alert-danger alert-position">
                {this.state.errors.message}
              </div>
            )}
            <div className="create-button-container-phone">
              <button
                className="btn btn-gray"
                onClick={(e) => this.cancelSubmit(e)}
              >
                Hủy
              </button>
              <div
                className="back-arrow create-mr"
                onClick={(e) => this.handleBack(e)}
              >
                <i class="fas fa-chevron-left"></i>
              </div>
              {!this.state.buttonLoading && (
                <div
                  className="post-check"
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
            <div className="create-button-container">
              <button
                className="btn btn-gray"
                onClick={(e) => this.cancelSubmit(e)}
              >
                Hủy
              </button>
              {!this.state.buttonLoading && (
                <button
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
              <button
                className="btn btn-pink create-mr"
                onClick={(e) => this.handleBack(e)}
              >
                Trở lại
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateStep2;
