import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  GlobalStyles,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const firstRowFeatures = [
  {
    title: "Surround Sound",
    description: "+ Ambient Lighting",
    image: "/Images/f7.jpg",
  },
  {
    title: "Snacks, desserts, juice & ice cream bar",
    description: "",
    image: "/Images/ice.png",
  },
  {
    title: "Supreme and premium lounge seating",
    description: "",
    image: "/Images/f9.png",
  },
  {
    title: "NFC Cards – Loyalty / Membership / Offers",
    description: "",
    image: "/Images/f10.png",
  },
];

const secondRowFeatures = [
  {
    title: "Weekly and competitive tournaments",
    description: "",
    image: "/Images/f11.png",
  },
  {
    title: "Neon party nights",
    description: "",
    image: "/Images/f12.png",
  },
  {
    title: "Powerful Gaming Tool",
    description: "",
    image: "/Images/f8.png",
  },
];

const FeatureCard = ({ feature }) => (
  <Card
    sx={{
      background: "transparent",
      boxShadow: "none",
      textAlign: "center",
      cursor: "pointer",
      color: "#fff",
      minHeight: { xs: 180, sm: 200, md: 230 },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      "&:hover .feature-title": {
        color: "rgba(51, 178, 247, 0.73)",
      },
      "&:hover .feature-desc": {
        color: "rgba(51, 178, 247, 0.73)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 1,
      }}
    >
      <CardMedia
        component="img"
        src={feature.image}
        alt={feature.title}
        sx={{
          width: { xs: 100, sm: 120, md: 150 },
          height: { xs: 100, sm: 120, md: 150 },
          borderRadius: 6,
          objectFit: "cover",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(241, 66, 241, 0.56)",
          },
        }}
      />
    </Box>

    <CardContent sx={{ p: 0, px: { xs: 0.5, sm: 1 } }}>
      <Typography
        className="feature-title"
        variant="h6"
        fontWeight="normal"
        sx={{
          color: "#fff",
          cursor: "pointer",
          textAlign: "center",
          maxWidth: { xs: "160px", sm: "200px", md: "220px" },
          mx: "auto",
          transition: "color 0.3s",
          fontSize: { xs: "9px", sm: "16px", md: "18px" },
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </Typography>
      {feature.description && (
        <Typography
          className="feature-desc"
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: { xs: "160px", sm: "180px", md: "200px" },
            mx: "auto",
            mt: 1,
            transition: "color 0.3s",
            fontSize: { xs: "9px", sm: "13px", md: "14px" },
          }}
        >
          {feature.description}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default function GamingExperience() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Combined features for mobile 3x3 grid (9 items - duplicating 2)
  const mobileFeatures = [
    ...firstRowFeatures,
    ...secondRowFeatures,
    firstRowFeatures[0], // Duplicate: Surround Sound
    firstRowFeatures[1], // Duplicate: Snacks, desserts
  ];

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
          px: { xs: 2, sm: 3, md: 8 },
          minHeight: { xs: "auto", md: "80vh" },
          py: { xs: 4, md: 0 },
          bgcolor: "#0A0D17",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: { xs: "400px", sm: "600px", md: "800px" },
            height: { xs: "400px", sm: "600px", md: "800px" },
            background:
              "radial-gradient(circle, rgba(51, 178, 247, 0.73), rgba(84, 14, 92, 0.6), transparent 80%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(120px)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, mt: { xs: 2, md: 5 } }}>
          <Typography
            sx={{
              fontSize: { xs: "32px", sm: "60px", md: "84px" },
              fontWeight: 400,
              fontFamily: "BRUSHSTRIKE",
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              mb: { xs: 2, md: 0 },
            }}
          >
            Why Choose Us
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              color: "#fff",
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "8px", sm: "15px", md: "16px" },
              px: { xs: 1, sm: 2, md: 0 },
              lineHeight: 1.3,
            }}
          >
            Level up your fun with unbeatable variety, cutting-edge gear, and a
            vibrant atmosphere designed for every gamer. Whether you're here to
            compete, unwind, or explore the latest in gaming tech, we deliver an
            experience like no other.
          </Typography>

          {/* Mobile: 3x3 Grid */}
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              {mobileFeatures.map((feature, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "calc(33.33% - 8px)",
                    minWidth: "100px",
                  }}
                >
                  <FeatureCard feature={feature} />
                </Box>
              ))}
            </Box>
          ) : (
            /* Desktop: Original layout */
            <>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: { sm: 3, md: 5 },
                  mb: { sm: 3, md: 6 },
                }}
              >
                {firstRowFeatures.map((feature, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: "0 0 auto",
                      width: { sm: "45%", md: "22%" },
                      minWidth: { sm: "180px" },
                    }}
                  >
                    <FeatureCard feature={feature} />
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: { sm: 3, md: 5 },
                  mb: 2,
                }}
              >
                {secondRowFeatures.map((feature, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: "0 0 auto",
                      width: { sm: "45%", md: "26%" },
                      minWidth: { sm: "180px" },
                    }}
                  >
                    <FeatureCard feature={feature} />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
