import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
 
class DemoCarousel extends Component {

    render() {
        var images = this.props.items;
        return (
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                {images && images.map((x, index) => (
                  <div key={index}>
                    <img width={500} height={300} src={x.src} alt="" />
                  </div>
                ))}
            </Carousel>
        );
    }
}
 
export default DemoCarousel;