import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import DetailMovie from "../views/DetailMovie";
import FullPopularMovies from "../views/FullPopularMovies";
import FullUltimosLanzamientosMovies from "../views/FullUltimosLanzamientosMovies";
import Buscador from "../views/Buscador";
import FavoritesMovies from "../views/FavoritesMovies"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function Router() {  
  return <BrowserRouter>
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={< DetailMovie/>} />
        <Route path="/PopularMovies" element={< FullPopularMovies/>} />
        <Route path="/UltimosLanzamientos" element={< FullUltimosLanzamientosMovies/>} />
        <Route path="/Favorites" element={< FavoritesMovies/>} />
        <Route path="/buscador" element={< Buscador/>} />
    </Routes>
    <Footer />
  </BrowserRouter>;

}

export default Router