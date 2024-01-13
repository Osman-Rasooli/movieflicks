import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Mousewheel } from "swiper/modules";

import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";

import api, { category, movieType } from "../../api/api";
import apiConfig from "../../api/apiConfig";
import Button from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom CSS
import "./slider.scss";

const Slider = (props) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMediaData = async () => {
      let result = null;
      const params = {};
      switch (props.category) {
        case category.movie:
          result = await api.getMoviesList(props.type, params);
          break;
        default:
          result = await api.getTvList(props.type, params);
      }
      setMovies(result.results);
    };
    getMediaData();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <SliderContent
                movie={movie}
                key={movie.id}
                category={props.category}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {movies.map((movie, i) => (
        <TrailerModal key={i} movie={movie} />
      ))}
    </>
  );
};

const SliderContent = (props) => {
  const movie = props.movie;

  // Checking for movie/tv title
  const title = movie.title || movie.original_name;
  // Getting the release year only
  const release_year =
    props.category == "movie"
      ? movie.release_date.split("-")[0]
      : `Since ${movie.first_air_date.split("-")[0]}`;
  // getting backdrop if available, else getting movie poster
  const backdrop = apiConfig.originalImage(
    movie.backdrop_path ? movie.backdrop_path : movie.poster_path
  );
  // Formatting Rating
  const rating = movie.vote_average.toFixed(1);
  // Formatting Overview, not to be more than 200 chars
  const overview =
    movie.overview.length > 220
      ? movie.overview.slice(0, 220) + "..."
      : movie.overview;
  const navigate = useNavigate();

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${movie.id}`);
    const videos = await api.getVideos(props.category, movie.id);

    if (videos.results.length > 0) {
      const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`;
      modal
        .querySelector(".modal-content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal-content").innerHTML =
        "<h1>No Trailer Found!</h1>";
    }
    modal.classList.toggle("active");
  };

  return (
    <div className="slider" style={{ backgroundImage: `url(${backdrop})` }}>
      <div className="slider-wrapper">
        <div className="slider-content">
          <h2 className="slider-title">{title}</h2>
          <h4 className="slider-release--year">{release_year}</h4>
          <p className="slider-vote">
            <span>{rating}</span>
            <FaStar className="star-icon" />
            <span className="vote-count">
              / {movie.vote_count} <small>(votes)</small>
            </span>
          </p>
          <p className="slider-overview">{overview}</p>
          <Button
            onClick={() =>
              navigate(
                `/${props.category == "movie" ? "movie" : "tv"}/${movie.id}`
              )
            }
            className="mr-sm"
          >
            Watch Now
          </Button>
          <Button outlined={true} onClick={setModalActive}>
            Watch Trailer
          </Button>
        </div>
        <div className="slider-poster">
          <img
            src={apiConfig.smallImage(movie.poster_path)}
            alt={movie.title}
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const movie = props.movie;
  const movieRef = useRef(null);

  const onClose = () => movieRef.current.setAttribute("src", "");
  return (
    <Modal active={false} id={`modal_${movie.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={movieRef} width="100%" height="500px" title="Trailer" />
      </ModalContent>
    </Modal>
  );
};

export default Slider;
