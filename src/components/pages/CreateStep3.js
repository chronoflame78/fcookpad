import React, { Component } from 'react'
import axios from "axios";
import Picture from '../common/Picture';

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
            imagePreviewUrl1: "",
            imagePreviewUrl2: "",
            imagePreviewUrl3: "",
            imagePreviewUrl4: "",
            imagePreviewUrl5: "",
            total_steps: 1
        };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    addStep() {
        if (this.state.total_steps < 5) {
            this.setState({ total_steps: this.state.total_steps + 1 });
        }
    }

    handleRemove() {
        if (this.state.total_steps > 1) {
            this.setState({ total_steps: this.state.total_steps - 1 });
        }

    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(e.target.id);
        if (e.target.id === "step_image_1") {
            reader.onloadend = () => {
                this.setState({
                    step_image_1: file,
                    imagePreviewUrl1: reader.result
                });
            }
        } else if (e.target.id === "step_image_2") {
            reader.onloadend = () => {
                this.setState({
                    step_image_2: file,
                    imagePreviewUrl2: reader.result
                });
            }
        } else if (e.target.id === "step_image_3") {
            reader.onloadend = () => {
                this.setState({
                    step_image_3: file,
                    imagePreviewUrl3: reader.result
                });
            }
        } else if (e.target.id === "step_image_4") {
            reader.onloadend = () => {
                this.setState({
                    step_image_4: file,
                    imagePreviewUrl4: reader.result
                });
            }
        } else {
            reader.onloadend = () => {
                this.setState({
                    step_image_5: file,
                    imagePreviewUrl5: reader.result
                });
            }
        }


        reader.readAsDataURL(file)
    }

    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        console.log(this.state);
        formData.append('step_image_1', this.state.step_image_1);
        formData.append('step_content_1', this.state.step_content_1);
        if (this.state.total_steps > 1) {
            formData.append('step_image_2', this.state.step_image_2);
            formData.append('step_content_2', this.state.step_content_2);
        }
        if (this.state.total_steps > 2) {
            formData.append('step_image_3', this.state.step_image_3);
            formData.append('step_content_3', this.state.step_content_3);
        }
        if (this.state.total_steps > 3) {
            formData.append('step_image_4', this.state.step_image_4);
            formData.append('step_content_4', this.state.step_content_4);
        }
        if (this.state.total_steps > 4) {
            formData.append('step_image_5', this.state.step_image_5);
            formData.append('step_content_5', this.state.step_content_5);
        }
        formData.append('step', 3);
        console.log(formData);
        //   axios
        //     .post("http://178.128.83.129:3000/api/auth/resendEmail", data)
        //     .then(res => console.log(res)) 
        //     .catch(err =>
        //       console.log(err)
        //     );
    }


    render() {
        let { imagePreviewUrl1, imagePreviewUrl2, imagePreviewUrl3, imagePreviewUrl4, imagePreviewUrl5 } = this.state;
        let imagestep1, imagestep2, imagestep3, imagestep4, imagestep5 = null;
        if (imagePreviewUrl1) {
            imagestep1 = (<Picture width="500px" height="250px" src={imagePreviewUrl1} />);
        }
        if (imagePreviewUrl2) {
            imagestep2 = (<Picture width="500px" height="250px" src={imagePreviewUrl2} />);
        }
        if (imagePreviewUrl3) {
            imagestep3 = (<Picture width="500px" height="250px" src={imagePreviewUrl3} />);
        }
        if (imagePreviewUrl4) {
            imagestep4 = (<Picture width="500px" height="250px" src={imagePreviewUrl4} />);
        }
        if (imagePreviewUrl5) {
            imagestep5 = (<Picture width="500px" height="250px" src={imagePreviewUrl5} />);
        }
        return (
            <div className="container" style={{ paddingTop: '60px' }}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>Step1</div>
                    <div className="form-group">
                        <input type="file" id="step_image_1" onChange={(e) => this.handleImageChange(e)} />
                        {imagestep1}
                        <label>Cách làm: </label>
                        <input type="text" value={this.state.step_content_1} id="step_content_1" onChange={(e) => this.handleChange(e)} />
                    </div>
                    {
                        this.state.total_steps > 1 &&
                        <div>Step2
                                    <div className="form-group">
                                <input type="file" id="step_image_2" onChange={(e) => this.handleImageChange(e)} />
                                {imagestep2}
                                <label>Cách làm: </label>
                                <input type="text" value={this.state.step_content_2} id="step_content_2" onChange={(e) => this.handleChange(e)} />
                                <button onClick={(e) => this.handleRemove(e)}>Remove</button>
                            </div> </div>
                    }
                    {
                        this.state.total_steps > 2 &&
                        <div>Step3
                                    <div className="form-group">
                                <input type="file" id="step_image_3" onChange={(e) => this.handleImageChange(e)} />
                                {imagestep3}
                                <label>Cách làm: </label>
                                <input type="text" value={this.state.step_content_3} id="step_content_3" onChange={(e) => this.handleChange(e)} />
                                <button onClick={(e) => this.handleRemove(e)}>Remove</button>
                            </div> </div>
                    }
                    {
                        this.state.total_steps > 3 &&
                        <div>Step4
                                    <div className="form-group">
                                <input type="file" id="step_image_4" onChange={(e) => this.handleImageChange(e)} />
                                {imagestep4}
                                <label>Cách làm: </label>
                                <input type="text" value={this.state.step_content_4} id="step_content_4" onChange={(e) => this.handleChange(e)} />
                                <button onClick={(e) => this.handleRemove(e)}>Remove</button>
                            </div> </div>
                    }
                    {
                        this.state.total_steps > 4 &&
                        <div>Step5
                                    <div className="form-group">
                                <input type="file" id="step_image_5" onChange={(e) => this.handleImageChange(e)} />
                                {imagestep5}
                                <label>Cách làm: </label>
                                <input type="text" value={this.state.step_content_5} id="step_content_5" onChange={(e) => this.handleChange(e)} />
                                <button onClick={(e) => this.handleRemove(e)}>Remove</button>
                            </div> </div>
                    }
                </form>
                <button onClick={(e) => this.addStep(e)}>Thêm bước</button>
                <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Next</button>

            </div>
        )
    }
}

export default CreateStep3;
