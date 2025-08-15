import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

import { FavoriteContext } from "../context/FavoriteContext";
import FullMoviesGrid from "../components/FullMoviesGrid";

export default function FavoritesMovies() {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const onCardClick = (id) => navigate(`/movie/${id}`);
  const isFav = (id) => favorite.some((f) => f.id === id);
  const onToggleFav = (movie) =>
    setFavorite((prev) =>
      prev.some((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, movie]
    );

  if (!favorite || favorite.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: "#272727",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e7edf2",
          px: 2,
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center"
          }}>
          Escoge tus favoritos para verlos aquí
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/PopularMovies")} 
        >
          Ir a explorar películas
        </Button>
      </Box>
    );
  }

  return (
    <FullMoviesGrid
      title="Mis favoritos"
      movies={favorite}
      page={1}
      totalPages={1}
      onPageChange={() => {}}
      onCardClick={onCardClick}
      isFav={isFav}
      onToggleFav={onToggleFav}
    />
  );
}