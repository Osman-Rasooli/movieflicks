import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";
import apiConfig from "../../api/apiConfig";

import personImage from "../../assets/person.png";

const CastList = (props) => {
  const [casts, setCasts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    const getCasts = async () => {
      try {
        const response = await api.credits(category, props.id);
        setCasts(response.cast.slice(0, 6));
      } catch (err) {
        return;
      }
    };
    getCasts();
  }, [category, props.id]);
  return (
    <div className="cast-list">
      {casts.length > 0 ? (
        casts.map((cast, i) => (
          <div className="cast-list-item" key={i} title={cast.name}>
            <Link to={`/person/${cast.id}`}>
              <img
                src={
                  cast.profile_path
                    ? apiConfig.smallImage(cast.profile_path)
                    : personImage
                }
                alt={cast.name}
              />
              <p>{cast.name}</p>
            </Link>
          </div>
        ))
      ) : (
        <h2>No Casts Found</h2>
      )}
    </div>
  );
};

export default CastList;
