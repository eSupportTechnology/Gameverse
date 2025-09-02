import React from 'react'
import homeImg from '../assets/homeImg.png'
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import FeaturedGames from '../Components/FeaturedGames';
import GamingExperience from '../Components/GamingExperience';
import { EventsSection as Event } from '../Components/EventsSection';



const GradientButton = styled(Button)(({ theme }) => ({
  position: "relative",
  padding: "12px 24px",
  borderRadius: "30px",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  overflow: "hidden",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  color: "transparent",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  backgroundImage: "linear-gradient(to right, #A905BC, #33B2F7)",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "30px",
    padding: "2px",
    background: "linear-gradient(to right, #A905BC, #33B2F7)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
    pointerEvents: "none",
  },

  "&:hover": {
    background: "linear-gradient(to right, #33B2F7, #A905BC)",
    color: "#fff", // text becomes visible
    "&::before": {
      background: "linear-gradient(to right, #33B2F7, #A905BC)",
    },
  },
}));

const Home = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          minHeight: "100vh",   // use minHeight instead of height to prevent issues
          width: "100%",
          background: "linear-gradient(90deg, #01010a 0%, #1a0033 50%, #000000 100%)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          overflowX: "hidden",
          px: { xs: 4, md: 10 },
          color: "#fff",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Left Text Section */}
        <Box sx={{ flex: 1, maxWidth: "600px", }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              lineHeight: { xs: "65px", sm: "80px", md: "80px" },
              fontSize: { xs: "40px", sm: "70px", md: "70px" },
              pt: 0,
            }}
          >
            STEP IN <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(to bottom, #33B2F7, #A905BC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              GAME ON
            </Box>
            <br />
            ESCAPE REALITY
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              lineHeight: "28px",
              color: "#FFFFFF",
            }}
          >
            Sri Lanka’s No.1 ultimate neon gaming lounge experience, reserve your
            gaming station online within seconds – Skip the lines, secure your
            spot, and dive straight in to the action the moment you arrive.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              fontWeight: 500,
              backgroundImage: "linear-gradient(to right, #33B2F7, #A905BC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Opening Hours: 12 PM – 12 AM (Daily)
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={3}>
            <GradientButton>Booking Now</GradientButton>
            <GradientButton>View Games</GradientButton>
          </Stack>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            height: "100vh",
            mt: { xs: 4, md: 0 },
          }}
        >
          <img
            src={homeImg}
            alt="Gamer"
            style={{
              width: "100%",
              maxWidth: "500px", // limit max size on large screens
              height: "auto",    // keeps aspect ratio
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>
      </Box>

      <FeaturedGames />
      <GamingExperience />
      <Event />
    </>





  )
}

export default Home
