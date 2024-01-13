import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CatalogHeader from "../components/catalogHeader/CatalogHeader";
import List from "../components/list/List";

const Catalog = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (category !== "movie" && category !== "tv") {
      navigate("/not-found");
    }
  }, [navigate, category]);

  return (
    <section className="catalog">
      <CatalogHeader>{category === "tv" ? "TV SHOWS" : "MOVIES"}</CatalogHeader>
      <div className="container">
        <List category={category} />
      </div>
    </section>
  );
};

export default Catalog;
