import React, { Component } from 'react'
import axios from "axios";
import Picture from '../common/Picture';
import Footer from '../layout/Footer';
import Page404 from '../pages/Page404';
import { SAVE, POST } from "../../actions/AllConstants";
const isEmpty = require("is-empty");

const items = [
    {
        number: '1',
        name: 'Món ăn mới',
        active: true,
    },
    {
        number: '2',
        name: 'Nguyên liệu',
        active: true,
    },
    {
        number: '3',
        name: 'Cách làm',
        active: true,
    }
]
let buttonVal = "";

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
            total_steps: 1,
            errors: {},
            buttonLoading: false
        };
        this.inputImage = React.createRef();
        this.inputImage2 = React.createRef();
        this.inputImage3 = React.createRef();
        this.inputImage4 = React.createRef();
        this.inputImage5 = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;
        let create_id = localStorage.getItem("create_id");
        let action = localStorage.getItem("action")
        if (action === 'update') {
            axios.get("http://api.mlemmlem.site/api/posts/" + create_id).then(res => {
                if (this.mounted) {
                    buttonVal = SAVE;
                    console.log(res.data);
                    console.log(res.data.post);
                    if(res.data.post.steps.length === 1){
                        this.setState({
                            imagePreviewUrl1: res.data.post.steps[0].image,
                            step_content_1: res.data.post.steps[0].content
                        });
                    }
                    else if(res.data.post.steps.length === 2){
                        this.setState({
                            imagePreviewUrl1: res.data.post.steps[0].image,
                            step_content_1: res.data.post.steps[0].content,
                            imagePreviewUrl2: res.data.post.steps[1].image,
                            step_content_2: res.data.post.steps[1].content,
                            total_steps: 2
                        });
                    }
                    else if(res.data.post.steps.length === 3){
                        this.setState({
                            imagePreviewUrl1: res.data.post.steps[0].image,
                            step_content_1: res.data.post.steps[0].content,
                            imagePreviewUrl2: res.data.post.steps[1].image,
                            step_content_2: res.data.post.steps[1].content,
                            imagePreviewUrl3: res.data.post.steps[2].image,
                            step_content_3: res.data.post.steps[2].content,
                            total_steps: 3
                        });
                    }
                    else if(res.data.post.steps.length === 4){
                        this.setState({
                            imagePreviewUrl1: res.data.post.steps[0].image,
                            step_content_1: res.data.post.steps[0].content,
                            imagePreviewUrl2: res.data.post.steps[1].image,
                            step_content_2: res.data.post.steps[1].content,
                            imagePreviewUrl3: res.data.post.steps[2].image,
                            step_content_3: res.data.post.steps[2].content,
                            imagePreviewUrl4: res.data.post.steps[3].image,
                            step_content_4: res.data.post.steps[3].content,
                            total_steps: 4
                        });
                    }
                    else if(res.data.post.steps.length === 5){
                        this.setState({
                            imagePreviewUrl1: res.data.post.steps[0].image,
                            step_content_1: res.data.post.steps[0].content,
                            imagePreviewUrl2: res.data.post.steps[1].image,
                            step_content_2: res.data.post.steps[1].content,
                            imagePreviewUrl3: res.data.post.steps[2].image,
                            step_content_3: res.data.post.steps[2].content,
                            imagePreviewUrl4: res.data.post.steps[3].image,
                            step_content_4: res.data.post.steps[3].content,
                            imagePreviewUrl5: res.data.post.steps[4].image,
                            step_content_5: res.data.post.steps[4].content,
                            total_steps: 5
                        });
                    }
                    
                }
                buttonVal = POST;
            }).catch(error => {
                this.setState({
                    errors: error.response.data
                })
            });
        }


    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    addStep(e) {
        e.preventDefault();
        if (this.state.total_steps < 5) {
            this.setState({ total_steps: this.state.total_steps + 1 });
        }
    }

    handleRemove() {
        if (this.state.total_steps > 1) {
            this.setState({ total_steps: this.state.total_steps - 1 });
        }

    }

    handleBack(e) {
        this.props.history.push('/step2');
    };

    cancelSubmit(e){
        window.open('/', '_self')
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
        this.setState({
            buttonLoading: true
        })
        const action = localStorage.getItem('action');
        let formData = new FormData();
        console.log(this.state);
        formData.append('step1_image', this.state.step_image_1);
        formData.append('step1_content', this.state.step_content_1);
        if (this.state.total_steps > 1) {
            formData.append('step2_image', this.state.step_image_2);
            formData.append('step2_content', this.state.step_content_2);
        }
        if (this.state.total_steps > 2) {
            formData.append('step3_image', this.state.step_image_3);
            formData.append('step3_content', this.state.step_content_3);
        }
        if (this.state.total_steps > 3) {
            formData.append('step4_image', this.state.step_image_4);
            formData.append('step4_content', this.state.step_content_4);
        }
        if (this.state.total_steps > 4) {
            formData.append('step5_image', this.state.step_image_5);
            formData.append('step5_content', this.state.step_content_5);
        }
        formData.append('step', 3);
        console.log(formData);
        axios
             .post("http://api.mlemmlem.site/api/posts/"+localStorage.getItem("create_id")+"/update", formData)
             .then(res => {
                if(action === 'update'){
                    this.props.history.push({
                        pathname: '/account_settings',
                        state: { 
                            editSuccess: true,
                            postTab: 2
                         }
                      })
                }else{
                    this.props.history.push({
                        pathname: '/',
                        state: { createSuccess: true }
                      })
                }
                }) 
             .catch(err =>
                this.setState({
                    errors: err.response.data,
                    buttonLoading: false
                })
             );
    }


    render() {
        let create_id = localStorage.getItem("create_id");
        if(!create_id) return(<Page404/>);        
        let { imagePreviewUrl1, imagePreviewUrl2, imagePreviewUrl3, imagePreviewUrl4, imagePreviewUrl5 } = this.state;
        let imagestep1, imagestep2, imagestep3, imagestep4, imagestep5 = null;
        if (imagePreviewUrl1) {
            imagestep1 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage.current.click())}><Picture height="250px" src={imagePreviewUrl1} /></div>);
        }
        else {
            imagestep1 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage.current.click())}>
                <img className="create-step1-image" alt="" src="/images/photo_icon.png" />
            </div>)
        }
        if (imagePreviewUrl2) {
            imagestep2 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage2.current.click())}><Picture height="250px" src={imagePreviewUrl2} /></div>);
        }
        else {
            imagestep2 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage2.current.click())}>
                <img className="create-step1-image" alt="" src="/images/photo_icon.png" />
            </div>)
        }
        if (imagePreviewUrl3) {
            imagestep3 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage3.current.click())}><Picture height="250px" src={imagePreviewUrl3} /></div>);
        }
        else {
            imagestep3 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage3.current.click())}>
                <img className="create-step1-image" alt="" src="/images/photo_icon.png" />
            </div>)
        }
        if (imagePreviewUrl4) {
            imagestep4 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage4.current.click())}><Picture height="250px" src={imagePreviewUrl4} /></div>);
        }
        else {
            imagestep4 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage4.current.click())}>
                <img className="create-step1-image" alt="" src="/images/photo_icon.png" />
            </div>)
        }
        if (imagePreviewUrl5) {
            imagestep5 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage5.current.click())}><Picture height="250px" src={imagePreviewUrl5} /></div>);
        }
        else {
            imagestep5 = (<div className="create-image-placeholder" onClick={() => console.log(this.inputImage5.current.click())}>
                <img className="create-step1-image" alt="" src="/images/photo_icon.png" />
            </div>)
        }
        return (
            <div>
                <div className="container create-bg-white">
                    <div className="timeline">
                        <div className="timeline-progress" style={{ width: '85%' }}></div>
                        <div className="timeline-items">
                            {items.map((item, i) => (
                                <div key={i} className={"timeline-item" + (item.active ? ' active' : '')}>
                                    <div className="timeline-number">{item.number}</div>
                                    <div className="timeline-name">{item.name}</div>
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="create-txt-field4">Món này làm thế nào vậy bếp trưởng?</div>
                    <form className="create-form" onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="create-step-title">Step 1</div>
                        <div className="row form-group">
                            <div className="col">
                                <textarea spellCheck="false" className="create-steps-textarea" value={this.state.step_content_1} maxLength="1000"
                                    id="step_content_1" placeholder="Làm gì ở bước này vậy?" onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="col">
                                <input style={{ display: 'none' }} type="file" ref={this.inputImage} id="step_image_1" onChange={(e) => this.handleImageChange(e)} />
                                {imagestep1}
                            </div>
                        </div>
                        {
                            this.state.total_steps > 1 &&
                            <div>
                                <div className="create-step-title">Step 2</div>
                                <div className="row form-group">
                                    <div className="col">
                                        <textarea spellCheck="false" className="create-steps-textarea" value={this.state.step_content_2} maxLength="1000"
                                            id="step_content_2" placeholder="Làm gì ở bước này vậy?" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="col">
                                        <input style={{ display: 'none' }} type="file" ref={this.inputImage2} id="step_image_2" onChange={(e) => this.handleImageChange(e)} />
                                        {imagestep2}
                                    </div>
                                    
                                </div>
                                {this.state.total_steps===2 && <div className="create-delete-btn"><button className="create-delete-step" onClick={(e) => this.handleRemove(e)}><i className="fas fa-trash-alt" /></button></div>}
                            </div>
                        }
                        {
                            this.state.total_steps > 2 &&
                            <div>
                                <div className="create-step-title">Step 3</div>
                                <div className="row form-group">
                                    <div className="col">
                                        <textarea spellCheck="false" className="create-steps-textarea" value={this.state.step_content_3} maxLength="1000"
                                            id="step_content_3" placeholder="Làm gì ở bước này vậy?" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="col">
                                        <input style={{ display: 'none' }} type="file" ref={this.inputImage3} id="step_image_3" onChange={(e) => this.handleImageChange(e)} />
                                        {imagestep3}
                                    </div>
                                </div>
                                {this.state.total_steps===3 && <div className="create-delete-btn"><button className="create-delete-step" onClick={(e) => this.handleRemove(e)}><i className="fas fa-trash-alt" /></button></div>}
                            </div>
                        }
                        {
                            this.state.total_steps > 3 &&
                            <div>
                                <div className="create-step-title">Step 4</div>
                                <div className="row form-group">
                                    <div className="col">
                                        <textarea spellCheck="false" className="create-steps-textarea" value={this.state.step_content_4} maxLength="1000"
                                            id="step_content_4" placeholder="Làm gì ở bước này vậy?" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="col">
                                        <input style={{ display: 'none' }} type="file" ref={this.inputImage4} id="step_image_4" onChange={(e) => this.handleImageChange(e)} />
                                        {imagestep4}
                                    </div>
                                </div>
                                {this.state.total_steps===4 && <div className="create-delete-btn"><button className="create-delete-step" onClick={(e) => this.handleRemove(e)}><i className="fas fa-trash-alt" /></button></div>}
                            </div>
                        }
                        {
                            this.state.total_steps > 4 &&
                            <div>
                                <div className="create-step-title">Step 5</div>
                                <div className="row form-group">
                                    <div className="col">
                                        <textarea spellCheck="false" className="create-steps-textarea" value={this.state.step_content_5} maxLength="1000"
                                            id="step_content_5" placeholder="Làm gì ở bước này vậy?" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="col">
                                        <input style={{ display: 'none' }} type="file" ref={this.inputImage5} id="step_image_5" onChange={(e) => this.handleImageChange(e)} />
                                        {imagestep5}
                                    </div>
                                </div>
                                {this.state.total_steps===5 && <div className="create-delete-btn"><button className="create-delete-step" onClick={(e) => this.handleRemove(e)}><i className="fas fa-trash-alt" /></button></div>}
                            </div>
                        }
                        <div className="create-add-btn-container"><button className="create-add-ingre" onClick={(e) => this.addStep(e)}><i className="fa fa-plus" /></button></div>
                        {!isEmpty(this.state.errors) && <div className="alert alert-danger">{this.state.errors.message}</div>}
                        <div className="create-button-container">
                            <button className="btn btn-gray" onClick={(e) => this.cancelSubmit(e)}>Hủy</button>
                    {!this.state.buttonLoading &&<button type="submit" class="btn btn-pink" onClick={(e) => this.handleSubmit(e)}>{buttonVal}</button>}
                            {this.state.buttonLoading && <button type="submit" className="btn btn-pink"><i class="fa fa-spinner fa-spin"></i></button>}
                            <button type="submit" class="btn btn-pink create-mr" onClick={(e) => this.handleBack(e)}>Trở lại</button>
                        </div>
                    </form>


                </div>
                <Footer />
            </div>
        )
    }
}

export default CreateStep3;
