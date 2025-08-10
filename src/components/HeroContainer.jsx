import React from 'react'
import { useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const HeroContainer = () => {

  useEffect(() => {
    const apikey = import.meta.env.VITE_API_KEY_MOVIES 
 
    async function obtenerNowPlaying() {
      try {
        const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, {
          params: {
            api_key: apikey,
            language: "es-ES",
            region: "CO",
            page: 1,
          },
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    obtenerNowPlaying();
  }, []);

  return <div>HeroContainer</div>;
}


export default HeroContainer;