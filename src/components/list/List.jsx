import React, { useCallback, useEffect, useState } from "react";

import "./list.scss";
import { useParams, Link, useNavigate } from "react-router-dom";

import api, { category, movieType, tvType } from "../../api/api";
import apiConfig from "../../api/apiConfig";

import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import Input from "../input/Input";

import imageNotFound from "../../assets/noImage.jpeg";

const List = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { keyword, category } = useParams();

  const handlePageChange = useCallback(
    (pageNumber) => {
      setPage(pageNumber);
    },
    [page]
  );

  useEffect(() => {
    setPage(1);
  }, [props.category]);

  useEffect(() => {
    const getList = async () => {
      let result = null;
      setLoading(true);
      if (!keyword) {
        const params = page === 1 ? {} : { page: page };
        switch (props.category) {
          case "movie":
            result = await api.getMoviesList(movieType.trending, { params });
            break;
          default:
            result = await api.getTvList(tvType.on_the_air, { params });
        }
      } else {
        const params = { query: keyword, page: page };
        result = await api.search(props.category, { params });
      }
      setItems(result.results);
      setTotalPages(result.total_pages > 100 ? 100 : result.total_pages);
      setLoading(false);
    };
    getList();
    window.scrollTo({ top: 0 });
  }, [props.category, keyword, page]);
  return (
    <>
      {!loading ? (
        <div className="list">
          <div className="list-search mb-md">
            <SearchMedia
              category={props.category}
              keyword={keyword}
              setPage={setPage}
            />
          </div>
          <div className="list-gallery">
            {items.map((item) => (
              <Link to={`/${category}/${item.id}`} key={item.id}>
                <div className="list-gallery-item">
                  <img
                    src={
                      item.poster_path
                        ? apiConfig.smallImage(item.poster_path)
                        : imageNotFound
                    }
                    alt={item.title || item.name}
                  />
                  <div className="list-item-overlay">
                    <div className="list-item-title">
                      {item.name || item.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="list-pagination">
            <Pagination
              className="pagination-bar"
              currentPage={page}
              numPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const SearchMedia = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const navigate = useNavigate();

  const search = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
      props.setPage(1);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        search();
      }
    };

    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, search]);
  return (
    <div className="search-media">
      <Input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={search} className="search-btn">
        Search
      </button>
    </div>
  );
};

export default List;
