import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, IconButton, Pagination } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export default function FullMoviesGrid({ title, movies = [], page = 1, totalPages = 1, onPageChange, onCardClick, isFav = () => false, onToggleFav, }) {
  const safeTotal = Math.min(totalPages || 1, 500);

  return (
    <Box
      component="main"
      sx={{
        px: { xs: 2, md: 3 },
        py: 3,
        bgcolor: "#272727",
        pt: 7
      }}>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          mb: 4
        }}>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.7,
            color:"#e7edf2"}}>
          Página {page} de {safeTotal}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(4, minmax(0, 1fr))",
            md: "repeat(5, minmax(0, 1fr))",
            lg: "repeat(6, minmax(0, 1fr))",
          },
        }}
      >
        {movies.map((m) => (
          <Card
            key={m.id}
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%", // para que todas llenen su celda
              borderRadius: 0,
              bgcolor: "#272727",
              color: "#e7edf2",
            }}
          >
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
                position: "absolute",
                top: 8,
                right: 8,
                color: "#e7edf2", "&:hover": { bgcolor: "rgba(0,0,0,.8)" },
              }}
            >
              {isFav(m.id) ? <Favorite htmlColor="#f35a5d " /> : <FavoriteBorder />}
            </IconButton>

            <CardContent
              sx={{
                py: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                minHeight: 80,
                maxHeight: 80,
                borderTop: "none",           
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: { xs: 2, md: 2 }, 
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "2.6em",
                }}
                title={m.title}
              >
                {m.title}
              </Typography>

             <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2" }}>
                <Typography
                    variant="caption"
                    sx={{ opacity: 0.7, whiteSpace: "nowrap" }}
                >
                    {m.year ?? ""}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ opacity: 0.7, whiteSpace: "nowrap" }}
                >
                    ★ {m.vote?.toFixed?.(1) ?? "–"}
                </Typography>
             </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {safeTotal > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={safeTotal}
            page={page}
            onChange={onPageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            sx={{
                "& .MuiPaginationItem-root": {
                color: "#e7edf2", //
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#f35a5d", 
                color: "#272727",  // texto del seleccionado
                fontWeight: "600"
                },
                "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: "#d94e50", // fondo en hover del seleccionado
                },
                "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(243, 90, 93, 0.2)", // hover en ítems no seleccionados
                },
            }}
          />
        </Box>
      )}
    </Box>
  );
}