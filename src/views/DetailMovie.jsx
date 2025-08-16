import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Chip, Typography, Button, Avatar, Stack, Dialog, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DetailMovie({ movie, isFav, onToggleFav, isLoading = false, error = null, }) {

  const [openTrailer, setOpenTrailer] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading || !movie) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#272727",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={48} thickness={4} sx={{ color: "#f35a5d" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#272727", color: "#e7edf2", p: 3 }}>
        <Typography variant="h6">No se pudo cargar: {String(error)}</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        pb: 4,
        bgcolor: "#000",
        color: "#e7edf2",
        minHeight: "100vh",
      }}
    >
      {/* Hero con fondo */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 500, md: 700 },
          backgroundColor: "#000", // fallback negro
          backgroundImage: movie.backdrop ? `url(${movie.backdrop})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}

      >
        {/* Capita con opacidad para legibilidad */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.85))",
          }}
        />

        {/* Contenido del hero */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, md: 4 },
            pt: { xs: 6, md: 24 },
            maxWidth: 1200,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: "#e7edf2",
            }}
          >
            {movie.title}
          </Typography>

          <Typography sx={{ mt: 1, opacity: 0.9 }}>
            {movie.year}
            {movie.runtime ? ` · ${movie.runtime} min` : ""}
            {" · "}
            ★ {movie.vote?.toFixed?.(1) ?? "–"}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
            {movie.genres?.map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "#e7edf2" }}
              />
            ))}
          </Stack>

          <Typography sx={{ mt: 2, maxWidth: 800, lineHeight: 1.6 }}>
            {movie.overview || "Sinopsis no disponible."}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mt: 6 }}>
            {movie.trailerKey && (
              <Button
                variant="contained"
                onClick={() => setOpenTrailer(true)}
                sx={{
                  color: "#272727",
                  backgroundColor: "#98c7f3",
                  textTransform: "none",
                  borderRadius: "20px",
                  "&:hover": { backgroundColor: "#d94b4e" },
                }}
              >
                Ver tráiler
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => onToggleFav?.(movie)}
              sx={{
                backgroundColor: isFav?.(movie.id) ? "#f35a5d" : "#98c7f3",
                color: "#272727",
                fontWeight: 600,
                px: 2.5,
                py: 1,
                textTransform: "none",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: isFav?.(movie.id) ? "#d94e51" : "#7fb3e6",
                },
              }}
            >
              {isFav?.(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* actores que salen en la peli */}
      {movie.cast?.length > 0 && (
        <Box sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Reparto principal
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
            {movie.cast.map((c) => (
              <Stack key={c.id} alignItems="center" sx={{ minWidth: 100 }}>
                <Avatar
                  src={c.profile || undefined}
                  alt={c.name}
                  sx={{ width: 72, height: 72, mb: 1, bgcolor: "grey.800" }}
                />
                <Typography variant="body2" noWrap sx={{ maxWidth: 100 }}>
                  {c.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }} noWrap>
                  {c.character}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* Popup tráiler */}
      <Dialog
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpenTrailer(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "white",
            }}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ position: "relative", pt: "56.25%" }}>
            {movie.trailerKey ? (
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
                title={`${movie.title} – tráiler`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <Typography variant="body2">
                  Tráiler no disponible.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}