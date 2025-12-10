import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GamesHero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '80vh', md: '100vh' },
        bgcolor: '#0A0D17',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(51, 178, 247, 0.3), rgba(169, 5, 188, 0.25), transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(150px)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '200px',
          background: 'linear-gradient(to top, rgba(10,13,23,1) 0%, rgba(10,13,23,0.8) 40%, rgba(10,13,23,0) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1440px',
          mx: 'auto',
          px: { xs: 3, sm: 4, md: 6, lg: 8 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Content */}
        <Box sx={{ 
            flex: 1, 
            maxWidth: { xs: '100%', md: '650px' },
            zIndex: 2, 
        }}>
          <Typography
            sx={{
              fontSize: { xs: '40px', sm: '56px', md: '72px' },
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            Experience
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '40px', sm: '56px', md: '72px' },
              fontWeight: 700,
              background: 'linear-gradient(90deg, #A033FF 0%, #D100FF 50%, #00C3FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            Gaming
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '40px', sm: '56px', md: '72px' },
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              mb: 4,
            }}
          >
            Beyond the Basic Details
          </Typography>

          <Typography
            sx={{
              color: 'rgba(184, 193, 236, 0.9)',
              fontSize: { xs: '16px', md: '18px' },
              lineHeight: 1.8,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            Elevate your play at Sri Lanka's neon gaming hotspot – reserve your
            station online, skip the wait, and step into a glowing world of adrenaline,
            cutting-edge setups, and nonstop competitive energy.
          </Typography>

          <Typography
            sx={{
              color: '#33B2F7',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 600,
              mb: 5,
            }}
          >
            Opening Hours: 12 PM – 12 AM (Daily)
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Button
              onClick={() => navigate('/booking')}
              sx={{
                px: 5,
                py: 1.8,
                background: 'linear-gradient(92deg, #33B2F7 0%, #A905BC 100%)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '16px',
                textTransform: 'none',
                boxShadow: '0 0 20px rgba(169, 5, 188, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(169, 5, 188, 0.6)',
                },
              }}
            >
              Booking Now
            </Button>
            <Button
              onClick={() => {
                const eventsSection = document.getElementById('events-section');
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              sx={{
                px: 5,
                py: 1.8,
                background: 'transparent',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '16px',
                textTransform: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: '#33B2F7',
                    background: 'rgba(51, 178, 247, 0.1)',
                },
              }}
            >
              View Events
            </Button>
          </Box>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1.1, // Increased flex slightly to allow more room
            display: 'flex',
            justifyContent: 'center', // Centered
            alignItems: 'center',
            position: 'relative',
            mt: { xs: 6, md: 0 },
          }}
        >
          <Box
            component="img"
            src="/assets/Picture1.png"
            alt="Gaming Characters"
            sx={{
              width: '100%',
              // INCREASED SIZES: Large enough to be dominant, but not overflowing
              maxWidth: { xs: '400px', md: '650px', lg: '800px' }, 
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 60px rgba(51, 178, 247, 0.15))',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GamesHero;