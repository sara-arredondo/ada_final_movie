import { createContext } from "react";

export const FavoriteContext = createContext()

export default function FavoriteContextProvider ({children}) {

    const [favorite, setFavorite] = useState([])
 
    const data = {

    }

    return <FavoriteContext.Provider value={data}>{children}</FavoriteContext.Provider>
}