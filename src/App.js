import { BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Routess from "./config/Routess";

import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Header />
          <Routess />
          <Footer />
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
