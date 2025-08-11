import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import { FavoriteContext } from "../context/FavoriteContext";
import FullMoviesGrid from "./FullMoviesGrid";
import GridSkeletonMovies from "../components/GridSkeletonMovies";


export default function FullMoviesContainer({ endpoint, title, extraParams = {} }) {
  const [page, setPage] = useState(1);

  const { items: movies, status, error, meta } = useMovies({
    endpoint,
    mode: "card",
    params: { page, ...extraParams },
  });

  const navigate = useNavigate();
  const { favorite, setFavorite } = useContext(FavoriteContext);

  const onCardClick = (id) => navigate(`/movie/${id}`);
  const onPageChange = (_e, value) => setPage(value);

  const isFav = (id) => favorite.some((f) => f.id === id);
  const onToggleFav = (movie) => {
    setFavorite((prev) =>
      prev.some((f) => f.id === movie.id)
        ? prev.filter((f) => f.id !== movie.id)
        : [...prev, { id: movie.id, title: movie.title, poster: movie.poster, year: movie.year, vote: movie.vote }]
    );
  };

    if (status === "idle" || status === "loading") {
        return <GridSkeletonMovies title={title} items={10} />;
    }
    if (status === "error") return <div className="p-6 text-red-500">No se pudo cargar: {error?.message ?? "Error"}</div>;

 return (
  <FullMoviesGrid
    title={title}
    movies={movies}
    page={meta?.page ?? page}
    totalPages={meta?.total_pages ?? 1}
    onPageChange={onPageChange}
    onCardClick={onCardClick}
    isFav={isFav}
    onToggleFav={onToggleFav}
  />
);
}