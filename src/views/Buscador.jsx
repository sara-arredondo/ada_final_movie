import { useState, useEffect, useContext, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FullMoviesGrid from "../components/FullMoviesGrid";
import useMovies from "../hooks/useMovies";
import { FavoriteContext } from "../context/FavoriteContext";

// Hook pequeño para debouncing
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Buscador() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(query, 400);

  const navigate = useNavigate();
  const { favorite, setFavorite } = useContext(FavoriteContext);

  // Reinicia a página 1 cuando cambia la búsqueda
  useEffect(() => { setPage(1); }, [debouncedQuery]);

  const params = useMemo(
    () => ({ page, query: debouncedQuery, include_adult: false }),
    [page, debouncedQuery]
  );

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

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      <SearchBar value={query} onChange={setQuery} autoFocus />

      {debouncedQuery.trim().length < 2 ? (
        <Typography sx={{ mt: 2, opacity: 0.8 }}>
          Escribe al menos 2 caracteres para buscar.
        </Typography>
      ) : status === "idle" || status === "loading" ? (
        <Typography sx={{ mt: 2 }}>Buscando…</Typography>
      ) : status === "error" ? (
        <Typography sx={{ mt: 2, color: "error.main" }}>
          No se pudo buscar: {error?.message ?? "Error"}
        </Typography>
      ) : (
        <FullMoviesGrid
          title={`Resultados para “${debouncedQuery}”`}
          movies={movies}
          page={meta?.page ?? page}
          totalPages={meta?.total_pages ?? 1}
          onPageChange={(_e, value) => setPage(value)}
          onCardClick={onCardClick}
          isFav={isFav}
          onToggleFav={onToggleFav}
        />
      )}
    </Box>
  );
}