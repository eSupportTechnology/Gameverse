import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  GlobalStyles,
} from "@mui/material";
import { styled } from "@mui/system";

// Gradient text for headings
const GradientText = styled(Typography)({
  background: "linear-gradient(to bottom, #CF36E1, #15A2EF)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "24px",
});

// Gradient button
const GradientButton = styled(Button)({
  position: "relative",
  padding: "12px 28px",
  borderRadius: "24px",
  textTransform: "none",
  fontWeight: 600,
  display: "block",
  margin: "40px auto 0",
  color: "#fff",
  background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
  border: "none",
  overflow: "hidden",
  zIndex: 1,
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "24px",
    padding: "2px",
    background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) padding-box",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    zIndex: -1,
  },
  "&:hover": {
    background: "transparent",
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: "linear-gradient(90deg, #33B2F7, #CF36E1)",
  },
});

// Gradient border card
const GradientBorderCard = styled("div")({
  borderRadius: "22px",
  padding: "1.5px",
  background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
  boxShadow:
    "0 10px 40px rgba(0,0,0,0.8), 0 0 60px rgba(51,178,247,0.2), 0 0 80px rgba(207,54,225,0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow:
      "0 15px 50px rgba(0,0,0,0.9), 0 0 80px rgba(51,178,247,0.3), 0 0 100px rgba(207,54,225,0.2)",
  },
});

// Card with responsive width and height
const InnerCard = styled(Card)(({ theme }) => ({
  borderRadius: "21px",
  background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
  color: "#fff",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  width: "90vw",
  maxWidth: "360px",
  height: "auto",
  [theme.breakpoints.up("sm")]: {
    width: "320px",
    height: "420px",
  },
  [theme.breakpoints.up("md")]: {
    width: "360px",
    height: "420px",
  },
}));

// Image wrapper with responsive height
const ImageWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "16px 16px 0 0",
  overflow: "hidden",
  height: "200px",
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px",
  },
  [theme.breakpoints.up("md")]: {
    height: "220px",
  },
}));

// Card content wrapper
const CardContentWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "16px",
});

// Countdown box
const CountdownBox = styled(Box)(({ theme }) => ({
  width: "80%",
  maxWidth: "346px",
  height: "48px",
  borderRadius: "24px",
  background:
    "linear-gradient(90deg, rgba(169, 5, 188, 0.4) 0%, rgba(51, 178, 247, 0.4) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "8px auto 0",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "44px",
  },
}));

// Live badge for live events
const LiveBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 16px",
  borderRadius: "20px",
  background: "linear-gradient(90deg, #FF0844, #FF4D00)",
  animation: "pulse 2s ease-in-out infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.7,
    },
  },
});

export const EventsSection = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [countdowns, setCountdowns] = useState({});

  const getMostRecentEvents = () => {
    const now = new Date();
    const upcomingEvents = allEvents
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    // Return first 3 upcoming events (or fewer if less than 3)
    return upcomingEvents.slice(0, 3);
  };


  const displayedEvents = showAll ? allEvents : getMostRecentEvents();

  const calculateCountdown = (eventDate) => {
    const now = new Date();
    const target = new Date(eventDate);
    const diff = target - now;

    if (diff <= 0) return { text: "LIVE NOW", isLive: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      text: `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`,
      isLive: false,
    };
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).toUpperCase();

  useEffect(() => {
    if (displayedEvents.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns = {};
      displayedEvents.forEach(event => {
        newCountdowns[event.id] = calculateCountdown(event.date);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [displayedEvents.length, showAll]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8000/api/events");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!data || data.length === 0) {
          setError("No events found in database");
          setLoading(false);
          return;
        }

        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.name,
          date: event.date.includes("T") ? event.date : `${event.date}T18:00:00`,
          image: `http://localhost:8000/storage/${event.thumbnail}`,
        }));

        setAllEvents(formattedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSeeAllClick = () => setShowAll(!showAll);

  return (
    <>
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
        id="events-section"
        sx={{
          bgcolor: "#0A0D17",
          py: { xs: 4, sm: 4 },
          px: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: { xs: "200px", sm: "600px", md: "700px" },
            height: "700px",
            background:
              "radial-gradient(circle, rgba(51,178,247,0.15) 0%, rgba(207,54,225,0.1) 100%)",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            borderRadius: "50%",
            filter: "blur(120px)",
          },
        }}
      >
        <GradientText variant="h3" sx={{ fontFamily: "BRUSHSTRIKE", fontSize: { xs: "40px", sm: "55px", md: "70px" } }}>
          Events & Tournaments
        </GradientText>

        <Typography
          variant="body1"
          sx={{
            color: "#bbb",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto 40px",
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
            lineHeight: 1.6,
          }}
        >
          Get ready to battle it out! Join our exciting events and competitive
          tournaments featuring top games, epic challenges, and massive rewards.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            minHeight: "200px",
          }}
        >
          {loading ? (
            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 4 }}>Loading events...</Typography>
          ) : error ? (
            <Typography sx={{ color: "#ff4444", fontSize: "18px", mt: 4 }}>Error: {error}</Typography>
          ) : displayedEvents.length === 0 ? (
            <Typography sx={{ color: "#fff", fontSize: "18px", mt: 4 }}>No upcoming events available</Typography>
          ) : (
            displayedEvents.map(event => {
              const countdown = countdowns[event.id] || { text: "Loading...", isLive: false };
              return (
                <GradientBorderCard key={event.id}>
                  <InnerCard>
                    <ImageWrapper>
                      <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}
                        onError={(e) => {
                          if (!e.target.dataset.fallback) {
                            e.target.dataset.fallback = true;
                            e.target.src = "/images/default-event.jpg";
                          }
                        }}
                      />
                    </ImageWrapper>
                    <CardContentWrapper>
                      {countdown.isLive ? (
                        <LiveBadge>
                          <Box sx={{ width: "8px", height: "8px", borderRadius: "50%", bgcolor: "#fff" }} />
                          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "14px", sm: "16px" } }}>
                            LIVE NOW
                          </Typography>
                        </LiveBadge>
                      ) : (
                        <GradientText sx={{ fontSize: { xs: "18px", sm: "20px", md: "22px" } }}>
                          UPCOMING
                        </GradientText>
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#fff", fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                        {event.title}
                      </Typography>
                      <GradientText sx={{ color: "#aaa", mb: 1, fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                        {formatDate(event.date)}
                      </GradientText>

                      <CountdownBox>
                        <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: "16px", sm: "18px", md: "20px" } }}>
                          {countdown.text}
                        </Typography>
                      </CountdownBox>
                    </CardContentWrapper>
                  </InnerCard>
                </GradientBorderCard>
              );
            })
          )}
        </Box>

        {allEvents.length > 1 && (
          <GradientButton onClick={handleSeeAllClick}>
            {showAll ? "Show Less" : "See All Events"}
          </GradientButton>
        )}
      </Box>
    </>
  );
};
