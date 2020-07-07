import React, { Component } from 'react';
import Slider from "react-slick";
import '../../css/Category.css';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };

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
            <div className="container-fluid category-bg-custom">
                <div className="container category-container-item">
                    {this.props.suggestions.length === 0 ? (
                        <div className="category-loading-div"></div>
                    ) : (
                            <Slider {...this.settings}>
                                {this.props.suggestions.map(current => (
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