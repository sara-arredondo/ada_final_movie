import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { FavoriteContext } from "../context/FavoriteContext";
import FullMoviesGrid from "../components/FullMoviesGrid";

export default function FavoritesMovies() {
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const onCardClick = (id) => navigate(`/movie/${id}`);
  const isFav = (id) => favorite.some((f) => f.id === id);
  const onToggleFav = (movie) =>
    setFavorite((prev) => prev.filter((f) => f.id !== movie.id));

  if (!favorite?.length) {
    return (
      <Box sx={{ px: { xs: 2, md: 3 }, py: 6, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Aún no tienes favoritos
        </Typography>
        <Typography sx={{ mb: 3, opacity: 0.8 }}>
          Explora las películas populares y agrega algunas a tu lista ❤️
        </Typography>
        <Button component={Link} to="/PopularMovies" variant="contained">
          Ver populares
        </Button>
      </Box>
    );
  }

  // Usa el GRID directamente (sin API, sin container)
  return (
    <FullMoviesGrid
      title="Mis favoritos"
      movies={favorite}          // asegúrate de guardar {id, title, poster, year?, vote?}
      page={1}
      totalPages={1}
      onPageChange={() => {}}
      onCardClick={onCardClick}
      isFav={isFav}
      onToggleFav={onToggleFav}
    />
  );
}