import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import '../css/Category.css';
import axios from "axios";

const Category = (props) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get("http://3.133.113.96:2000/api/home/category").then(res => {
            setSuggestions(res.data.data.categorys);
        }).catch(error => {
            console.log(error)
        });
    });


    let settings = {
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
    return (
        <div className="container-fluid bg-custom">
        <div className="container container-item">
            {suggestions.length === 0 ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                    <Slider {...settings}>
                        {suggestions.map(current => (
                            <div className="out" key={current._id}>
                                <div className="category-cover" style={{backgroundImage: "url("+current.image+")"}}>
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
    );
};

export default Category;