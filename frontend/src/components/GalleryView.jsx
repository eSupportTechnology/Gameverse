import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const GalleryView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define the specific gradients from the UI image
  const headerGradient = 'linear-gradient(to right, #A033FF, #D100FF, #00C3FF)';
  const imageBorderGradient = 'linear-gradient(to right, #9F00FF, #B86BFF, #00D3FE, #3C7CFA)';

  // Array of all 8 image paths for the single row
  const galleryImages = [
    '/assets/gallery-image1.jpg', 
    '/assets/gallery-image2.jpg',
    '/assets/gallery-image3.jpg',
    '/assets/gallery-image4.jpg',
    '/assets/gallery-image5.jpg',
    '/assets/gallery-image6.jpg',
    '/assets/gallery-image7.jpg',
    '/assets/gallery-image8.jpg',
  ];

  // Function to apply gradient to text
  const applyGradientText = (gradient) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  });

  const imageCardStyle = {
    flexShrink: 0, // Prevents images from shrinking
    width: isMobile ? '280px' : '300px',
    height: isMobile ? '180px' : '200px',
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    marginRight: isMobile ? '16px' : '24px',
    '&:last-child': {
      marginRight: 0,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Gradient border
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      padding: '2px',
      background: imageBorderGradient,
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    // Inner glow effect
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '2px',
      borderRadius: 'inherit',
      boxShadow: `inset 0 0 10px 2px rgba(160, 51, 255, 0.4)`,
      pointerEvents: 'none',
    },

    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 8px 30px rgba(160, 51, 255, 0.6)',
      '&::after': {
        boxShadow: `inset 0 0 15px 3px rgba(160, 51, 255, 0.6)`,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        color: '#fff',
        padding: isMobile ? '40px 20px' : '80px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Box sx={{ maxWidth: 900, textAlign: 'center', mb: isMobile ? 6 : 10 }}>
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          sx={{
            ...applyGradientText(headerGradient),
            fontWeight: 800,
            mb: 2,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: isMobile ? '2.5rem' : '3.8rem',
            letterSpacing: '0.05em',
          }}
        >
          Gallery View
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#FFFFFF',
            mb: isMobile ? 5 : 8,
            fontFamily: 'Roboto, sans-serif',
            lineHeight: 1.6,
            fontSize: isMobile ? '1rem' : '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            fontWeight: 400,
          }}
        >
          Get ready to battle it out! Join our exciting events and competitive tournaments featuring top games, epic challenges, and
          massive rewards. Whether you're a casual player or a pro, there's always a stage for you to shine.
        </Typography>
      </Box>

      {/* Single, horizontal scrolling row */}
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto', 
          whiteSpace: 'nowrap', 
          pb: 2, 
          '&::-webkit-scrollbar': { display: 'none' }, 
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none', 
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {galleryImages.map((imageSrc, index) => (
          <Box key={index} sx={imageCardStyle}>
            <img
              src={imageSrc}
              alt={`Gaming setup ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 'inherit',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GalleryView;