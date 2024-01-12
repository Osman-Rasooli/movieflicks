import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import api from "../../api/api";
import apiConfig from "../../api/apiConfig";

import NotFoundImage from "../../assets/noImage.jpeg";

const SimilarList = ({ id, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const response = await api.similar(category, id);
        setData(response.results);
      } catch (err) {
        return;
      }
    };

    getSimilar();
  }, [category, id]);

  return (
    <div className="similar-container">
      {data.length > 0 &&
        data.map((item, i) => {
          let title = item.title || item.name;
          return (
            <Link key={i} to={`/${category}/${item.id}`}>
              <div className="similar-item">
                <div className="similar-img">
                  <img
                    src={
                      item.poster_path
                        ? apiConfig.smallImage(item.poster_path)
                        : apiConfig.smallImage(item.backdrop_path)
                        ? NotFoundImage
                        : ""
                    }
                    alt=""
                  />
                </div>
                <h3 className="similar-title">
                  {title.length > 25 ? title.slice(0, 25) + "..." : title}
                </h3>
              </div>
            </Link>
          );
        })}
      {data.length === 0 && (
        <h2 style={{ margin: "0 auto" }}>
          No Similar {category === "movie" ? "Movies" : "TV Shows"} Found!
        </h2>
      )}
    </div>
  );
};
export default SimilarList;
