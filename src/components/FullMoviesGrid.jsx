import {Box, Grid, Card, CardActionArea, CardMedia, CardContent,Typography, IconButton, Pagination} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export default function FullMoviesGrid({
  title,
  movies = [],
  page = 1,
  totalPages = 1,
  onPageChange,
  onCardClick,
  isFav = () => false,
  onToggleFav,
}) {
  const safeTotal = Math.min(totalPages || 1, 500);

  return (
    <Box component="main" sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "baseline", gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>{title}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Página {page} de {safeTotal}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {movies.map((m) => (
          <Grid key={m.id} item xs={6} sm={4} md={3} lg={2} xl={2}>
            <Card sx={{ bgcolor: "grey.900", position: "relative", borderRadius: 3, overflow: "hidden" }}>
              <CardActionArea onClick={() => onCardClick?.(m.id)}>
                <CardMedia
                  component="img"
                  image={m.poster}
                  alt={m.title}
                  sx={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                  loading="lazy"
                />
              </CardActionArea>

              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onToggleFav?.(m); }}
                aria-label={isFav(m.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                sx={{
                  position: "absolute", top: 8, right: 8,
                  bgcolor: "rgba(0,0,0,.6)", color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,.8)" },
                }}
              >
                {isFav(m.id) ? <Favorite htmlColor="red" /> : <FavoriteBorder />}
              </IconButton>

              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2" noWrap>{m.title}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {m.year} · ⭐ {m.vote?.toFixed?.(1) ?? "–"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {safeTotal > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={safeTotal}
            page={page}
            onChange={onPageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Box>
  );
}