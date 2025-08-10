import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./Hero";

const BASE_URL = "https://api.themoviedb.org/3";
const img = (p, size = "w1280") => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);

export default function HeroContainer() {
  const [slides, setSlides] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const api_key = import.meta.env.VITE_API_KEY_MOVIES;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, {
          params: { api_key, language: "es-ES", region: "CO", page: 1 },
        });
        const mapped = (data?.results ?? [])
          .filter((m) => m.backdrop_path) // mejor 16:9
          .map((m) => ({
            id: m.id,
            src: img(m.backdrop_path, "w1280"),
            title: m.title,
            description: m.overview,
          }))
          .slice(0, 8);
        setSlides(mapped);
        setStatus("ready");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    })();
  }, []);

  if (status === "loading") return <div className="p-6">Cargando…</div>;
  if (status === "error") return <div className="p-6 text-red-500">No se pudo cargar.</div>;

  return <Hero slides={slides} />;
}