import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const img = (p, size="w780") => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

export default function useMovieDetail(id) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const api_key = import.meta.env.VITE_API_KEY_MOVIES;

  useEffect(() => {
    if (!id) return;
    let alive = true;
    (async () => {
      setStatus("loading");
      setError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key,
            language: "es-ES",
            append_to_response: "videos,images,credits,recommendations",
            include_image_language: "es,en,null",
          },
        });

        if (!alive) return;
        const trailer = (data.videos?.results || []).find(
          v => v.site === "YouTube" && v.type === "Trailer"
        );
        const mapped = {
          id: data.id,
          title: data.title,
          overview: data.overview,
          poster: img(data.poster_path, "w500"),
          backdrop: img(data.backdrop_path, "w1280"),
          year: (data.release_date || "").slice(0, 4),
          runtime: data.runtime,
          vote: data.vote_average,
          genres: (data.genres || []).map(g => g.name),
          trailerKey: trailer?.key || null,
          cast: (data.credits?.cast || []).slice(0, 8).map(c => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profile: img(c.profile_path, "w185"),
          })),
          recommendations: (data.recommendations?.results || [])
            .map(m => ({
              id: m.id,
              title: m.title,
              poster: img(m.poster_path, "w342"),
              year: (m.release_date || "").slice(0, 4),
              vote: m.vote_average,
            }))
            .filter(m => m.poster)
            .slice(0, 10),
        };
        setData(mapped);
        setStatus("ready");
      } catch (e) {
        if (!alive) return;
        setError(e);
        setStatus("error");
      }
    })();
    return () => { alive = false; };
  }, [id, api_key]);

  return { data, status, error };
}