import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../views/Home";
import FullUltimosLanzamientosMovies from "../views/FullUltimosLanzamientosMovies.jsx"
import FullPopularMovies from "../views/FullPopularMovies.jsx";    
import DetailMovie from "../views/DetailMovie";
import FavoritesMovies from "../views/FavoritesMovies.jsx";
    


export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PopularMovies" element={<FullPopularMovies />} />
        <Route path="/UltimosLanzamientos" element={<FullUltimosLanzamientosMovies />} />
        <Route path="/favoritos" element={<FavoritesMovies />} />
        <Route path="/movie/:id" element={<DetailMovie />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}