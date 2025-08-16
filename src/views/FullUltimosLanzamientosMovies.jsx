import { Box } from "@mui/material";

import FullMoviesContainer from "../components/FullMoviesContainer";

export default function FullUltimosLanzamientosMovies() {
  return (
    <Box 
      sx={{
        bgcolor: "#272727",
        minHeight: "100vh" }}>
      <FullMoviesContainer
        endpoint="/movie/now_playing"
        title="Últimos lanzamientos"
      />
    </Box>
  );
}