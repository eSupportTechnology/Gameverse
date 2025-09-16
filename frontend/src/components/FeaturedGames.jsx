import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  GlobalStyles,
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
    <>
      {/* Global font registration */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
            fontWeight: "normal",
            fontStyle: "normal",
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "400px", sm: "600px", md: "900px" },
            height: { xs: "400px", sm: "600px", md: "900px" },
            background:
              "radial-gradient(circle, rgba(51, 178, 247, 0.88), rgba(238, 78, 217, 0.33), transparent 70%)",
            filter: "blur(120px)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            position: "relative",
            zIndex: 1,
            px: 2,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "36px", sm: "48px", md: "70px" },
              fontFamily: "BRUSHSTRIKE",
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

        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 2 },
            mb: 6,
            position: "relative",
            zIndex: 1,
            justifyItems: "center",
          }}
        >
          {games.map((game, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                borderRadius: "24px",
                width: "100%",
                maxWidth: "350px",
                overflow: "visible", // Make sure the border is visible outside card
                cursor: "pointer",
                "&:hover .gradient-border": {
                  opacity: 1,
                  transform: "scale(1.05)",
                },
                "&:hover .card-content": {
                  transform: "translateY(0px)scale(1.03)",
                },
              }}
            >
              <Box
                className="gradient-border"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "24px",
                  padding: "2px",
                  background:
                    "linear-gradient(135deg, #3b82f6, #ec4899, #8b5cf6)",
                  opacity: 0,
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  zIndex: 2,
                }}
              />

              <Card
                className="card-content"
                sx={{
                  bgcolor: "#000000",
                  overflow: "hidden",
                  border: 2,
                  borderColor: "linear-gradient(to right, #CF36E1, #15A2EF)",
                  position: "relative",
                  zIndex: 3,
                  transition: "all 0.3s ease",
                  transform: "skewY(-3deg)",
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={game.img}
                  alt={game.title}
                  sx={{
                    transform: "skewY(3deg) scale(1.1)", // reverse skew for image so it looks straight
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    transform: "skewY(3deg)", // text should look normal
                    p: 2,
                  }}
                >
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

              // Pseudo-element for rounded gradient border
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "2px", // Border thickness
                borderRadius: "50px", // Matches button
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
                background: "transparent", // Make background transparent
                color: "transparent", // Text shows gradient
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(to right, #3b82f6, #dd3aefff)",
                "&::before": {
                  opacity: 1, // Show gradient border
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
