import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";

import useMovieDetail from "../hooks/useMovieDetail"; 
import DetailMovie from "../views/DetailMovie";               

export default function DetailMovieContainer() {
  const { id } = useParams();
  const { data: movie, status, error } = useMovieDetail(id);

  const { favorite, setFavorite } = useContext(FavoriteContext);
  const isFav = (movieId) => favorite.some((f) => f.id === movieId);
  const onToggleFav = (m) => {
    setFavorite((prev) =>
      prev.some((f) => f.id === m.id)
        ? prev.filter((f) => f.id !== m.id)
        : [...prev, { id: m.id, title: m.title, poster: m.poster, year: m.year, vote: m.vote }]
    );
  };

  return <DetailMovie 
    movie={movie} 
    isFav={isFav} 
    status={status}
    onToggleFav={onToggleFav} />;
}