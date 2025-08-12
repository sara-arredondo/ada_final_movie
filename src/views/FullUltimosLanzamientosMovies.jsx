import { Box } from "@mui/material";
import FullMoviesContainer from "../components/FullMoviesContainer";

export default function FullUltimosLanzamientosMovies() {
  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
      <FullMoviesContainer
        endpoint="/movie/now_playing"
        title="Últimos lanzamientos"
      />
    </Box>
  );
}