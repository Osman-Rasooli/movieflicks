import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import api from "../../api/api";

const VideoList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await api.getVideos(category, props.id);
        setVideos(response.results.slice(0, 5));
        if (!response.ok) {
          throw new Error("No Videos Found!");
        }
      } catch (error) {
        return;
      }
    };
    getVideos();
  }, [category, props.id]);
  return (
    <div className="video-container">
      {videos.length > 0 ? (
        videos.map((video, i) => <Video key={i} item={video} />)
      ) : (
        <h1 style={{ margin: "0 auto" }}>No Videos Found</h1>
      )}
    </div>
  );
};

const Video = ({ item }) => {
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        title={`video - ${item.name}`}
      ></iframe>
    </div>
  );
};

export default VideoList;
