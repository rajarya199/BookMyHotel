import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMG_URL } from '../config';
import './imgSlider.css'
const ImgSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <div className="carousel-container mx-8 my-8">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-80 md:h-96">
            <img
              src={`${IMG_URL}/${image}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;

