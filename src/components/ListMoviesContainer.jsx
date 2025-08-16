// ListMoviesContainer.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import useMovies from "../hooks/useMovies";

import ListPopularMovies from "./ListPopularMovies";
import ListMejorPuntuadas from "./ListMejorPuntuadas";
import GridSkeletonMovies from "../components/GridSkeletonMovies.jsx";


export default function ListMoviesContainer() {
  const { items: popular, status: statusPopular } = useMovies({
    endpoint: "/movie/popular",
    mode: "card",
  });

  const { items: topRated, status: statusTop } = useMovies({
    endpoint: "/movie/top_rated",
    mode: "card",
  });

  const { favorite, setFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const onCardClick = (id) => navigate(`/movie/${id}`);
  const isFav = (id) => favorite.some((f) => f.id === id);
  const onToggleFav = (movie) => {
    setFavorite((prev) =>
      prev.some((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isLoading =
    statusPopular === "idle" || statusPopular === "loading" ||
    statusTop === "idle" || statusTop === "loading";

  if (isLoading && !popular.length && !topRated.length) {
    return <GridSkeletonMovies  items={10} />;
  }

  return (
    <>
      {popular.length > 0 ? (
        <ListPopularMovies
          movies={popular}
          isFav={isFav}
          onToggleFav={onToggleFav}
          onCardClick={onCardClick}
        />
      ) : (
        <div className="px-4 text-red-400">No se pudieron cargar “Populares”.</div>
      )}

      {topRated.length > 0 ? (
        <ListMejorPuntuadas
          movies={topRated}
          isFav={isFav}
          onToggleFav={onToggleFav}
          onCardClick={onCardClick}
        />
      ) : (
        <div className="px-4 text-red-400">No se pudieron cargar “Mejor puntuadas”.</div>
      )}
    </>
  );
}