import React from "react";
import "./loader.scss";

const Loader = (props) => {
  return (
    <div
      className="loading-container"
      style={props.size ? { height: props.size } : {}}
    >
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loader;
