import React from 'react';
import { Box } from '@mui/material';
import HeroContainer from '../components/HeroContainer';
import ListMoviesContainer from '../components/ListMoviesContainer';

const Home = () => (
  <Box
    sx={{
      backgroundColor: '#272727', // fondo negro
      color: '#fff',           // texto blanco
      minHeight: '100vh',      // ocupa toda la altura de la pantalla
    }}
  >
    <HeroContainer />
    <ListMoviesContainer />
  </Box>
);

export default Home;