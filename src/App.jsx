import FavoriteContextProvider from "./context/FavoriteContext.jsx"
import Router from "./router/Router.jsx"


function App() {


  return (
    <FavoriteContextProvider>
      <Router />
    </FavoriteContextProvider>
    
  )
}

export default App
