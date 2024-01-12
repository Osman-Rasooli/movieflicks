import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/hero/Hero";
import Button from "../components/button/Button";
import Slider from "../components/slider/Slider";
import MediaSlider from "../components/mediaSlider/MediaSlider";
import { category, movieType, tvType } from "../api/api";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container">
        {/* Trending Movies Slider */}
        <section id="trending-now-movies" className="trending mb-md mt-lg">
          <div className="section-heading mb-sm">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <Button outlined={true} className="sm">
                View More
              </Button>
            </Link>
          </div>
          <div className="slider">
            <Slider category={category.movie} type={movieType.trending} />
          </div>
        </section>
        {/* Popular Movies Carousel */}
        <section id="popular-movies" className="trending mb-md mt-lg">
          <div className="section-heading mb-sm">
            <h2>Popular Movies</h2>
            <Link to="/movie">
              <Button outlined={true} className="sm">
                View More
              </Button>
            </Link>
          </div>
          <div className="carousel-wrapper">
            <MediaSlider category={category.movie} type={movieType.trending} />
          </div>
        </section>
        {/* Top Rated Movies Carousel */}
        <section id="top-rated-movies" className="trending mb-md mt-md-neg">
          <div className="section-heading mb-sm">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <Button outlined={true} className="sm">
                View More
              </Button>
            </Link>
          </div>
          <div className="carousel-wrapper">
            <MediaSlider category={category.movie} type={movieType.upcoming} />
          </div>
        </section>
        {/* Popular TV Shows Slider */}
        <section id="popular-tv-shows" className="trending mb-md mt-lg">
          <div className="section-heading mb-sm">
            <h2>Popular TV Shows</h2>
            <Link to="/tv">
              <Button outlined={true} className="sm">
                View More
              </Button>
            </Link>
          </div>
          <div className="slider">
            <Slider category={category.tv} type={tvType.popular} />
          </div>
        </section>
        {/* On The Air Tv Shows Carousel */}
        <section id="on-the-air-tv-shows" className="trending mb-md mt-md-neg">
          <div className="section-heading mb-sm">
            <h2>On the Air TV Shows</h2>
            <Link to="/tv">
              <Button outlined={true} className="sm">
                View More
              </Button>
            </Link>
          </div>
          <div className="carousel-wrapper">
            <MediaSlider category={category.tv} type={tvType.on_the_air} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
