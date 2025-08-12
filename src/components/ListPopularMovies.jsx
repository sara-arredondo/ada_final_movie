import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ListPopularMovies({
  movies = [],
  isFav = () => false,
  onToggleFav,
  onCardClick,
}) {
  return (
    <Box component="section" sx={{ py: 3, mt: 4 }}>
      <Box sx={{ px: 4, display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6" sx={{
            fontWeight: 600,        // más negrita
            color: "#fff4b6",       // color personalizado
        }}>Últimos lanzamientos</Typography>
        
      </Box>

      <Box
        sx={{
          mx: 2,
          p: { xs: 1, sm: 2 },
          overflow: "hidden",
          position: "relative",
          // Estilos internos de Swiper
          "& .swiper-button-prev, & .swiper-button-next": { color: "#fff" },
        }}
      >
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
        >
          {movies.map((m) => (
            <SwiperSlide key={m.id}>
              <Box sx={{ position: "relative" }}>
                {/* Imagen clickeable */}
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => onCardClick?.(m.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onCardClick?.(m.id)}
                  aria-label={`Ver ${m.title}`}
                  title={`Ver ${m.title}`}
                  sx={{
                    aspectRatio: "2 / 3",
                    width: "100%",
                    overflow: "hidden",
                    bgcolor: "grey.800",
                    cursor: "pointer",
                    "& img": {
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform .25s",
                    },
                    "&:hover img": { transform: "scale(1.03)" },
                  }}
                >
                  <img src={m.poster} alt={m.title} loading="lazy" />
                </Box>

                {/* Corazón favoritos */}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav?.(m);
                  }}
                  aria-label={isFav(m.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,.8)" },
                  }}
                >
                  {isFav(m.id) ? <Favorite htmlColor="#fff4b6" /> : <FavoriteBorder />}
                </IconButton>

                <Typography variant="body2" sx={{ mt: 1 }} noWrap>
                  {m.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}