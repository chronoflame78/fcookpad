import React, { Component } from 'react'
import axios from "axios";
import Picture from '../common/Picture';
class CreateStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step_image_1: "",
            step_content_1: "",
        };
    }

    handleChange(e, index){
        this.state.steps[index] = e.target.value;
        this.setState({steps: this.state.steps})
    };

    addStep(){
        if(this.state.steps.length < 10){
            this.setState({
                steps: [...this.state.steps, ""]
            })
        }
        
    }

    handleRemove(index){
        this.state.steps.splice(index,1);
        this.setState({steps: this.state.steps});

    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            steps: this.state.steps,
            step: 2
        }
        console.log(data)
        //   axios
        //     .post("http://157.230.44.169:3000/api/auth/resendEmail", data)
        //     .then(res => console.log(res)) 
        //     .catch(err =>
        //       console.log(err)
        //     );
    }


    render() {

        return (
            <div className="container">

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.state.steps.map((step, index) =>{
                            return(
                            <div key={index}>
                                {"Step"+(index+1)}
                                <div class="form-group">                               
                                <label>Cách làm: </label>
                                <input onChange={(e) => this.handleChange(e, index)} value={step}/>
                                {index>0&&<button onClick={() => this.handleRemove(index)}>Remove</button>}
                                </div>
                                
                            </div>
                            );
                        })
                    }            
                </form>
                <button onClick={(e) => this.addIngredient(e)}>Thêm nguyên liệu</button>
                <button type="submit" class="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Next</button>

            </div>
        )
    }
}

export default CreateStep2;
