import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FavoriteContext } from "../context/FavoriteContext";
import useMovies from "../hooks/useMovies";


export default function BuscadorContainer({ children }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { favorite, setFavorite } = useContext(FavoriteContext);

  useEffect(() => { setPage(1); }, [query]);

  const params = useMemo(() => ({ page, query, include_adult: false }), [page, query]);

  const { items: movies, status, error, meta } = useMovies({
    endpoint: "/search/movie",
    mode: "card",
    params,
  });

  const onCardClick = (id) => navigate(`/movie/${id}`);
  const isFav = (id) => favorite.some((f) => f.id === id);
  const onToggleFav = (movie) =>
    setFavorite((prev) =>
      prev.some((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, movie]
    );

  const api = {
    query, setQuery,
    status, error,
    movies,
    page: meta?.page ?? page,
    totalPages: meta?.total_pages ?? 1,
    setPage,
    onCardClick,
    isFav,
    onToggleFav,
  };

  return typeof children === "function" ? children(api) : null;
}