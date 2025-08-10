import FavoriteContextProvider from "./context/FavoriteContext.jsx"
import Router from "./router/Router.jsx"
import "react-responsive-carousel/lib/styles/carousel.min.css";


function App() {


  return (
    <FavoriteContextProvider>
      <Router />
    </FavoriteContextProvider>
    
  )
}

export default App
