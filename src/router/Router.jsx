import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../views/Home";
import FullMoviesContainer from "../components/FullMoviesContainer.jsx";
import DetailMovie from "../views/DetailMovie";
import FavoritesMovies from "../views/FavoritesMovies.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<FullMoviesContainer endpoint="/movie/popular" title="Películas populares" />} />
        <Route path="/ultimos-lanzamientos" element={<FullMoviesContainer endpoint="/movie/now_playing" title="Últimos lanzamientos" />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
        <Route path="/favoritos" element={<FavoritesMovies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}