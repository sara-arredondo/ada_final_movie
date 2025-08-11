import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutGeneral from "../components/LayoutGeneral";
import Home from "../views/Home";
import FullPopularMovies from "../views/FullPopularMovies";
import FullUltimosLanzamientosMovies from "../views/FullUltimosLanzamientosMovies";
import FavoritesMovies from "../views/FavoritesMovies";
import DetailMovieContainer from "../components/DetailMovieContainer";
import Buscador from "../views/Buscador";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutGeneral />}>
          <Route index element={<Home />} />
          <Route path="/PopularMovies" element={<FullPopularMovies />} />
          <Route path="/UltimosLanzamientos" element={<FullUltimosLanzamientosMovies />} />
          <Route path="/favoritos" element={<FavoritesMovies />} />
          <Route path="/movie/:id" element={<DetailMovieContainer />} />
          <Route path="/buscador" element={<Buscador />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}