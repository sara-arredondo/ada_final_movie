import { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext({
  favorite: [],
  // placeholder para evitar errores si alguien lo usa fuera del provider
  setFavorite: () => {},
});

export default function FavoriteContextProvider({ children }) {
  // 1) Estado primero
  const [favorite, setFavorite] = useState(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("favorites") : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 2) Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorite));
    } catch {
      // ignore: modo privado / sin espacio
    }
  }, [favorite]);


  return (
    <FavoriteContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}