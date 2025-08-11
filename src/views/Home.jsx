import React from 'react'
import HeroContainer from '../components/HeroContainer'
import ListMoviesContainer from '../components/ListMoviesContainer'

const Home = () => (
  <div style={{
      backgroundColor: "#272727",
      color: "#fff",          
      minHeight: "100vh"     
    }}
  >
    <HeroContainer />
    <ListMoviesContainer />
  </div>
);

export default Home;