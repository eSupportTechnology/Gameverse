import React, { useEffect, useState } from "react";
import { Box, Typography, Button, GlobalStyles } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PopularGames = () => {
  const navigate = useNavigate();

  const popularGames = [
    {
      id: 1,
      title: "PS5 Stations",
      descLines: [
        "Latest PS5 games with 4K graphics",
        "and immersive gameplay",
        "on premium gaming setups",
      ],
      image: "/Images/f1.jpg",
    },
    {
      id: 2,
      title: "Pool Tables",
      descLines: [
        "Latest PS5 games with 4K graphics",
        "and immersive gameplay",
        "on premium gaming setups",
      ],
      image: "/Images/f5.jpg",
    },
    {
      id: 3,
      title: "Racing Simulators",
      descLines: [
        "Latest PS5 games with 4K graphics",
        "and immersive gameplay",
        "on premium gaming setups",
      ],
      image: "/Images/f3.jpg",
    },
  ];

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
        id="popular-games"
        sx={{
          position: "relative",
          bgcolor: "#0A0D17",
          py: { xs: 6, md: 6 },
          px: { xs: 2, sm: 4 },
          color: "white",
          overflow: "hidden",
          mt: "-24px",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "140px",
            background:
              "linear-gradient(to bottom, rgba(10,13,23,0) 0%, rgba(10,13,23,0.7) 55%, #0A0D17 100%)",
            pointerEvents: "none",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "32px", sm: "44px", md: "75px" },
                fontFamily: "BRUSHSTRIKE",
                fontWeight: 400,
                background:
                  "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: { xs: 1.5, md: 2 },
                lineHeight: 1.3,
              }}
            >
              POPULAR GAMES
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "gray.400",
                maxWidth: 950,
                mx: "auto",
                fontSize: { xs: "14px", md: "16px" },
                px: { xs: 1, sm: 0 },
              }}
            >
              Dive into our hottest picks! From immersive VR worlds and
              thrilling racing simulators to classic arcade battles and next-gen
              PS5 action — these are the games that define the ultimate gaming
              experience
            </Typography>
          </Box>

          {/* Games Grid */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2, sm: 4 },
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            {popularGames.map((game, idx) => (
              <Box
                key={game.id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "100%", sm: "320px", md: "360px" },
                  height: { xs: "380px", sm: "400px", md: "440px" },
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                  "&:hover .game-title": {
                    color: "#33B2F7 !important",
                  },
                  "&:hover .bottom-glow": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    clipPath: [
                      "polygon(10% 0, 100% 0, 80% 100%, 0 90%)",
                      "polygon(15% 0, 98% 0, 100% 100%, 0 100%)",
                      "polygon(2% 0, 98% 0, 90% 100%, 0 100%)",
                    ][idx % 3],
                    overflow: "hidden",
                    border: "2px solid rgba(51, 178, 247, 0.5)",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                >
                  {/* Bottom white line on hover */}
                  <Box
                    className="bottom-glow"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#FFFFFF",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 10,
                    }}
                  />

                  {/* Image */}
                  <Box
                    component="img"
                    src={game.image}
                    alt={game.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* Booking Button */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "32%",
                      left: 0,
                      right: 0,
                      zIndex: 10,
                    }}
                  >
                    <Button
                      onClick={() =>
                        navigate("/booking", {
                          state: {
                            from: "/games",
                            stationType: game.title,
                          },
                        })
                      }
                       sx={{
                        width: '100%',
                        py: { xs: 1.2, md: 1.5 },
                        borderRadius: 0,
                        fontWeight: 'bold',
                        fontSize: { xs: '14px', md: '16px' },
                        textTransform: 'none',
                        color: '#fff',
                        background: 'linear-gradient(to right, #A905BC, #33B2F7)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(to right, #33B2F7, #A905BC)',
                        },
                      }}
                    >
                      Booking Now
                    </Button>
                  </Box>

                  {/* Text Content - Bottom */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "32%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        bgcolor: "rgba(0,0,0)",
                        p: { xs: 1.2, sm: 1.45, md: 1.7 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        className="game-title"
                        variant="h6"
                        sx={{
                          mb: 0.3,
                          fontSize: { xs: "16px", sm: "18px", md: "20px" },
                          fontWeight: 700,
                          transition: "color 0.3s ease",
                          color: "white",
                        }}
                      >
                        {game.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "12px", sm: "13px", md: "14px" },
                          color: "rgba(255,255,255,0.92)",
                          lineHeight: 1.35,
                        }}
                      >
                        {game.descLines.map((line, lineIdx) => (
                          <React.Fragment key={lineIdx}>
                            {line}
                            {lineIdx !== game.descLines.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PopularGames;
