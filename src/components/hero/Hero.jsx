import React from "react";

import Button from "../button/Button";

import img1 from "../../assets/aquman-poster.jpeg";
import img2 from "../../assets/avengers-poster.jpeg";
import img3 from "../../assets/hunger-poster.jpeg";
import img4 from "../../assets/alita-battle.jpeg";
import img5 from "../../assets/killers-of-the-flower-moon.jpeg";

import "./hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">MovieFlicks</h1>
        <h2 className="hero-subtitle">Explore the Cinematic Universe</h2>
        <Button outlined={false} href="#trending-now-movies">
          Explore
        </Button>
      </div>
      <div className="hero-gallery">
        <img src={img1} alt="movie" className="hero-gallery__img1" />
        <img src={img2} alt="movie" className="hero-gallery__img1" />
        <img src={img3} alt="movie" className="hero-gallery__img1" />
        <img src={img4} alt="movie" className="hero-gallery__img1" />
        <img src={img5} alt="movie" className="hero-gallery__img1" />
      </div>
    </section>
  );
};

export default Hero;
