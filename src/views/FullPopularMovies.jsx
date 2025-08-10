import FullMoviesContainer from "../components/FullMoviesContainer";

export default function FullPopularMovies() {
  return (
    <FullMoviesContainer endpoint="/movie/popular" title="Películas populares" />
  );
}