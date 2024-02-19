import React, { createContext, useContext } from "react";
import useLocalStorageFavorites from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Use the useLocalStorageFavorites hook to manage favorites state
  const [favorites, toggleFavorite] = useLocalStorageFavorites();

  return (
    // Provide favorites state and toggle function to its children
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
