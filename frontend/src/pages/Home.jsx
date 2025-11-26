import React from "react";
import homeImg from "../assets/homeImg.png";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import FeaturedGames from "../components/FeaturedGames";
import GamingExperience from "../components/GamingExperience";
import { EventsSection as Event } from "../components/EventsSection";
import AboutGameVerse from "../components/AboutGameVerse";
import GalleryView from "../components/Gallery";
import BookingSection from "../components/BookingSection";

const SolidGradientButton = styled(Button)(({ theme }) => ({
  position: "relative",
  padding: "12px 24px",
  borderRadius: "30px",
  background: "linear-gradient(to right, #33B2F7, #A905BC)",
  border: "none",
  fontWeight: "bold",
  overflow: "hidden",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  color: "#fff",

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
    background: "transparent",
    color: "transparent",
    backgroundImage: "linear-gradient(to right, #A905BC, #33B2F7)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    "&::before": {
      background: "linear-gradient(to right, #33B2F7, #A905BC)",
    },
  },
}));

const OutlineGradientButton = styled(Button)(({ theme }) => ({
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
    color: "#fff",
    "&::before": {
      background: "linear-gradient(to right, #33B2F7, #A905BC)",
    },
  },
}));

const Home = () => {
  return (
    <>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          overflowX: "hidden",
          px: { xs: 4, md: 10 },
          position: "relative",
          color: "#fff",
          bgcolor: "#0A0D17",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          boxSizing: "border-box",
          
          //  fade effect
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "150px",
            background: "linear-gradient(to top, rgba(10,13,23,1), rgba(10,13,23,0.7), rgba(10,13,23,0))",
            pointerEvents: "none",
            zIndex: 3,
            // filter: "blur(10px)",
          },


        }}
      >
        {/* Left Text */}
        <Box sx={{ flex: 1, maxWidth: "600px", zIndex: 3 }}>
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
            Sri Lanka’s No.1 ultimate neon gaming lounge experience, reserve
            your gaming station online within seconds – Skip the lines, secure
            your spot, and dive straight in to the action the moment you arrive.
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
          <Stack 
            direction="row" 
            spacing={2} 
            mt={3}
            sx={{
              "& .booking-btn": {
                background: "linear-gradient(to right, #33B2F7, #A905BC)",
                color: "#fff",
              },
              "&:hover .booking-btn": {
                background: "transparent",
                color: "transparent",
                backgroundImage: "linear-gradient(to right, #A905BC, #33B2F7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              },
            }}
          >
            <SolidGradientButton className="booking-btn">Booking Now</SolidGradientButton>
            <OutlineGradientButton>View Events</OutlineGradientButton>
          </Stack>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "visible",
            position: "relative",
            minHeight: "80vh",
            mb: 1
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "60%", md: "80%" },
              height: { xs: "60%", md: "60%" },
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #CF36E1 0%, #33B2F7 60%, transparent 80%)",

              zIndex: 1,
              filter: "blur(150px)",
            }}
          />
          <img
            src={homeImg}
            alt="Gamer"
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: '762px',
              // height: "auto",
              objectFit: "contain",
              position: "relative",
              zIndex: 2,
            }}
          />
        </Box>

      </Box>

      {/* Next Sections */}
      <AboutGameVerse />
      <FeaturedGames />
      <GamingExperience />
      <Event />
      <GalleryView />
      <BookingSection />


    </>
  );
};

export default Home;
