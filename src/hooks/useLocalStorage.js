import { useState, useEffect } from "react";

function useLocalStorageFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from local storage on component mount
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (movieId, type) => {
    // Check if the movie is already in favorites
    const isFavorite = favorites.some(
      (movie) => movie.id === movieId && movie.type === type
    );

    // If it's a favorite, remove it; otherwise, add it to favorites
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (movie) => !(movie.id === movieId && movie.type === type)
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, { id: movieId, type: type }];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    console.log(favorites, "changed");
  };

  return [favorites, toggleFavorite];
}

export default useLocalStorageFavorites;
