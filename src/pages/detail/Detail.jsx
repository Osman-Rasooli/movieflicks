import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Icons
import { CiClock2 } from "react-icons/ci";
import { IoEarth } from "react-icons/io5";
import { FaFilm } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaImdb } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

// PlaceHolder Images
import personImage from "../../assets/person-light.jpeg";
import noImage from "../../assets/noImage.jpeg";

import { useFavorites } from "../../contexts/favoritesContext";

import api from "../../api/api";
import apiConfig from "../../api/apiConfig";

import Loader from "../../components/loader/Loader";

import CastList from "./CastList";
import VideoList from "./VideoList";
import SimilarList from "./SimilarList";

import { convertMinutesToHours, truncateString } from "../../utils/utils";

import "./detail.scss";

const Detail = () => {
  const { category, id } = useParams();
  // if (id === "popular") return navigate(`/`);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  // Casts Individual Movies
  const [itemMovieList, setItemMovieList] = useState([]);
  // Casts Individual Photos
  const [photos, setPhotos] = useState([]);
  // Getting favorites list from Local Storage
  const { favorites, toggleFavorite } = useFavorites();
  useEffect(() => {
    const getData = async () => {
      let response = null;
      let movieList = [];
      let photoList = [];

      switch (category) {
        case "person":
          response = await api.personDetails(id);
          movieList = await api.getPersonMovies(response.id);
          movieList.cast.length > 6
            ? setItemMovieList(movieList.cast.slice(0, 6))
            : setItemMovieList(movieList.cast);
          photoList = await api.getPersonPhotos(id);
          photoList.profiles.length > 8
            ? setPhotos(photoList.profiles.slice(0, 8))
            : setPhotos(photoList.profiles);
          break;
        default:
          response = await api.detail(category, id, { params: {} });
      }
      setItem(response);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    getData();
  }, [category, id]);

  return (
    <div className="detail">
      {loading ? (
        <Loader size="50vh" />
      ) : category === "person" ? (
        <DisplayPerson
          data={item}
          movieList={itemMovieList}
          photoList={photos}
        />
      ) : (
        <DisplayData
          data={item}
          category={category}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

const DisplayData = ({ data, category, favorites, toggleFavorite }) => {
  let isFavorite = favorites.some(
    (movie) => movie.id === data.id && movie.type === category
  );
  let runtime = data.runtime;
  runtime = convertMinutesToHours(parseFloat(runtime));
  return (
    <div className="detail-wrapper">
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)) ,url(${apiConfig.originalImage(
            data.backdrop_path || data.poster_path
          )})`,
        }}
      ></div>
      <div className="detail-content container">
        <div
          className="detail-content-poster"
          style={{
            backgroundImage: `linear-gradient(to bottom right, transparent, transparent 70%, rgba(0, 0, 0, 1)) ,url(${
              data.poster_path && apiConfig.originalImage(data.poster_path)
            } )`,
          }}
        >
          <div
            className="detail-favorite"
            onClick={() => toggleFavorite(data.id, category)}
          >
            {isFavorite ? (
              <FaStar className="detail-favorite-icon" />
            ) : (
              <FaRegStar className="detail-favorite-icon" />
            )}
          </div>
        </div>
        <div className="detail-content-desc">
          <div className="title-container">
            <h2 className="title">{data.title || data.name} </h2>
            {data.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                className="imdb-btn"
              >
                <FaImdb className="imdb-icon" />
                <span>Go to IMDb</span>
              </a>
            )}
          </div>
          {data.tagline && <h4 className="tagline">{data.tagline}</h4>}
          {data.release_date && (
            <small className="year">{data.release_date.split("-")[0]}</small>
          )}
          {data.first_air_date && (
            <>
              <small className="first-air-on">First Aired on: </small>
              <small className="year">
                {data.first_air_date.split("-")[0]}
              </small>
            </>
          )}
          <div className="genres">
            {data.genres &&
              data.genres.slice(0, 5).map((genre, i) => (
                <span className="genre" key={i}>
                  {genre.name}
                </span>
              ))}
          </div>
          <div className="runtime-langs">
            {runtime && (
              <div className="runtime tag">
                <CiClock2 className="runtime-icon" />
                <span>{runtime}</span>
              </div>
            )}
            {data.spoken_languages && (
              <div className="langs tag">
                <IoEarth className="langs-icon" />
                {data.spoken_languages.map((lang, i) => (
                  <span key={i} className="langs-item">
                    {lang.english_name}
                  </span>
                ))}
              </div>
            )}
            {data.number_of_seasons && (
              <div className="seasons tag">
                <FaFilm className="seasons-icon" />
                <span>{data.number_of_seasons} Seasons</span>
              </div>
            )}
            {data.vote_average && (
              <div className="vote tag">
                <FaStar className="vote-icon" />
                <span className="vote-average">
                  {data.vote_average.toFixed(1)}
                </span>
                <span>{` / ${data.vote_count} votes`}</span>
              </div>
            )}
          </div>
          <p className="overview">{data.overview}</p>
          <div className="casts">
            <h3>Casts</h3>
            <CastList id={data.id} />
          </div>
        </div>
      </div>
      <div className="detail-videos container">
        <h2 className="section-title">Videos</h2>
        <VideoList id={data.id} />
      </div>
      <div className="similar container">
        <h2 className="section-title">
          Explore Similar {category === "movie" ? "Movies" : "TV Shows"}
        </h2>
        <SimilarList id={data.id} category={category} />
      </div>
    </div>
  );
};

const DisplayPerson = ({ data, movieList, photoList }) => {
  let biography = data.biography || "";
  biography =
    biography.length > 900 ? biography.slice(0, 900) + "..." : biography;
  return (
    <div className="detail-wrapper">
      <div className="detail-content container">
        <div
          className="detail-content-poster"
          style={{
            backgroundImage: `linear-gradient(to bottom right, transparent, transparent 70%, rgba(0, 0, 0, 1)) ,url(${apiConfig.smallImage(
              data.profile_path
            )})`,
          }}
        >
          {!data.profile_path && (
            <img
              src={personImage}
              alt={data.name}
              style={{ width: "30rem", height: "40rem", objectFit: "cover" }}
            />
          )}
        </div>
        <div className="detail-content-desc">
          <div className="title-container">
            <h2 className="title">{data.title || data.name} </h2>
            {data.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${data.imdb_id}`}
                className="imdb-btn"
              >
                <FaImdb className="imdb-icon" />
                <span>Go to IMDb</span>
              </a>
            )}
          </div>
          <div className="birth">
            <div className="birth-date tag">
              <MdOutlineDateRange className="birth-icon" />
              <span>
                <span className="light">Birth Date:</span>{" "}
                {data.birthday || "Not known"}
              </span>
            </div>
            <div className="birth-place tag">
              <IoLocation className="birth-icon" />
              <span>
                <span className="light">Birth Place:</span>{" "}
                {data.place_of_birth || "Not known"}
              </span>
            </div>
          </div>
          {data.biography && <p className="overview">{biography}</p>}
        </div>
      </div>
      <div className="detail-movies container">
        <h2 className="section-title">Movies</h2>
        {(movieList.length > 0 && (
          <div className="detail-person-movieList">
            {movieList.map((movie, i) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="detail-person-movieList-item">
                  <div className="detail-person-img-container">
                    <img
                      src={
                        movie.poster_path || movie.backdrop_path
                          ? apiConfig.smallImage(
                              movie.poster_path || movie.backdrop_path
                            )
                          : noImage
                      }
                      alt={movie.name}
                    />
                  </div>
                  <h3>
                    {truncateString(movie.name, 28) ||
                      truncateString(movie.title, 28)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )) || (
          <h1
            style={{
              padding: "3rem 0",
              textAlign: "center",
            }}
          >
            No Movies Found!
          </h1>
        )}
      </div>
      <div className="detail-photos container">
        <h2 className="section-title">Photos</h2>
        {(photoList.length > 0 && (
          <div className="detail-person-photos">
            {photoList.map((photo, i) => (
              <div className="detail-photo-item" key={i}>
                <img src={apiConfig.smallImage(photo.file_path)} alt={""} />
              </div>
            ))}
          </div>
        )) || (
          <h1
            style={{
              padding: "3rem 0",
              textAlign: "center",
            }}
          >
            No Photos Found!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Detail;
