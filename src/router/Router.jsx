import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../views/Home";
import FullUltimosLanzamientosMovies from "../views/FullUltimosLanzamientosMovies.jsx"
import FullPopularMovies from "../views/FullPopularMovies.jsx";    
import DetailMovie from "../views/DetailMovie";
import FavoritesMovies from "../views/FavoritesMovies.jsx";
import Buscador from "../views/Buscador.jsx";
import DetailMovieContainer from "../components/DetailMovieContainer";
    


export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PopularMovies" element={<FullPopularMovies />} />
        <Route path="/UltimosLanzamientos" element={<FullUltimosLanzamientosMovies />} />
        <Route path="/favoritos" element={<FavoritesMovies />} />
        <Route path="/movie/:id" element={<DetailMovieContainer />} />
        <Route path="/buscador" element={<Buscador />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}