import React, { Component } from "react";
import axios from "axios";
import Picture from "../common/Picture";
import Footer from "../layout/Footer";
import Page404 from "./error/Page404";
import { apiURL } from "../../config/Constant";
const isEmpty = require("is-empty");

const items = [
  {
    number: "1",
    name: "Món ăn mới",
    active: false,
    done: true,
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
    active: true,
    done: false,
  },
];

class CreateStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step_image_1: "",
      step_content_1: "",
      step_image_2: "",
      step_content_2: "",
      step_image_3: "",
      step_content_3: "",
      step_image_4: "",
      step_content_4: "",
      step_image_5: "",
      step_content_5: "",
      step_image_6: "",
      step_content_6: "",
      step_image_7: "",
      step_content_7: "",
      step_image_8: "",
      step_content_8: "",
      step_image_9: "",
      step_content_9: "",
      step_image_10: "",
      step_content_10: "",
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      imagePreviewUrl3: "",
      imagePreviewUrl4: "",
      imagePreviewUrl5: "",
      imagePreviewUrl6: "",
      imagePreviewUrl7: "",
      imagePreviewUrl8: "",
      imagePreviewUrl9: "",
      imagePreviewUrl10: "",
      total_steps: 1,
      errors: {},
      buttonLoading: false,
      loading: true,
      error404: false,
    };
    this.inputImage = React.createRef();
    this.inputImage2 = React.createRef();
    this.inputImage3 = React.createRef();
    this.inputImage4 = React.createRef();
    this.inputImage5 = React.createRef();
    this.inputImage6 = React.createRef();
    this.inputImage7 = React.createRef();
    this.inputImage8 = React.createRef();
    this.inputImage9 = React.createRef();
    this.inputImage10 = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
    let id = this.props.match.params.id;
    axios
      .get(`${apiURL}/users/recipe/${id}`)
      .then((res) => {
        if (this.mounted) {
          if (res.data.recipe.steps.length === 1) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 2) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              total_steps: 2,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 3) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              total_steps: 3,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 4) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              total_steps: 4,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 5) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              total_steps: 5,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 6) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              imagePreviewUrl6: res.data.recipe.steps[5].image,
              step_content_6: res.data.recipe.steps[5].content,
              total_steps: 6,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 7) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              imagePreviewUrl6: res.data.recipe.steps[5].image,
              step_content_6: res.data.recipe.steps[5].content,
              imagePreviewUrl7: res.data.recipe.steps[6].image,
              step_content_7: res.data.recipe.steps[6].content,
              total_steps: 7,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 8) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              imagePreviewUrl6: res.data.recipe.steps[5].image,
              step_content_6: res.data.recipe.steps[5].content,
              imagePreviewUrl7: res.data.recipe.steps[6].image,
              step_content_7: res.data.recipe.steps[6].content,
              imagePreviewUrl8: res.data.recipe.steps[7].image,
              step_content_8: res.data.recipe.steps[7].content,
              total_steps: 8,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 9) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              imagePreviewUrl6: res.data.recipe.steps[5].image,
              step_content_6: res.data.recipe.steps[5].content,
              imagePreviewUrl7: res.data.recipe.steps[6].image,
              step_content_7: res.data.recipe.steps[6].content,
              imagePreviewUrl8: res.data.recipe.steps[7].image,
              step_content_8: res.data.recipe.steps[7].content,
              imagePreviewUrl9: res.data.recipe.steps[8].image,
              step_content_9: res.data.recipe.steps[8].content,
              total_steps: 9,
              loading: false,
            });
          } else if (res.data.recipe.steps.length === 10) {
            this.setState({
              imagePreviewUrl1: res.data.recipe.steps[0].image,
              step_content_1: res.data.recipe.steps[0].content,
              imagePreviewUrl2: res.data.recipe.steps[1].image,
              step_content_2: res.data.recipe.steps[1].content,
              imagePreviewUrl3: res.data.recipe.steps[2].image,
              step_content_3: res.data.recipe.steps[2].content,
              imagePreviewUrl4: res.data.recipe.steps[3].image,
              step_content_4: res.data.recipe.steps[3].content,
              imagePreviewUrl5: res.data.recipe.steps[4].image,
              step_content_5: res.data.recipe.steps[4].content,
              imagePreviewUrl6: res.data.recipe.steps[5].image,
              step_content_6: res.data.recipe.steps[5].content,
              imagePreviewUrl7: res.data.recipe.steps[6].image,
              step_content_7: res.data.recipe.steps[6].content,
              imagePreviewUrl8: res.data.recipe.steps[7].image,
              step_content_8: res.data.recipe.steps[7].content,
              imagePreviewUrl9: res.data.recipe.steps[8].image,
              step_content_9: res.data.recipe.steps[8].content,
              imagePreviewUrl10: res.data.recipe.steps[9].image,
              step_content_10: res.data.recipe.steps[9].content,
              total_steps: 10,
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
        if (error.response.status === 404) {
          this.setState({
            error404: true,
            loading: false,
          });
        } else {
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

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  addStep(e) {
    e.preventDefault();
    this.setState({ total_steps: this.state.total_steps + 1 });
  }

  handleRemove(e) {
    e.preventDefault();
    if (this.state.total_steps === 2) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_2: "",
        step_image_2: "",
        imagePreviewUrl2: "",
      });
    } else if (this.state.total_steps === 3) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_3: "",
        step_image_3: "",
        imagePreviewUrl3: "",
      });
    } else if (this.state.total_steps === 4) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_4: "",
        step_image_4: "",
        imagePreviewUrl4: "",
      });
    } else if (this.state.total_steps === 5) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_5: "",
        step_image_5: "",
        imagePreviewUrl5: "",
      });
    } else if (this.state.total_steps === 6) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_6: "",
        step_image_6: "",
        imagePreviewUrl6: "",
      });
    } else if (this.state.total_steps === 7) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_7: "",
        step_image_7: "",
        imagePreviewUrl7: "",
      });
    } else if (this.state.total_steps === 8) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_8: "",
        step_image_8: "",
        imagePreviewUrl8: "",
      });
    } else if (this.state.total_steps === 9) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_9: "",
        step_image_9: "",
        imagePreviewUrl9: "",
      });
    } else if (this.state.total_steps === 10) {
      this.setState({
        total_steps: this.state.total_steps - 1,
        step_content_10: "",
        step_image_10: "",
        imagePreviewUrl10: "",
      });
    }
  }

  //handle cancle submit button onClick
  cancelSubmit(e) {
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
  }

  //handle change step
  onStepClick = (e, index) => {
    e.preventDefault();
    if (index === "1") {
      this.props.history.push("/step1/" + this.props.match.params.id);
    } else if (index === "2") {
      this.props.history.push("/step2/" + this.props.match.params.id);
    }
  };

  //preview image
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      if (e.target.id === "step_image_1") {
        reader.onloadend = () => {
          this.setState({
            step_image_1: file,
            imagePreviewUrl1: reader.result,
          });
        };
      } else if (e.target.id === "step_image_2") {
        reader.onloadend = () => {
          this.setState({
            step_image_2: file,
            imagePreviewUrl2: reader.result,
          });
        };
      } else if (e.target.id === "step_image_3") {
        reader.onloadend = () => {
          this.setState({
            step_image_3: file,
            imagePreviewUrl3: reader.result,
          });
        };
      } else if (e.target.id === "step_image_4") {
        reader.onloadend = () => {
          this.setState({
            step_image_4: file,
            imagePreviewUrl4: reader.result,
          });
        };
      } else if (e.target.id === "step_image_5") {
        reader.onloadend = () => {
          this.setState({
            step_image_5: file,
            imagePreviewUrl5: reader.result,
          });
        };
      } else if (e.target.id === "step_image_6") {
        reader.onloadend = () => {
          this.setState({
            step_image_6: file,
            imagePreviewUrl6: reader.result,
          });
        };
      } else if (e.target.id === "step_image_7") {
        reader.onloadend = () => {
          this.setState({
            step_image_7: file,
            imagePreviewUrl7: reader.result,
          });
        };
      } else if (e.target.id === "step_image_8") {
        reader.onloadend = () => {
          this.setState({
            step_image_8: file,
            imagePreviewUrl8: reader.result,
          });
        };
      } else if (e.target.id === "step_image_9") {
        reader.onloadend = () => {
          this.setState({
            step_image_9: file,
            imagePreviewUrl9: reader.result,
          });
        };
      } else {
        reader.onloadend = () => {
          this.setState({
            step_image_10: file,
            imagePreviewUrl10: reader.result,
          });
        };
      }
      reader.readAsDataURL(file);
    } else {
      if (e.target.id === "step_image_1") {
        this.setState({
          step_image_1: "",
          imagePreviewUrl1: "",
        });
      } else if (e.target.id === "step_image_2") {
        this.setState({
          step_image_2: "",
          imagePreviewUrl2: "",
        });
      } else if (e.target.id === "step_image_3") {
        this.setState({
          step_image_3: "",
          imagePreviewUrl3: "",
        });
      } else if (e.target.id === "step_image_4") {
        this.setState({
          step_image_4: "",
          imagePreviewUrl4: "",
        });
      } else if (e.target.id === "step_image_5") {
        this.setState({
          step_image_5: "",
          imagePreviewUrl5: "",
        });
      } else if (e.target.id === "step_image_6") {
        this.setState({
          step_image_6: "",
          imagePreviewUrl6: "",
        });
      } else if (e.target.id === "step_image_7") {
        this.setState({
          step_image_7: "",
          imagePreviewUrl7: "",
        });
      } else if (e.target.id === "step_image_8") {
        this.setState({
          step_image_8: "",
          imagePreviewUrl8: "",
        });
      } else if (e.target.id === "step_image_9") {
        this.setState({
          step_image_9: "",
          imagePreviewUrl9: "",
        });
      } else if (e.target.id === "step_image_10") {
        this.setState({
          step_image_10: "",
          imagePreviewUrl10: "",
        });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      buttonLoading: true,
    });
    let action = localStorage.getItem("action");
    let formData = new FormData();
    if (this.state.step_image_1)
      formData.append("step1_image", this.state.step_image_1);
    formData.append("step1_content", this.state.step_content_1);
    if (this.state.total_steps > 1) {
      if (this.state.step_image_2)
        formData.append("step2_image", this.state.step_image_2);
      formData.append("step2_content", this.state.step_content_2);
    }
    if (this.state.total_steps > 2) {
      if (this.state.step_image_3)
        formData.append("step3_image", this.state.step_image_3);
      formData.append("step3_content", this.state.step_content_3);
    }
    if (this.state.total_steps > 3) {
      if (this.state.step_image_4)
        formData.append("step4_image", this.state.step_image_4);
      formData.append("step4_content", this.state.step_content_4);
    }
    if (this.state.total_steps > 4) {
      if (this.state.step_image_5)
        formData.append("step5_image", this.state.step_image_5);
      formData.append("step5_content", this.state.step_content_5);
    }
    if (this.state.total_steps > 5) {
      if (this.state.step_image_6)
        formData.append("step6_image", this.state.step_image_6);
      formData.append("step6_content", this.state.step_content_6);
    }
    if (this.state.total_steps > 6) {
      if (this.state.step_image_7)
        formData.append("step7_image", this.state.step_image_7);
      formData.append("step7_content", this.state.step_content_7);
    }
    if (this.state.total_steps > 7) {
      if (this.state.step_image_8)
        formData.append("step8_image", this.state.step_image_8);
      formData.append("step8_content", this.state.step_content_8);
    }
    if (this.state.total_steps > 8) {
      if (this.state.step_image_9)
        formData.append("step9_image", this.state.step_image_9);
      formData.append("step9_content", this.state.step_content_9);
    }
    if (this.state.total_steps > 9) {
      if (this.state.step_image_10)
        formData.append("step10_image", this.state.step_image_10);
      formData.append("step10_content", this.state.step_content_10);
    }
    formData.append("step", 3);
    axios
      .post(
        `${apiURL}/recipes/` + this.props.match.params.id + "/update",
        formData
      )
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
          this.props.history.push({
            pathname: "/",
            state: { createSuccess: true },
          });
        }
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
    let {
      imagePreviewUrl1,
      imagePreviewUrl2,
      imagePreviewUrl3,
      imagePreviewUrl4,
      imagePreviewUrl5,
      imagePreviewUrl6,
      imagePreviewUrl7,
      imagePreviewUrl8,
      imagePreviewUrl9,
      imagePreviewUrl10,
    } = this.state;
    let imagestep1,
      imagestep2,
      imagestep3,
      imagestep4,
      imagestep5,
      imagestep6,
      imagestep7,
      imagestep8,
      imagestep9,
      imagestep10 = null;
    if (imagePreviewUrl1) {
      imagestep1 = (
        <div
          className="create-image-placeholder"
          onClick={() => this.inputImage.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl1} />
        </div>
      );
    } else {
      imagestep1 = (
        <div
          className="create-image-placeholder"
          onClick={() => this.inputImage.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl2) {
      imagestep2 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage2.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl2} />
        </div>
      );
    } else {
      imagestep2 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage2.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl3) {
      imagestep3 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage3.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl3} />
        </div>
      );
    } else {
      imagestep3 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage3.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl4) {
      imagestep4 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage4.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl4} />
        </div>
      );
    } else {
      imagestep4 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage4.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl5) {
      imagestep5 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage5.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl5} />
        </div>
      );
    } else {
      imagestep5 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage5.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl6) {
      imagestep6 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage6.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl6} />
        </div>
      );
    } else {
      imagestep6 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage6.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl7) {
      imagestep7 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage7.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl7} />
        </div>
      );
    } else {
      imagestep7 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage7.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl8) {
      imagestep8 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage8.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl8} />
        </div>
      );
    } else {
      imagestep8 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage8.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl9) {
      imagestep9 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage9.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl9} />
        </div>
      );
    } else {
      imagestep9 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage9.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }
    if (imagePreviewUrl10) {
      imagestep10 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage10.current.click()}
        >
          <Picture height="250px" src={imagePreviewUrl10} />
        </div>
      );
    } else {
      imagestep10 = (
        <div
          className="create-image-placeholder2"
          onClick={() => this.inputImage10.current.click()}
        >
          <img
            className="create-step1-image"
            alt=""
            src="/images/photo_icon.png"
          />
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="outer-div">
          <div className="container create-bg-white">
            <div className="timeline">
              <div
                className="timeline-progress"
                style={{ width: "100%" }}
              ></div>
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
            <div className="timeline-progress" style={{ width: "100%" }}></div>
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
            Món này làm thế nào vậy bếp trưởng?
          </div>
          <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="create-step-title">Bước 1</div>
            <div className="row form-group">
              <div className="col col-md-6 col-12">
                <textarea
                  spellCheck="false"
                  className="create-steps-textarea"
                  value={this.state.step_content_1}
                  maxLength="1000"
                  id="step_content_1"
                  placeholder="Làm gì ở bước này vậy?"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="col col-md-6 col-12">
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={this.inputImage}
                  id="step_image_1"
                  onChange={(e) => this.handleImageChange(e)}
                />
                {imagestep1}
              </div>
            </div>
            {this.state.total_steps > 1 && (
              <div className="create-step-wrapper">
                <div className="create-step-title">Bước 2</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_2}
                      maxLength="1000"
                      id="step_content_2"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage2}
                      id="step_image_2"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep2}
                  </div>
                </div>
                {this.state.total_steps === 2 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 2 && (
              <div>
                <div className="create-step-title">Bước 3</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_3}
                      maxLength="1000"
                      id="step_content_3"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage3}
                      id="step_image_3"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep3}
                  </div>
                </div>
                {this.state.total_steps === 3 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 3 && (
              <div>
                <div className="create-step-title">Bước 4</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_4}
                      maxLength="1000"
                      id="step_content_4"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage4}
                      id="step_image_4"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep4}
                  </div>
                </div>
                {this.state.total_steps === 4 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 4 && (
              <div>
                <div className="create-step-title">Bước 5</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_5}
                      maxLength="1000"
                      id="step_content_5"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage5}
                      id="step_image_5"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep5}
                  </div>
                </div>
                {this.state.total_steps === 5 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 5 && (
              <div>
                <div className="create-step-title">Bước 6</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_6}
                      maxLength="1000"
                      id="step_content_6"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage6}
                      id="step_image_6"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep6}
                  </div>
                </div>
                {this.state.total_steps === 6 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 6 && (
              <div>
                <div className="create-step-title">Bước 7</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_7}
                      maxLength="1000"
                      id="step_content_7"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage7}
                      id="step_image_7"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep7}
                  </div>
                </div>
                {this.state.total_steps === 7 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 7 && (
              <div>
                <div className="create-step-title">Bước 8</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_8}
                      maxLength="1000"
                      id="step_content_8"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage8}
                      id="step_image_8"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep8}
                  </div>
                </div>
                {this.state.total_steps === 8 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 8 && (
              <div>
                <div className="create-step-title">Bước 9</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_9}
                      maxLength="1000"
                      id="step_content_9"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage9}
                      id="step_image_9"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep9}
                  </div>
                </div>
                {this.state.total_steps === 9 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {this.state.total_steps > 9 && (
              <div>
                <div className="create-step-title">Bước 10</div>
                <div className="row form-group">
                  <div className="col col-md-6 col-12">
                    <textarea
                      spellCheck="false"
                      className="create-steps-textarea"
                      value={this.state.step_content_10}
                      maxLength="1000"
                      id="step_content_10"
                      placeholder="Làm gì ở bước này vậy?"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="col col-md-6 col-12">
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      ref={this.inputImage10}
                      id="step_image_10"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    {imagestep10}
                  </div>
                </div>
                {this.state.total_steps === 10 && (
                  <div className="create-delete-btn">
                    <button
                      className="create-delete-step"
                      onClick={(e) => this.handleRemove(e)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="create-add-btn-container">
              {this.state.total_steps !== 10 && (
                <button
                  className="create-add-ingre-step3"
                  onClick={(e) => this.addStep(e)}
                >
                  <i className="fa fa-plus" />
                </button>
              )}
            </div>
            {!isEmpty(this.state.errors) && (
              <div className="alert alert-danger">
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
              {!this.state.buttonLoading && (
                <div
                  className="arrow-next"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <i className="fas fa-check"></i>
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
              {!this.state.buttonLoading && action !== "update" && (
                <button
                  type="submit"
                  className="btn btn-pink"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Đăng
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
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateStep3;
