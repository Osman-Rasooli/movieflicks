import { BrowserRouter } from "react-router-dom";

import { FavoritesProvider } from "./contexts/favoritesContext";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Routess from "./config/Routess";

import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <FavoritesProvider>
          <Header />
          <Routess />
          <Footer />
        </FavoritesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
