import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";

import "./favorites.scss";
import useLocalStorageFavorites from "../../hooks/useLocalStorage";

import api from "../../api/api";
import apiConfig from "../../api/apiConfig";

import noImage from "../../assets/noImage.jpeg";
import { truncateString } from "../../utils/utils";

const Favorites = () => {
  const [open, setOpen] = useState(false);
  const [favorites, toggleFavorite] = useLocalStorageFavorites();
  const [data, setData] = useState([]);

  const bookmarkRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the bookmark component
    const handleClickOutside = (event) => {
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target)) {
        // Clicked outside the bookmark component, close it
        setOpen(false);
      }
    };
    // Attach the click event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await Promise.all(
        favorites.map((favorite) => api.detail(favorite.type, favorite.id))
      );
      setData(response);
    };
    getData();
  }, [favorites.length]);

  return (
    <div className="bookmark">
      <FaBookmark
        className="bookmark-icon"
        title="Favorites"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div ref={bookmarkRef} className="bookmark-list">
          {data.map((dataItem) => (
            <Link
              to={`/${dataItem.first_air_date ? "tv" : "movie"}/${dataItem.id}`}
            >
              <div className="bookmark-item">
                <div className="image-container" key={dataItem.id}>
                  <img
                    src={
                      apiConfig.smallImage(
                        dataItem.poster_path || dataItem.backdrop_path
                      ) || noImage
                    }
                    alt=""
                  />
                </div>
                <h2>
                  {truncateString(dataItem?.name, 30) ||
                    truncateString(dataItem?.title, 30)}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
