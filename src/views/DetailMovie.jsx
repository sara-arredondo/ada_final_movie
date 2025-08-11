import { useState } from "react";
import {
  Box, Chip, Typography, Button, Avatar, Stack,
  Dialog, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DetailMovie({ movie, onToggleFav, isFav }) {
  const [openTrailer, setOpenTrailer] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!movie) return null;

  return (
    <Box component="main" sx={{ pb: 4 }}>
      {/* Hero con backdrop */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 360, md: 460 },
          backgroundImage: movie.backdrop ? `url(${movie.backdrop})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.5), rgba(0,0,0,.85))" }} />
        <Box sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 4 }, pt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" fontWeight={800}>{movie.title}</Typography>
          <Typography sx={{ mt: 1, opacity: .85 }}>
            {movie.year} · {movie.runtime ? `${movie.runtime} min` : ""} · ⭐ {movie.vote?.toFixed?.(1) ?? "–"}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
            {movie.genres.map(g => <Chip key={g} label={g} size="small" />)}
          </Stack>
          <Typography sx={{ mt: 2, maxWidth: 800 }}>
            {movie.overview || "Sinopsis no disponible."}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
            {movie.trailerKey && (
              <Button variant="contained" onClick={() => setOpenTrailer(true)}>
                Ver tráiler
              </Button>
            )}
            <Button
              variant={isFav(movie.id) ? "outlined" : "contained"}
              color={isFav(movie.id) ? "secondary" : "primary"}
              onClick={() => onToggleFav(movie)}
            >
              {isFav(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Reparto */}
      {movie.cast?.length > 0 && (
        <Box sx={{ px: { xs: 2, md: 4 }, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Reparto principal</Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
            {movie.cast.map(c => (
              <Stack key={c.id} alignItems="center" sx={{ minWidth: 100 }}>
                <Avatar src={c.profile || undefined} alt={c.name} sx={{ width: 72, height: 72, mb: 1, bgcolor: "grey.800" }} />
                <Typography variant="body2" noWrap sx={{ maxWidth: 100 }}>{c.name}</Typography>
                <Typography variant="caption" sx={{ opacity: .7 }} noWrap>{c.character}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* Popup del tráiler */}
      <Dialog
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
        PaperProps={{ sx: { bgcolor: "black" } }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpenTrailer(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, color: "white" }}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ position: "relative", pt: "56.25%" }}>
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
              title={`${movie.title} – tráiler`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}