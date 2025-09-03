import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const games = [
  {
    title: "PlayStation 5 Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f1.jpg",
  },
  {
    title: "VR Experiences",
    desc: "Step into virtual worlds with our cutting-edge VR headsets and immersive experiences",
    img: "./images/f2.jpg",
  },
  {
    title: "PlayStation 5 Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f3.jpg",
  },

  {
    title: "Billiards & Pool",
    desc: "Classic billiards tables in a modern neon-lit vibe environment for competitive gameplay",
    img: "./images/f4.jpg",
  },
  {
    title: "Arcade Machines",
    desc: "Retro and modern arcade games with coin-operated machines for nostalgic gaming fun",
    img: "./images/f5.jpg",
  },
  {
    title: "PlayStation 5 Gaming",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    img: "./images/f6.jpg",
  },
];

export default function FeaturedGames() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#0b0c10",
        py: 8,
        px: 2,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Central glow effect */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(51, 178, 247, 0.73), rgba(84, 14, 92, 0.6), transparent 80%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          textAlign: "center",
          mb: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          fontSize="70px"
          component="h2"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #ec4899, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Featured Games
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "gray.400", maxWidth: 700, mx: "auto" }}
        >
          Dive into our hottest picks! From immersive VR worlds and thrilling
          racing simulators to classic arcade battles and next-gen PS5 action —
          these are the games that define the ultimate gaming experience
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 4,
          mb: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        {games.map((game, idx) => (
          <Card
            key={idx}
            sx={{
              bgcolor: "#251C29",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 25px rgba(103, 58, 183, 0.5)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={game.img}
              alt={game.title}
            />
            <CardContent>
              <Typography variant="h6" color="#FFFFFF" sx={{ mb: 1 }}>
                {game.title}
              </Typography>
              <Typography variant="body2" color="#FFFFFF">
                {game.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

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
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "50px",
            mb: 4,
            fontWeight: "medium",
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            "&:hover": {
              background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
            },
          }}
        >
          View All Games & Pricing
        </Button>
      </Box>
    </Box>
  );
}
