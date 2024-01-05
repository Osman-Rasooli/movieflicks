import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Mousewheel } from "swiper/modules";

import api, { category, movieType } from "../../api/api";
import apiConfig from "../../api/apiConfig";

import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

// Custom Styles
import "./media-slider.scss";

const MediaSlider = (props) => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const getMediaData = async () => {
      let result = null;
      const params = {};
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            result = await api.getMoviesList(props.type, params);
            break;
          default:
            result = await api.getTvList(props.type, params);
        }
      } else {
        result = await api.similar(props.category, props.id);
      }
      setMediaItems(result.results);
    };
    getMediaData();
  }, []);
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={5}
      grabCursor={true}
      centeredSlides={true}
      mousewheel={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Navigation, Mousewheel, Autoplay]}
      className="mySwiper media-slider"
    >
      {mediaItems.map((m) => {
        let title = m.title || m.name;
        if (title.length > 20) title = title.slice(0, 20) + "...";
        return (
          <SwiperSlide key={m.id}>
            <Link to={`${props.category == "movie" ? "movie" : "tv"}/${m.id}`}>
              <img
                src={apiConfig.smallImage(m.poster_path)}
                alt={m.title}
                className="media-poster"
              />
              <h1 className="media-title">{title}</h1>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MediaSlider;
