import React from "react";
import { Route, Routes } from "react-router-dom";

import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const Routess = () => {
  return (
    <main>
      <Routes>
        <Route path="/:category/search/:keyword" element={<Catalog />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Routess;
