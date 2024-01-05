import axios from "axios";
import axiosClient from "./axiosClient.js";

export const category = {
  movie: "movie",
  tv: "tv",
  person: "person",
};

export const movieType = {
  trending: "popular",
  top_rated: "top_rated",
  upcoming: "upcoming",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const api = {
  getMoviesList: (type, params) => {
    const url = `movie/${type}`;
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}`;
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}`;
    return axiosClient.get(url, params);
  },
  multi: (params) => {
    const url = `search/multi`;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = `${category[cate]}/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },
  detail: (cate, id, params) => {
    const url = `${category[cate]}/${id}`;
    return axiosClient.get(url, params);
  },
  personDetails: (id) => {
    const url = `person/${id}`;
    return axiosClient.get(url, { params: {} });
  },
  getPersonMovies: (id) => {
    const url = `person/${id}/movie_credits`;
    return axiosClient.get(url, { params: {} });
  },
  getPersonPhotos: (id) => {
    const url = `person/${id}/images`;
    return axiosClient.get(url, { params: {} });
  },
};

export default api;
