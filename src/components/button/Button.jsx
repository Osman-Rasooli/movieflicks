import React from "react";

import "./Button.scss";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={`btn ${props.outlined ? "btn-outlined" : ""} ${
          props.className ? props.className : ""
        }`}
      >
        {props.children}
      </a>
    );
  }
  return (
    <button
      onClick={props.onClick ? () => props.onClick() : null}
      className={`btn ${props.outlined ? "btn-outlined" : ""} ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
