import React from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";

const AboutGameVerse = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define the specific colors and gradients
  const headerGradient = "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)";
  const cardPurpleBorder =
    "linear-gradient(to right, #A033FF, #D100FF, #C058FF)";
  const cardBlueBorder = "linear-gradient(to right, #00C3FF, #3C7CFA, #A033FF)";

  const cardData = [
    {
      icon: "/assets/calendar_icon.png",
      title: "Founded in 2025",
      borderGradient: cardPurpleBorder,
    },
    {
      icon: "/assets/flag_icon.png",
      title: "Largest in central province",
      borderGradient: cardBlueBorder,
    },
    {
      icon: "/assets/rocket_icon.png",
      title: "10+ category and 50+ games",
      borderGradient: cardPurpleBorder,
    },
    {
      icon: "/assets/food_icon.png",
      title: "Food & drinks",
      borderGradient: cardBlueBorder,
    },
    {
      icon: "/assets/premium_icon.png",
      title: "Supreme & Premium facilities",
      borderGradient: cardPurpleBorder,
    },
    {
      icon: "/assets/vibe_icon.png",
      title: "Vibrant neon vibe and a scenic view outside",
      borderGradient: cardBlueBorder,
    },
  ];

  const applyGradientText = (gradient) => ({
    background: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  });

  const cardStyle = (borderGradient) => ({
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "32px",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    width: isMobile ? "100%" : "363px",
    height: "131px",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "2px",
      background: borderGradient,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 25px rgba(160, 51, 255, 0.4)",
      "&::before": {
        boxShadow: `inset 0 0 15px 3px rgba(160, 51, 255, 0.6)`,
      },
    },
  });

  const iconContainerStyle = (borderGradient) => ({
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.08)",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "2px",
      background: borderGradient,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0A0A0A",
        color: "#fff",
        padding: isMobile ? "40px 20px" : "80px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Box sx={{ maxWidth: 900, textAlign: "center", mb: isMobile ? 6 : 10 }}>
        <Typography
          variant={isMobile ? "h3" : "h2"}
          sx={{
            ...applyGradientText(headerGradient),
            fontWeight: 800,
            mb: 3,
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "3.5rem" : "4.5rem",
            letterSpacing: "0.03em",
          }}
        >
          About GameVerse
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",
            mb: isMobile ? 5 : 8,
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.5,
            fontSize: isMobile ? "1rem" : "1.09rem",
            maxWidth: "900px",
            margin: "0 auto",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Play, compete, and chill - from Billiards, PS5s, racing simulators,
          VR's, arcade coin machine games, carom, chess to archery - wrapped in
          neon energy and scenic views that elevate your gaming experience.
        </Typography>
      </Box>

      <Grid container spacing={isMobile ? 3 : 5} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={cardStyle(card.borderGradient)}>
              {/* Icon */}
              <Box sx={iconContainerStyle(card.borderGradient)}>
                <img
                  src={card.icon}
                  alt={card.title}
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                />
              </Box>

              {/* Text */}
              <Typography
                variant="h6"
                sx={{
                  color: "#E0E0E0",
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "151px" : "25px",
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {card.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutGameVerse;
