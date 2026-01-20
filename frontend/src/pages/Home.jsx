import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import homeImg from "../assets/homeImg.png";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import FeaturedGames from "../components/FeaturedGames";
import GamingExperience from "../components/GamingExperience";
import EventsSection from "../components/EventsSection";
import AboutGameVerse from "../components/AboutGameVerse";
import GalleryView from "../components/Gallery";
import BookingSection from "../components/BookingSection";
import { useTheme, useMediaQuery } from "@mui/material";

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
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // mobile = sm and below

  useEffect(() => {
    if (location?.state?.scrollToFeatured) {
      const el = document.getElementById("featured-games");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          minHeight: { xs: "auto", md: "100vh" },
          py: { xs: 6, md: 0 },
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          overflowX: "hidden",
          px: { xs: 4, md: 10 },
          position: "relative",
          color: "#fff",
          bgcolor: "#0A0D17",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          boxSizing: "border-box",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "150px",
            background:
              "linear-gradient(to top, rgba(10,13,23,1), rgba(10,13,23,0.7), rgba(10,13,23,0))",
            pointerEvents: "none",
            zIndex: 3,
          },
        }}
      >
        {/* For mobile: wrap image and text in one relative box to overlay text */}
        {isMobile ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {/* Image */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  height: "90%",
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
                  height: "auto",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                  borderRadius: "16px",
                }}
              />
            </Box>

            {/* Overlay Text */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "#fff",
                zIndex: 10,
                background: "rgba(10, 13, 23, 0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  lineHeight: 1.2,
                  mb: 2,
                  background: "linear-gradient(to bottom, #33B2F7, #A905BC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                STEP IN <br />
                GAME ON <br />
                ESCAPE REALITY
              </Typography>

              <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                Sri Lanka’s No.1 ultimate neon gaming lounge experience, reserve
                your gaming station online within seconds – Skip the lines,
                secure your spot, and dive straight in to the action the moment
                you arrive.
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
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
                  justifyContent: "center",
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
                <SolidGradientButton
                  className="booking-btn"
                  onClick={() =>
                    document
                      .getElementById("featured-games")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Booking Now
                </SolidGradientButton>
                <OutlineGradientButton
                  onClick={() =>
                    document
                      .getElementById("events-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Events
                </OutlineGradientButton>
              </Stack>
            </Box>
          </Box>
        ) : (
          // Desktop layout: side by side text and image
          <>
            <Box
              sx={{
                flex: 1,
                maxWidth: "600px",
                zIndex: 3,
                order: 1,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  lineHeight: "80px",
                  fontSize: "70px",
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
                  fontSize: "1.09rem",
                  lineHeight: "28px",
                  color: "#FFFFFF",
                }}
              >
                Sri Lanka’s No.1 ultimate neon gaming lounge experience, reserve
                your gaming station online within seconds – Skip the lines,
                secure your spot, and dive straight in to the action the moment
                you arrive.
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
                <SolidGradientButton
                  className="booking-btn"
                  onClick={() =>
                    document
                      .getElementById("featured-games")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Booking Now
                </SolidGradientButton>
                <OutlineGradientButton
                  onClick={() =>
                    document
                      .getElementById("events-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Events
                </OutlineGradientButton>
              </Stack>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                minHeight: "80vh",
                mt: 0,
                order: 2,
                maxWidth: "500px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "60%",
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
                  maxHeight: "762px",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                  borderRadius: "16px",
                }}
              />
            </Box>
          </>
        )}
      </Box>

      {/* Next Sections */}
      <AboutGameVerse />
      <FeaturedGames />
      <GamingExperience />
      <EventsSection />
      <GalleryView />
      <BookingSection />
    </>
  );
};

export default Home;
