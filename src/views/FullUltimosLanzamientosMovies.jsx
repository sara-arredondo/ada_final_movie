import FullMoviesContainer from "../components/FullMoviesContainer";

export default function FullUltimosLanzamientosMovies() {
  return (
    <FullMoviesContainer endpoint="/movie/now_playing" title="Ultimos lanzamientos" />
  );
}