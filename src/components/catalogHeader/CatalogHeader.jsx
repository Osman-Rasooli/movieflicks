import React from "react";

import "./catalog-header.scss";

const CatalogHeader = ({ children }) => {
  return (
    <div className="catalog-header">
      <h2 className="catalog-header-title">{children}</h2>
    </div>
  );
};

export default CatalogHeader;
