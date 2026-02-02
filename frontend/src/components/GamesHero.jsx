import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GamesHero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "38vh", md: "calc(100vh - 64px)" },
        width: "100%",
        bgcolor: "#0A0D17",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        px: { xs: 2, sm: 4, md: 10 },
        pt: { xs: 2, md: 0 },
        pb: { xs: 0, md: 0 },
        mt: { xs: "0px", md: 0 },
        boxSizing: "border-box",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: "140px",
          background:
            "linear-gradient(to bottom, rgba(10,13,23,0) 0%, rgba(10,13,23,0.85) 55%, #0A0D17 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
      }}
    >
      {/* Left Content */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: "50%", md: "600px" },
          zIndex: 3,
          position: "relative",
          textAlign: "left",
          pr: { xs: 1, sm: 2, md: 0 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", sm: "44px", md: "72px" },
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: { xs: 1.2, md: 1.1 },
            mb: { xs: 0.3, md: 1 },
          }}
        >
          Experience
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "56px", md: "72px" },
            fontWeight: 700,
            background: "linear-gradient(to bottom, #33B2F7, #A905BC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: { xs: 1.2, md: 1.1 },
            mb: { xs: 0.3, md: 1 },
          }}
        >
          Gaming
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "18px", sm: "56px", md: "72px" },
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: { xs: 1.2, md: 1.1 },
            mb: { xs: 1, md: 4 },
          }}
        >
          <Box component="span" sx={{ display: { xs: "block", md: "inline" } }}>Beyond the</Box>
          {" "}
          <Box component="span" sx={{ display: { xs: "block", md: "inline" } }}>Basic Details</Box>
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: "11px", sm: "14px", md: "18px" },
            lineHeight: { xs: 1.4, md: 1.8 },
            mb: { xs: 1, md: 4 },
            maxWidth: { xs: "200px", md: "600px" },
          }}
        >
          Elevate your play at Sri Lanka's neon gaming hotspot – reserve your station online, skip the wait, and step into a glowing world of adrenaline, cutting-edge setups, and nonstop competitive energy.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "10px", sm: "14px", md: "18px" },
            fontWeight: 500,
            mb: { xs: 1.5, md: 5 },
            backgroundImage: "linear-gradient(to right, #33B2F7, #A905BC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Opening Hours: 12 PM – 12 AM (Daily)
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
            flexWrap: "nowrap",
            justifyContent: "flex-start",
          }}
        >
          <Button
            onClick={() => navigate("/booking", { state: { from: "/games" } })}
            sx={{
              position: "relative",
              px: { xs: 1.5, sm: 3, md: 5 },
              py: { xs: 0.8, md: 1.5 },
              background: "linear-gradient(to right, #33B2F7, #A905BC)",
              color: "white",
              borderRadius: "30px",
              fontWeight: 700,
              fontSize: { xs: "9px", sm: "14px", md: "16px" },
              textTransform: "none",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "30px",
                padding: { xs: "1px", sm: "2px" },
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
              },
            }}
          >
            Booking Now
          </Button>
          <Button
            onClick={() => {
              const eventsSection = document.getElementById("events-section");
              if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            sx={{
              position: "relative",
              px: { xs: 1.5, sm: 3, md: 5 },
              py: { xs: 0.8, md: 1.5 },
              background: "transparent",
              color: "transparent",
              borderRadius: "30px",
              fontWeight: 700,
              fontSize: { xs: "9px", sm: "14px", md: "16px" },
              textTransform: "none",
              backgroundImage: "linear-gradient(to right, #A905BC, #33B2F7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "30px",
                padding: { xs: "1px", sm: "2px" },
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
            }}
          >
            View Events
          </Button>
        </Box>
      </Box>

      {/* Right Image */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: "50%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
          position: "relative",
          minHeight: { xs: "auto", md: "100vh" },
          mt: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "70%", md: "90%" },
            height: { xs: "70%", md: "70%" },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #CF36E1 0%, #33B2F7 60%, transparent 80%)",
            zIndex: 1,
            filter: "blur(150px)",
          }}
        />
        <Box
          component="img"
          src="/assets/Picture1.png"
          alt="Gaming Characters"
          sx={{
            width: "100%",
            maxWidth: { xs: "250px", sm: "550px", md: "700px", lg: "850px" },
            height: "auto",
            objectFit: "contain",
            position: "relative",
            zIndex: 2,
            display: "block",
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 30%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 30%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default GamesHero;
