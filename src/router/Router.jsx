import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import DetailMovie from "../views/DetailMovie";
import FullPopularMovies from "../views/FullPopularMovies";
import FullUltimosLanzamientosMovies from "../views/FullUltimosLanzamientosMovies";
import Buscador from "../views/Buscador";


function Router() {  
  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={< DetailMovie/>} />
        <Route path="/PopularMovies" element={< FullPopularMovies/>} />
        <Route path="/UltimosLanzamientos" element={< FullUltimosLanzamientosMovies/>} />
        <Route path="/buscador" element={< Buscador/>} />
    </Routes>
  </BrowserRouter>;

}

export default Router