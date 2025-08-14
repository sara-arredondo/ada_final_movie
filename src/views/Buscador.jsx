
import { Box, Typography } from "@mui/material";
import BuscadorContainer from "../components/BuscadorContainer";
import SearchBar from "../components/SearchBar";
import FullMoviesGrid from "../components/FullMoviesGrid";
import GridSkeletonMovies from "../components/GridSkeletonMovies.jsx";
import cineImage from "../assets/cine.svg";

export default function Buscador() {
  return (
    <BuscadorContainer>
      {({
        query, setQuery,
        status, error,
        movies, page, totalPages, setPage,
        onCardClick, isFav, onToggleFav,
      }) => {
        const hasQuery = query.trim().length >= 2;
        const title = hasQuery ? `Resultados para “${query}”` : "Buscar";

        return (

          
          <Box sx={{ px: { xs: 2, md: 3 }, py: 3, bgcolor: "#272727", minHeight: "100vh", color: "#fff" }}>
            
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <img
                src={cineImage}
                alt="Cine"
                style={{ maxWidth: "250px", height: "auto" }}
              />
            </Box>
            
            
            <SearchBar value={query} onChange={setQuery} autoFocus />

            {hasQuery && (status === "idle" || status === "loading") && (
            <GridSkeletonMovies title={title} items={10} />
            )}

        {hasQuery && status === "error" && (
          <Typography sx={{ mt: 2, color: "error.main" }}>
            No se pudo buscar: {error?.message ?? "Error"}
          </Typography>
        )}

        {hasQuery && status !== "idle" && status !== "loading" && !error && (
          movies?.length ? (
            <FullMoviesGrid
              title={title}
              movies={movies}
              page={page}
              totalPages={totalPages}
              onPageChange={(_e, value) => setPage(value)}
              onCardClick={onCardClick}
              isFav={isFav}
              onToggleFav={onToggleFav}
            />
          ) : (
            <Typography sx={{ mt: 2, opacity: 0.9 }}>
              No encontramos resultados para “{query}”.
            </Typography>
          )
        )}
          </Box>
        );
      }}
    </BuscadorContainer>
  );
}