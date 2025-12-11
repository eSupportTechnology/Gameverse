import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import GamesHero from '../components/GamesHero';
import PopularGames from '../components/PopularGames';
import OtherGames from '../components/OtherGames';
import EventsTournaments from '../components/EventsTournaments';
import { useLocation } from 'react-router-dom';

const Games = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

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
