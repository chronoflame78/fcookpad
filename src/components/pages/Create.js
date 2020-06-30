import React, { Component } from 'react'
import axios from "axios";
import Picture from '../common/Picture';
const isEmpty = require("is-empty");
class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            file: '',
            imagePreviewUrl: '',
            video: '',
            errors:{}
        };
      }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.video && this.state.video.indexOf('https://www.youtube.com/watch?v=')!=-1 && this.state.video.length !== 43){
            this.setState({errors:{message: "Incorrect youtube video url"}});
            return;
        }
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        let formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('step',1);
        formData.append('imageCover',this.state.file);
        formData.append('video',"https://www.youtube.com/embed/" + this.state.video.slice(32));
          console.log(formData)
          axios
            .post("http://157.230.44.169:3000/api/posts/create", formData)
            .then(res => {
                const { id } = res.data;
                localStorage.setItem("create_id", id); 
                this.props.history.push("/step2");
            })
            .catch(err =>{
                console.log(err);
                console.log(err.response.data);
                this.setState({
                    errors: err.response.data
                })
            }   
            );
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl, video } = this.state;
        let $imagePreview = null;
        let youtube_video = null;
        let embed_video = "";
        if (imagePreviewUrl) {
            $imagePreview = (<Picture width="500px" height="250px" src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText"><label for="upload_image">Please select an Image for Preview</label></div>);
        }
        if(video.indexOf("https://www.youtube.com/watch?v=") > -1){
            embed_video = "https://www.youtube.com/embed/" + video.slice(32);
            youtube_video = <iframe title="video" width="100%" height="400px"
            src={embed_video}
            frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        }

        return (
            <div className="container">
                <div className="imgPreview" >
                {$imagePreview}
                </div>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div class="form-group">
                        <label for="title">Tiêu đề bài đăng</label>
                        <input maxLength="100" onChange={this.onChange} id="title" value={this.state.title} type="text" class="form-control" placeholder="Nhập tiêu đề" />
                    </div>
                    <div class="form-group">
                        <label for="description">Mô tả món ăn</label>
                        <textarea maxLength="1000" onChange={this.onChange} id="description" value={this.state.description} class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="description">Link youtube video</label>
                        <input maxLength="100" onChange={this.onChange} id="video" value={this.state.video} type="text" class="form-control" placeholder="Video URL" />
                    </div>
                    {youtube_video}
                    
                    <input style={{display:'none'}} type="file" id="upload_image" onChange={(e)=>this.handleImageChange(e)}/>
                    {this.state.errors&&<div>{this.state.errors.message}</div>}
                    <button type="submit" class="btn btn-primary" onClick={(e)=>this.handleSubmit(e)}>Next</button>
                </form>
                
            </div>
        )
    }
}

export default Create;
