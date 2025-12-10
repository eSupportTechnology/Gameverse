import React from 'react';
import { Box } from '@mui/material';
import GamesHero from '../components/GamesHero';
import PopularGames from '../components/PopularGames';
import OtherGames from '../components/OtherGames';
import EventsTournaments from '../components/EventsTournaments';

const Games = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0A0D17',
        overflow: 'hidden',
      }}
    >
      <GamesHero />
      <PopularGames />
      <OtherGames />
      <EventsTournaments />
    </Box>
  );
};

export default Games;
