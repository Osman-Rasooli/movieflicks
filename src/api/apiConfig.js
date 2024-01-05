const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  originalImage: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  smallImage: (path) => `https://image.tmdb.org/t/p/w500/${path}`,
};

export default apiConfig;
