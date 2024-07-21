import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
import "./welcome.css";
import { EffectCreative, Autoplay } from "swiper/modules";

import cover1 from "../../../assets/banners/background4.jpg";
import cover2 from "../../../assets/banners/background6.jpg";

/*
  The Welcome component is dynamic and uses a swiper,
  to prevent the monotony on auth page
*/

const Welcome = () => {
  const images = [cover1, cover2];

  return (
    <div className="welcome">
      <Swiper
        grabCursor={true}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[EffectCreative, Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="image-wrapper">
              <img src={image} alt={`cover image ${index + 1}`} />
            </div>
            <div className="overlay">
              <div className="text">
                <h1>Readcity for Teachers</h1>
                <span className="light-text-gradient">
                  © Readcity Technologies 2024. All rights reserved
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Welcome;
