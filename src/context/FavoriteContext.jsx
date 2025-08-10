
import { createContext, useState } from "react";

export const FavoriteContext = createContext()

export default function FavoriteContextProvider ({children}) {

    const [favorite, setFavorite] = useState([])
 
    const data = {
        favorite,
        setFavorite,
    };

    return <FavoriteContext.Provider value={data}>{children}</FavoriteContext.Provider>
}