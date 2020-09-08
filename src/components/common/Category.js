import React, { Component } from 'react';
import Slider from "react-slick";
import '../../css/Category.css';
import { Link } from 'react-router-dom';
var dragging;
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };

    }


    settings = {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 7,
        slidesToScroll: 3,
        swipeToSlide: true,
        beforeChange: () => dragging = true,
        afterChange: () => dragging = false,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
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
            <div className="container-fluid category-bg-custom">
                <div className="container category-container-item">
                    {this.props.suggestions.length === 0 ? (
                        <div className="category-loading-div"></div>
                    ) : (
                            <Slider {...this.settings}>
                                {this.props.suggestions.map(current => (
                                    <div className="out" key={current._id}>
                                        
                                        <div className="category-cover" style={{ backgroundImage: "url(" + current.image + ")" }}>
                                        <Link to={"/search?categoryid="+current._id} onClick={(e)=> dragging && e.preventDefault()}>
                                            <div className="overlay">
                                                {current.title.toUpperCase()}
                                            </div>
                                            </Link>
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