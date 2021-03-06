import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    var images = this.props.items;
    const arrowStyles = {
      position: "absolute",
      zIndex: 2,
      top: "calc(50% - 15px)",
      width: 30,
      height: 50,
      fontSize: 50,
      cursor: "pointer",
      color: "#ffffff",
    };

    const indicatorStyles = {
      background: "#fff",
      width: 15,
      height: 15,
      display: "inline-block",
      margin: "0 8px",
      borderRadius: "50px",
      opacity: "40%",
      cursor: "pointer",
    };
    return (
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <i style={{ ...arrowStyles, left: 15 }} onClick={onClickHandler} className="fas fa-chevron-left"></i>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <i  style={{ ...arrowStyles, right: 15 }} onClick={onClickHandler} className="fas fa-chevron-right"></i>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, opacity: "100%", borderRadius: "50px" }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {images &&
          images.map((x, index) => (
            <div key={index} className="post-slide-image-container">
              <img width={450} height={300} src={x.src} alt="" />
            </div>
          ))}
          {/* {!images.length !== 0 && (
            <div className="no-image-container">
            </div>
          )} */}
      </Carousel>
    );
  }
}

export default DemoCarousel;
