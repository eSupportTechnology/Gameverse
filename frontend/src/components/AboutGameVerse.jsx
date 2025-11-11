import React from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  GlobalStyles,
} from "@mui/material";

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
    background: "rgba(255, 255, 255, 0.11)",
    backdropFilter: "blur(12px)",
    borderRadius: "32px",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    textAlign: "left",
    width: isMobile ? "180px" : "330px",
    height: isMobile ? "100px" : "120px",
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
    width: isMobile ? "60px" : "80px",
    height: isMobile ? "60px" : "80px",
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
    <>
      {/* Global font registration */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/Brushstrike.ttf") format("truetype")`,
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",      // forces full viewport width
          overflow: "hidden",
          // background: "linear-gradient(90deg, #01010a 0%, #1a0033 50%, #000000 100%)",
          background: "radial-gradient(circle, #01010a 10%, #0A0D17 50%, #0A0D17 100%)",
          color: "#fff",
          padding: isMobile ? "40px 20px" : "80px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          marginTop: "-2px",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(51, 178, 247, 0.73), rgba(84, 14, 92, 0.6), transparent 50%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(120px)",
            zIndex: 0,
          },

        }}
      >
        {/* Header */}
        <Box sx={{ maxWidth: 900, textAlign: "center", mb: isMobile ? 6 : 8 }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            sx={{
              ...applyGradientText(headerGradient),
              fontWeight: 400,
              mb: 3,
              fontFamily: "BRUSHSTRIKE",
              fontSize: isMobile ? "48px" : "84px",
              lineHeight: isMobile ? "52px" : "80px",
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
            VR's, arcade coin machine games, carom, chess to archery - wrapped
            in neon energy and scenic views that elevate your gaming experience.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid
          container
          spacing={isMobile ? 3 : 5}
          justifyContent="center"
          alignItems="stretch"
        >
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
                      width: isMobile ? "35px" : "45px",
                      height: isMobile ? "35px" : "45px",
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
                    fontSize: isMobile ? "16px" : "20px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {card.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AboutGameVerse;
