import React, { Component } from 'react'
import axios from "axios";
import Picture from '../common/Picture';
class CreateStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [""]
        };
    }

    handleChange(e, index){
        this.state.ingredients[index] = e.target.value;
        this.setState({ingredients: this.state.ingredients})
    };

    addIngredient(){
        if(this.state.ingredients.length < 10){
            this.setState({
                ingredients: [...this.state.ingredients, ""]
            })
        }
        
    }

    handleRemove(index){
        this.state.ingredients.splice(index,1);
        this.setState({ingredients: this.state.ingredients});

    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        let data = {
            ingredients: this.state.ingredients,
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
                        this.state.ingredients.map((ingredient, index) =>{
                            return(
                            <div key={index}>
                                <input onChange={(e) => this.handleChange(e, index)} value={ingredient}/>
                                {index>0&&<button onClick={() => this.handleRemove(index)}>Remove</button>}
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
