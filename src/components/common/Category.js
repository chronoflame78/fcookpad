import React, { Component } from 'react';
import Slider from "react-slick";
import '../../css/Category.css';
import axios from "axios";
// import Loader from '../common/LoaderVer3';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };

    }

    componentDidMount() {
        console.log("post did mount");
        this.mounted = true;
        axios.get("http://157.230.44.169:3000/api/home/category").then(res => {
            if (this.mounted) {
                this.setState({
                    suggestions: res.data.data.categorys,
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    settings = {
        infinite: false,
        speed: 1000,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 756,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    render() {
        return (
            <div className="container-fluid bg-custom">
                <div className="container container-item">
                    {this.state.suggestions.length === 0 ? (
                        <div className="loading-div"></div>
                    ) : (
                            <Slider {...this.settings}>
                                {this.state.suggestions.map(current => (
                                    <div className="out" key={current._id}>
                                        <div className="category-cover" style={{ backgroundImage: "url(" + current.image + ")" }}>
                                            <div className="overlay">
                                                {current.title.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </Slider>
                        )}
                </div>
            </div>
        )
    }
}


export default Category;