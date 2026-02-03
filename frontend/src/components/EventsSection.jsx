import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  GlobalStyles,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

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
  width: "100%",
  height: "200px",
  [theme.breakpoints.up("sm")]: { width: "320px", height: "420px" },
  [theme.breakpoints.up("md")]: { width: "360px", height: "420px" },
}));

// Image wrapper with responsive height
const ImageWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "16px 16px 0 0",
  overflow: "hidden",
  height: "80px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  "&:hover img": { transform: "scale(1.05)" },
  [theme.breakpoints.up("sm")]: { height: "200px" },
  [theme.breakpoints.up("md")]: { height: "220px" },
}));

// Card content wrapper
const CardContentWrapper = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "8px",
  [theme.breakpoints.up("sm")]: { padding: "12px" },
}));

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
  margin: "4px auto 0",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    height: "26px",
    borderRadius: "14px",
  },
}));

const EventsSection = () => {
  const [tournaments, setTournaments] = useState([]);
  const scrollContainerRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  console.log(API_BASE_URL);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((response) => {
        const sortedEvents = response.data.sort((a, b) => b.id - a.id);
        const recentThreeEvents = sortedEvents.slice(0, 3);
        const eventsWithTimer = recentThreeEvents
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

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTournaments((prev) =>
        prev.map((t) => ({ ...t, timeLeft: calculateTimeLeft(t.date) })),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoPlaying(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    observer.observe(scrollContainerRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !isAutoPlaying || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollInterval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      if (currentScroll >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [isAutoPlaying, isMobile]);

  const calculateTimeLeft = (dateString) => {
    const eventDate = new Date(dateString + "T00:00:00");
    const now = new Date();
    const diff = eventDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  return (
    <>
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
        id="events-section"
        sx={{
          bgcolor: "#0A0D17",
          py: { xs: 0, sm: 4 },
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
        <GradientText
          variant="h3"
          sx={{
            fontFamily: "BRUSHSTRIKE",
            fontSize: { xs: "32px", sm: "55px", md: "70px" },
            fontWeight: 400,
            fontStyle: "normal",
            background: "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: { xs: "nowrap", sm: "normal" },
          }}
        >
          Events & Tournaments
        </GradientText>

        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            textAlign: "center",
            maxWidth: "900px",
            margin: { xs: "0 auto 20px", sm: "0 auto 40px" },
            fontSize: { xs: "11px", sm: "15px", md: "16px" },
            lineHeight: 1.4,
          }}
        >
          Get ready to battle it out! Join our exciting events and competitive
          tournaments featuring top games, epic challenges, and massive rewards.
          Whether you're a casual player or a pro, there's always a stage for
          you to shine.
        </Typography>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: { xs: "flex-start", sm: "center" },
            position: "relative",
            zIndex: 1,
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            width: "100%",
            pb: 2,
          }}
        >
          {tournaments.map((tournament) => (
            <Box
              key={tournament.id}
              sx={{
                flex: { xs: "0 0 160px", sm: "0 0 auto" },
                scrollSnapAlign: { xs: "start", sm: "unset" },
              }}
            >
              <GradientBorderCard>
                <InnerCard>
                  <ImageWrapper>
                    <CardMedia
                      component="img"
                      image={tournament.thumbnail}
                      alt={tournament.name}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x250?text=No+Image")
                      }
                    />
                  </ImageWrapper>
                  <CardContentWrapper>
                    <GradientText sx={{ fontSize: { xs: "10px", sm: "18px" } }}>
                      UPCOMING
                    </GradientText>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        background: "White",
                        color: "white",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: { xs: "11px", sm: "20px" },
                      }}
                    >
                      {tournament.name}
                    </Typography>
                    <GradientText
                      sx={{
                        color: "#aaa",
                        mb: 0.5,
                        fontSize: { xs: "9px", sm: "16px" },
                      }}
                    >
                      {tournament.date}
                    </GradientText>

                    <CountdownBox>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: { xs: "9px", sm: "14px" },
                        }}
                      >
                        {tournament.timeLeft.days}d {tournament.timeLeft.hours}h{" "}
                        {tournament.timeLeft.minutes}m{" "}
                        {tournament.timeLeft.seconds}s
                      </Typography>
                    </CountdownBox>
                  </CardContentWrapper>
                </InnerCard>
              </GradientBorderCard>
            </Box>
          ))}
        </Box>

        <GradientButton onClick={() => navigate("/games#events-section")}>
          See All Events
        </GradientButton>
      </Box>
    </>
  );
};

export default EventsSection;
