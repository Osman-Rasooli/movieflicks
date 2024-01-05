import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import api from "../../api/api";
import apiConfig from "../../api/apiConfig";
import Favorites from "../favorites/Favorites";
import { useDebounce } from "../../hooks/useDebounce";

import Loader from "../loader/Loader";

import logo from "../../assets/logo.png";
import NotFoundImage from "../../assets/noImage.jpeg";

import "./header.scss";

const Header = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let result = null;
      const params = { query: debouncedValue, page: 1, language: "en-US" };
      setLoading(true);
      result = await api.multi({ params });
      setLoading(false);
      setData(result.results);
    };
    getData();
  }, [debouncedValue]);
  const clickHandle = (e, media_type, id) => {
    e.preventDefault();
    navigate(`${media_type}/${id}`);
    setValue("");
  };
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-logo-box">
          <Link to="/">
            <img src={logo} alt="Logo" className="nav-logo" />
          </Link>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/movie" className="nav-link">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tv" className="nav-link">
              TV Shows
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <input
          type="text"
          placeholder="Search for Movies, Series, and More..."
          className="nav-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <CiSearch className="nav-input-icon" />
        <div className={`nav-results-wrapper ${!value ? "hide" : ""}`}>
          {loading ? (
            <Loader size="200px" />
          ) : (
            <ul style={{ cursor: "pointer" }}>
              {data.slice(0, 10).map((item, i) => {
                let name = item.name || item.title;
                name = name.length > 28 ? name.slice(0, 28) + "..." : name;
                let year = item.release_date || item.first_air_date;
                year = year ? year.split("-")[0] : "";
                let path = item.poster_path
                  ? apiConfig.smallImage(item.poster_path)
                  : NotFoundImage;
                return (
                  <li
                    key={i}
                    onClick={(e) => clickHandle(e, item.media_type, item.id)}
                  >
                    {/* <Link
                      to={`${item.media_type === "movie" ? "movie" : "tv"}/${
                        item.id
                      }`}
                    > */}
                    <div className="nav-item-wrapper">
                      <div className="nav-results-img">
                        <img src={path} alt={item.title || item.name} />
                      </div>
                      <div className="nav-item-desc">
                        <h4 className="nav-item-title">{name}</h4>
                        <small className="nav-item-year">{year}</small>
                      </div>
                    </div>
                    {/* </Link> */}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="nav-favorites">
        <Favorites />
      </div>
    </nav>
  );
};

export default Header;
