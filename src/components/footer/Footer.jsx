import React from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

import logo from "../../assets/logo.png";

import "./footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-desc">
          <img src={logo} alt="logo" />
          <p>
            <Link to="/">
              <span className="brand">MovieFlicks</span>
            </Link>
            is your ultimate destination for cinematic exploration and
            entertainment. As a dynamic movie and series database, MovieFlicks
            caters to the avid film enthusiast, offering a seamless platform to
            discover, discuss, and delve into the world of movies and series.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-left">
            <h2 className="footer-subheading">Quick Links</h2>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="/" className="footer-link">
                  HOME
                </a>
              </li>
              <li className="footer-item">
                <Link to="/movies" className="footer-link">
                  MOVIES
                </Link>
              </li>
              <li className="footer-item">
                <Link to="/tv" className="footer-link">
                  TV SHOWS
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-center">
            <h2 className="footer-subheading">Explore</h2>
            <div className="explore-wrapper">
              <div className="explore-left">
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="#trending-now-movies" className="footer-link">
                      TRENDING MOVIES
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="#popular-movies" className="footer-link">
                      POPULAR MOVIES
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="#top-rated-movies" className="footer-link">
                      TOP-RATED MOVIES
                    </a>
                  </li>
                </ul>
              </div>
              <div className="explore-right">
                <ul className="footer-list">
                  <li className="footer-item">
                    <a href="#popular-tv-shows" className="footer-link">
                      POPULAR TV SHOWS
                    </a>
                  </li>
                  <li className="footer-item">
                    <a href="#on-the-air-tv-shows" className="footer-link">
                      ON THE AIR TV SHOWS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <h2 className="footer-subheading">Connect with Us</h2>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="/" className="footer-link">
                  <FaFacebookSquare className="link-icon" />
                </a>
              </li>
              <li className="footer-item">
                <a href="/" className="footer-link">
                  <FaXTwitter className="link-icon" />
                </a>
              </li>
              <li className="footer-item">
                <a href="/" className="footer-link">
                  <FaInstagramSquare className="link-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            &copy;{" "}
            <span className="copyright-year">{new Date().getFullYear()}</span>{" "}
            MovieFlicks. All rights reserved.
          </p>
          <p>
            For inquiries regarding the use or licensing of MovieFlicks content,
            please contact us at{" "}
            <a
              className="copyright-mail"
              href="mailto:mohammad.osmanrasooli1973@gmail.com"
            >
              <FaEnvelope />
            </a>
          </p>
          <p>
            Special thanks to{" "}
            <a
              href="https://www.themoviedb.org/"
              style={{ fontWeight: "bold" }}
            >
              TMDBAPI
            </a>{" "}
            for powering the cinematic magic on MovieFlicks with their
            exceptional API.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
