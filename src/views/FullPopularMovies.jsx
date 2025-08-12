import FullMoviesContainer from "../components/FullMoviesContainer";
import { Box } from "@mui/material";   

export default function FullPopularMovies() {
  return (
    <Box sx={{ bgcolor: "#272727", minHeight: "100vh" }}>
          <FullMoviesContainer
            endpoint="/movie/popular"
            title="Películas populares"
          />
        </Box>
  );
}