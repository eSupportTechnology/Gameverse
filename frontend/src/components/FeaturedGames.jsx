import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  GlobalStyles,
} from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";

const games = [
  { title: "PlayStation 5 Gaming", desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups", img: "./images/f1.jpg" },
  { title: "PS5 + VR Gaming", desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups", img: "./images/f2.jpg" },
  { title: "Car Simulator Gaming", desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups", img: "./images/f3.jpg" },
  { title: "Car Simulator + VR Gaming", desc: "Classic billiards tables in a modern neon-lit vibe environment for competitive gameplay", img: "./images/f4.jpg" },
  { title: "8 Ball Pool Gaming", desc: "Retro and modern arcade games with coin-operated machines for nostalgic gaming fun", img: "./images/f5.jpg" },
];

export default function FeaturedGames() {
  const [viewportRef, embla] = useEmblaCarousel({ containScroll: "trimSnaps", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <>
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
          width: "100%",
          bgcolor: "#0b0c10",
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4 },
          color: "white",
          position: "relative",
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
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "36px", sm: "48px", md: "84px" },
              fontFamily: "BRUSHSTRIKE",
              fontWeight: "400",
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
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
          sx={{ overflow: "hidden", maxWidth: "1200px", mx: "auto" }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            {games.map((game, idx) => (
              <Box key={idx} sx={{ flex: "0 0 32%", position: "relative" }}>
                <Card
                  sx={{
                    bgcolor: "#000",
                    overflow: "hidden",
                    borderRadius: 2,
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={game.img}
                    alt={game.title}
                    sx={{
                      objectFit: "cover",
                      clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)", // angled bottom cut
                    }}
                  />
                  <CardContent sx={{ p: 2, textAlign: "left" }}>
                    <Typography
                      variant="h6"
                      color="#FFFFFF"
                      sx={{ mb: 1, fontSize: { xs: "16px", md: "18px" } }}
                    >
                      {game.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#FFFFFF"
                      sx={{ fontSize: { xs: "13px", md: "14px" } }}
                    >
                      {game.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dots */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
          {scrollSnaps.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => embla.scrollTo(idx)}
              sx={{
                width: selectedIndex === idx ? 12 : 8,
                height: selectedIndex === idx ? 12 : 8,
                borderRadius: "50%",
                bgcolor: selectedIndex === idx ? "#D100FF" : "#555",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        {/* Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Button
            sx={{
              px: { xs: 3, md: 5 },
              py: 1.5,
              borderRadius: "50px",
              mb: 4,
              fontWeight: "medium",
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
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "2px",
                borderRadius: "50px",
                background: "linear-gradient(to right, #3b82f6, #ed31feff)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0,
                transition: "opacity 0.3s ease",
                zIndex: -1,
              },
              "&:hover": {
                background: "transparent",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, #dd3aefff)",
                "&::before": {
                  opacity: 1,
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
