import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

const EventsTournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/events")
      .then((response) => {
        const eventsWithTimer = response.data
          .sort((a, b) => b.id - a.id)
          .map((event) => ({
            ...event,
            timeLeft: calculateTimeLeft(event.date),
          }));

        setTournaments(eventsWithTimer);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTournaments((prevTournaments) =>
        prevTournaments.map((t) => ({
          ...t,
          timeLeft: calculateTimeLeft(t.date),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeLeft = (dateString) => {
    const eventDate = new Date(dateString + "T00:00:00");
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const scrollToPopularGames = () => {
    const target = document.getElementById("popular-games");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      component="section"
      id="events-section"
      sx={{
        position: "relative",
        bgcolor: "#0A0D17",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4 },
        color: "white",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "150px",
          background:
            "linear-gradient(to bottom, rgba(10,13,23,1) 0%, rgba(10,13,23,0.6) 50%, rgba(10,13,23,0) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "800px",
          height: "800px",
          background:
            "radial-gradient(circle, rgba(51, 178, 247, 0.3), rgba(169, 5, 188, 0.25), transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(150px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{ position: "relative", zIndex: 3, maxWidth: "1400px", mx: "auto" }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "36px", sm: "50px", md: "75px" },
              fontFamily: "BRUSHSTRIKE, sans-serif",
              fontWeight: 400,
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2,
            }}
          >
            EVENTS & TOURNAMENTS
          </Typography>
          <Typography
            sx={{
              color: "rgba(184, 193, 236, 0.9)",
              fontSize: { xs: "14px", md: "16px" },
              maxWidth: "1100px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Get ready to battle it out! Join our exciting events and competitive
            tournaments featuring top games, epic challenges, and massive
            rewards. Whether you're a casual player or a pro, there's always a
            stage for you to shine.
          </Typography>
        </Box>

        {/* Tournaments Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 4 },
            px: { xs: 1, sm: 2 },
            mb: { xs: 6, md: 10 },
          }}
        >
          {tournaments.map((tournament) => (
            <Box
              key={tournament.id}
              sx={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#0A0D17",
                border: "1px solid rgba(51, 178, 247, 0.2)",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                // Hover effects removed here to keep cards normal/static
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  height: "240px",
                  overflow: "hidden",
                  position: "relative",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Box
                  component="img"
                  src={tournament.thumbnail}
                  alt={tournament.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />
                {/* Gradient overlay on image bottom */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, #0B1221 0%, transparent 100%)",
                  }}
                />
              </Box>

              {/* Content Section */}
              <Box
                sx={{
                  p: 3,
                  pt: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                {/* UPCOMING Text */}
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    background: "linear-gradient(to right, #9F32FF, #33B2F7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  UPCOMING
                </Typography>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {tournament.name}
                </Typography>

                {/* Date */}
                <Typography
                  sx={{
                    color: "#8A99C0",
                    fontSize: "15px",
                    fontWeight: 600,
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {tournament.date}
                </Typography>

                {/* Timer Pill */}
                <Box
                  sx={{
                    width: "100%",
                    py: 1.5,
                    background: "linear-gradient(to right, #33B2F7, #A905BC)",
                    borderRadius: "50px",
                    position: "relative",
                    overflow: "hidden",
                    marginTop: "auto",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  <Typography
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#ffffff",
                      letterSpacing: "1px",
                    }}
                  >
                    {tournament.timeLeft.days}d {tournament.timeLeft.hours}h{" "}
                    {tournament.timeLeft.minutes}m {tournament.timeLeft.seconds}
                    s
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Footer CTA */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "32px", md: "42px" },
              fontWeight: 700,
              mb: 4,
              lineHeight: 1.4,
              background:
                "linear-gradient(90deg, #9b36ff 0%, #7e4aff 30%, #3368ff 70%, #05a9ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Your seat is waiting — Book Now and Game On!
          </Typography>
          <Button
            onClick={scrollToPopularGames}
            sx={{
              px: 5,
              py: 1.5,
              background: "linear-gradient(to right, #33B2F7, #A905BC)",
              color: "white",
              borderRadius: "30px",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(51, 178, 247, 0.4)",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 12px 35px rgba(169, 5, 188, 0.6)",
                background: "linear-gradient(to right, #A905BC, #33B2F7)",
              },
            }}
          >
            Booking Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventsTournaments;
