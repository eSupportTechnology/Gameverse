import React from 'react';
import { Box, Typography } from '@mui/material';

const OtherGames = () => {
  const otherGames = [
    {
      id: 1,
      title: "Arcade Machine",
      description: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
      image: "/Images/pic1.png",
    },
    {
      id: 2,
      title: "Archery Gaming",
      description: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
      image: "/Images/pic2.png",
    },
    {
      id: 3,
      title: "Carrom Gaming",
      description: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
      image: "/Images/pic3.png",
    }
  ];

  const cardVariants = [
    "polygon(15% 0, 98% 0, 100% 100%, 0 100%)",
    "polygon(10% 0, 100% 0, 80% 100%, 0 90%)",
    "polygon(2% 0, 98% 0, 90% 100%, 0 100%)",
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: '#0A0D17',
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4 },
        color: 'white',
        overflow: 'hidden',
        // Background glow effect
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
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '1400px', mx: 'auto' }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '36px', sm: '50px', md: '75px' },
              fontFamily: 'BRUSHSTRIKE, sans-serif',
              fontWeight: 400,
              background: 'linear-gradient(to right, #A033FF, #D100FF, #00C3FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2,
            }}
          >
            OTHER GAMES
          </Typography>
          <Typography
            sx={{
              color: 'rgba(184, 193, 236, 0.9)',
              fontSize: { xs: '14px', md: '16px' },
              maxWidth: '1100px',
              mx: 'auto',
              lineHeight: 1.8,
              px: { xs: 2, sm: 0 },
            }}
          >
            Dive into our hottest picks! From immersive VR worlds and thrilling racing simulators to classic arcade battles and next-gen PS5 action — these are the games that define the ultimate gaming experience
          </Typography>
        </Box>

        {/* Games Grid */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 4 },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {otherGames.map((game, idx) => {
            const clipPath = cardVariants[idx % cardVariants.length];
            
            return (
              <Box
                key={game.id}
                sx={{
                  flex: '0 0 auto',
                  width: { xs: '100%', sm: '320px', md: '360px' },
                  height: { xs: '380px', sm: '400px', md: '440px' },
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                  '&:hover .game-title': { 
                    color: '#33B2F7 !important' 
                  },
                  '&:hover .bottom-glow': {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    clipPath,
                    overflow: 'hidden',
                    border: '2px solid rgba(51, 178, 247, 0.5)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {/* Bottom white line on hover */}
                  <Box
                    className="bottom-glow"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#FFFFFF',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 10,
                    }}
                  />
                  
                  {/* Image */}
                  <Box
                    component="img"
                    src={game.image}
                    alt={game.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Text Content - Bottom */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 2,
                      right: 0,
                      height: '28%',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        bgcolor: 'rgba(0,0,0)',
                        p: { xs: 1.5, sm: 2, md: 2 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography
                        className="game-title"
                        variant="h6"
                        sx={{
                          mb: 0.5,
                          fontSize: { xs: '14px', sm: '15px', md: '16px' },
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                          color: 'white',
                        }}
                      >
                        {game.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '11px', sm: '12px', md: '13px' },
                          color: '#B8C1EC',
                          opacity: 0.8,
                        }}
                      >
                        {game.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherGames;