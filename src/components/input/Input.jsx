import React from "react";
import { CiSearch } from "react-icons/ci";

import "./input.scss";

const Input = (props) => {
  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange(e) : null}
      />
      <CiSearch className="search-input-icon" />
    </div>
  );
};

export default Input;
