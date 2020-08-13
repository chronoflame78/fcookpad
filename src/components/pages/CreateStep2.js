import React, { Component } from "react";
import axios from "axios";
import Footer from "../layout/Footer";
import Page404 from "../pages/Page404";
import { apiURL } from "../../config/Constant";
const isEmpty = require("is-empty");

class CreateStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [""],
      errors: {},
      buttonLoading: false,
      loading: true,
      error404: false
    };
  }

  componentDidMount() {
    this.mounted = true;
    let id = this.props.match.params.id;
    axios
      .get(`${apiURL}/users/recipe/${id}`)
      .then((res) => {
        if (this.mounted) {
          if (res.data.post.ingredients.length > 0) {
            this.setState({
              ingredients: res.data.post.ingredients,
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
            });
          }
        }
      })
      .catch((error) => {
        if(error.response.status === 404){
          this.setState({
            error404: true,
            loading: false
          })
        }else{
          this.setState({
            errors: error.response.data,
            loading: false,
          });
        }
        
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange(e, index) {
    let ingredients = this.state.ingredients;
    ingredients[index] = e.target.value;
    // this.state.ingredients[index] = e.target.value;
    this.setState({ ingredients: ingredients });
  }

  handleBack(e) {
    this.props.history.push("/step1/" + this.props.match.params.id);
  }

  cancelSubmit(e) {
    e.preventDefault();
    let action = localStorage.getItem("action");
    if(action === 'update'){
      this.props.history.push({
        pathname: "/account_settings",
        state: {
          postTab: 2,
        },
      });
    }
    else{
      this.props.history.push("/");
    }
  }

  onStepClick = (e, index) => {
    e.preventDefault();
    let doneStep2 = localStorage.getItem("doneStep2");
    if (index === "1") {
      this.props.history.push("/step1/"+this.props.match.params.id);
    }
    if (doneStep2 && index === "3") {
      this.props.history.push("/step3/"+this.props.match.params.id);
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
        `${apiURL}/posts/` + this.props.match.params.id + "/update",
        data
      )
      .then((res) => {
        localStorage.setItem("doneStep2", true);
        this.props.history.push("/step3/"+ this.props.match.params.id);
      })
      .catch((err) =>
        this.setState({
          errors: err.response.data,
          buttonLoading: false,
        })
      );
  }

  render() {
    if (this.state.error404) return <Page404 />;
    let action = localStorage.getItem("action");
    let doneStep2 = localStorage.getItem("doneStep2");
    if (!doneStep2) doneStep2 = false;
    let items = [
      {
        number: "1",
        name: "Món ăn mới",
        active: false,
        done: true,
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
        done: doneStep2,
      },
    ];
    console.log(this.state.loading);
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
    return (
      <div>
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
          <div className="create-txt-field4">
            Món này cần những nguyên liệu gì thế bếp trưởng?
          </div>
          <form className="create-form " onSubmit={(e) => this.handleSubmit(e)}>
            <div className="create-form-ingre">
              {this.state.ingredients.map((ingredient, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={index}
                      className="form-group create-form-group-maining"
                    >
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
                    <div
                      key={index}
                      className="form-group create-form-group-ingre"
                    >
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
            </div>
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
            <div className="create-button-container">
              <button
                className="btn btn-gray"
                onClick={(e) => this.cancelSubmit(e)}
              >
                Hủy
              </button>
              {this.state.buttonLoading && (
                <button type="submit" className="btn btn-pink">
                  <i class="fa fa-spinner fa-spin"></i>
                </button>
              )}
              {!this.state.buttonLoading && action !== 'update' && (
                <button
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Tiếp
                </button>
              )}
              {!this.state.buttonLoading && action === 'update' && (
                <button
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Lưu
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
