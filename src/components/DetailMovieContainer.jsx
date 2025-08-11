import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import useMovieDetail from "../hooks/useMovieDetail"; // asegúrate de que el archivo exista
import { FavoriteContext } from "../context/FavoriteContext";
import DetailMovie from "../views/DetailMovie";               // UI presentacional con el popup

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

  if (status === "idle" || status === "loading") return <Box p={3}>Cargando…</Box>;
  if (status === "error") return <Box p={3} color="error.main">No se pudo cargar: {error?.message ?? "Error"}</Box>;
  if (!movie) return <Box p={3}>No encontrado.</Box>;

  return <DetailMovie movie={movie} isFav={isFav} onToggleFav={onToggleFav} />;
}