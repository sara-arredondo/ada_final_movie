import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const img = (p, size = "w1280") => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

const mapToHero = (results) =>
  results
    .filter((m) => m.backdrop_path)
    .map((m) => ({
      id: m.id,
      src: img(m.backdrop_path, "w1280"),
      title: m.title || m.name,
      description: m.overview || "",
    }));

const mapToCard = (results) =>
  results
    .map((m) => ({
      id: m.id,
      title: m.title || m.name,
      poster: img(m.poster_path, "w342"),
      year: (m.release_date || m.first_air_date || "").slice(0, 4),
      vote: m.vote_average,
    }))
    .filter((m) => m.poster);

export default function useMovies({ endpoint, params = {}, mode = "card" }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");   // 'idle'valor inicial de estado que tú defines para indicar que todavía no se ha empezado ninguna carga.
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page: 1, total_pages: 1, total_results: 0 });

  const api_key = import.meta.env.VITE_API_KEY_MOVIES;

  useEffect(() => {
    let alive = true;

    (async () => {
      setStatus("loading");
      setError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
          params: { api_key, language: "es-ES", region: "CO", page: 1, ...params },
        });

        const res = data?.results ?? [];
        const mapped = mode === "hero" ? mapToHero(res) : mapToCard(res);

        if (!alive) return;
        setItems(mapped);
        setMeta({
          page: data?.page ?? 1,
          total_pages: Math.min(data?.total_pages ?? 1, 500),
          total_results: data?.total_results ?? 0,
        });
        setStatus("ready");
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setError(e);
        setStatus("error");
      }
    })();

    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, api_key, mode, JSON.stringify(params)]);

  return { items, status, error, meta };
}