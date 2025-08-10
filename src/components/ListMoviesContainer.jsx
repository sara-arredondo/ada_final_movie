import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FavoriteContext } from "../context/FavoriteContext";
import ListPopularMovies from "./ListPopularMovies";

export default function ListMoviesContainer() {
  const [popular, setPopular] = useState([]);
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

  useEffect(() => {
    const api_key = import.meta.env.VITE_API_KEY_MOVIES;
    axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: { api_key, language: "es-ES", region: "CO", page: 1 },
    }).then(({data}) => {
      const poster = (p, s="w342") => p ? `https://image.tmdb.org/t/p/${s}${p}` : null;
      const list = (data.results ?? [])
        .map(m => ({ id:m.id, title:m.title, poster:poster(m.poster_path) }))
        .filter(m => m.poster);
      setPopular(list);
    }).catch(console.error);
  }, []);

  const onCardClick = (id) => navigate(`/movie/${id}`);

  const isFav = (id) => favorite.some(f => f.id === id);
  const toggleFav = (movie) => {
    setFavorite(prev =>
      prev.some(f => f.id === movie.id)
        ? prev.filter(f => f.id !== movie.id)
        : [...prev, { id: movie.id, title: movie.title, poster: movie.poster }]
    );
  };

  return (
    <ListPopularMovies
      movies={popular}
      isFav={isFav}
      onToggleFav={toggleFav}
      onCardClick={onCardClick}
    />
  );
}