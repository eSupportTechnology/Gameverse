import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

const games = [
  {
    title: "PS5 Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f1.jpg",
  },
  {
    title: "PS5 + VR Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f2.jpg",
  },
  {
    title: "Car Simulator Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f3.jpg",
  },
  {
    title: "Car Simulator + VR Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f4.jpg",
  },
  {
    title: "8 Ball Pool Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f5.jpg",
  },
];

export default function FeaturedGames() {
  const [viewportRef, embla] = useEmblaCarousel({
    containScroll: "trimSnaps",
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:900px)");

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  // 3 dots on desktop, 5 dots on mobile
  const dotsToShow = isDesktop ? 3 : games.length;

  return (
    <>
      {/* Custom font */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
          },
        }}
      />

      <Box
        component="section"
        sx={{
          background: "linear-gradient(90deg, #01010a 0%, #1a0033 50%, #000000 100%)",
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4 },
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "32px", sm: "44px", md: "72px" },
              fontFamily: "BRUSHSTRIKE",
              fontWeight: 400,
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 1.5, md: 2 },
              lineHeight: 1.1,
            }}
          >
            Featured Games
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray.400",
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "14px", md: "16px" },
              px: { xs: 1, sm: 0 },
            }}
          >
            Dive into our hottest picks! From immersive VR worlds and thrilling
            racing simulators to classic arcade battles and next-gen PS5 action
            — these are the games that define the ultimate gaming experience.
          </Typography>
        </Box>

        {/* Carousel */}
        <Box
          ref={viewportRef}
          sx={{
            overflow: "hidden",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              px: { xs: 1, sm: 0 },
            }}
          >
            {games.map((game, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 240, sm: 320, md: 360 },
                  height: { xs: 320, sm: 380, md: 420 },
                  position: "relative",
                  clipPath: [
                    "polygon(10% 0, 100% 0, 80% 100%, 0 90%)", // shape 1
                    "polygon(15% 0, 98% 0, 100% 100%, 0 100%)", // shape 2
                    "polygon(2% 0, 98% 0, 90% 100%, 0 100%)", // shape 3
                    "polygon(20% 0, 95% 0, 98% 100%, 0% 100%)", // shape 4
                    "polygon(0% 0, 100% 0, 80% 100%, 0 100%)", // shape 5
                  ][idx % 5], 
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  src={game.img}
                  alt={game.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Text Overlay with Gradient Border */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 2,
                    right: 0,
                    height: "28%", // take bottom portion
                    clipPath: [
                      "polygon(0% 0, 100% 0, 80% 100%, 0 90%)", // shape 1
                      "polygon(3% 0, 100% 0, 100% 100%, 0 100%)", // shape 2
                      "polygon(0% 0, 99% 0, 95% 100%, 0 100%)", // shape 3
                      "polygon(3% 0, 98% 0, 100% 100%, 0% 100%)", // shape 4
                      "polygon(0% 0, 100% 0, 80% 100%, 0 100%)", // shape 5
                    ][idx % 5],
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      padding: "2px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      bgcolor: "rgba(0,0,0)",
                      p: { xs: 1.5, sm: 2,md: 2  },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 0.5,
                        fontSize: { xs: "10px", sm: "14px", md: "15px" },
                        fontWeight: 600,
                      }}
                    >
                      {game.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "10px", sm: "8px", md: "12px" },
                        color: "gray.300",
                      }}
                    >
                      {game.desc}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 1.5,
          }}
        >
          {Array.from({ length: dotsToShow }).map((_, idx) => (
            <Box
              key={idx}
              onClick={() => embla && embla.scrollTo(idx)}
              sx={{
                width: selectedIndex === idx ? 12 : 8,
                height: selectedIndex === idx ? 12 : 8,
                borderRadius: "50%",
                bgcolor: selectedIndex === idx ? "#D100FF" : "#555",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </Box>

        {/* Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 6 },
          }}
        >
          <Button
            sx={{
              px: { xs: 3, md: 5 },
              py: { xs: 1, md: 1.5 },
              borderRadius: "50px",
              mb: 4,
              fontWeight: 500,
              fontSize: { xs: "14px", md: "16px" },
              color: "#fff",
              background: "linear-gradient(to right, #3b82f6, #ed31feff)",
              position: "relative",
              overflow: "hidden",
              border: "none",
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "30px",
                padding: "2px",
                background: "linear-gradient(to right, #A905BC, #33B2F7)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
              "&:hover": {
                background: "transparent",
                backgroundImage: "linear-gradient(to right, #A905BC, #33B2F7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                "&::before": {
                  background: "linear-gradient(to right, #33B2F7, #A905BC)",
                },
              },
            }}
          >
            View All Games & Pricing
          </Button>
        </Box>
      </Box>
    </>
  );
}
