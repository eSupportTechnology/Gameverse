import React, { useState, useEffect } from "react";
import { Box, Typography, Button, GlobalStyles } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SelectStation from "../components/SelectStation";
import PickDateTime from "../components/PickDateTime";
import PlayerInfo from "../components/PlayerInfo";
import axios from "axios";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backTarget = location.state?.from || "/";
  const [bookingData, setBookingData] = useState({
    station: null,
    dateTime: null,
  });
  const [stations, setStations] = useState([]);
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStationSelect = (stationId) => {
    setBookingData({ ...bookingData, station: stationId });
  };

  const handleDateTimeSelect = (dateTime) => {
    setBookingData({ ...bookingData, dateTime });
  };
  const stationType = location.state?.stationType;

  useEffect(() => {
    const fetchStations = async () => {
      const res = await axios.get("http://localhost:8001/api/stations");
      if (res.data.status === "success") {
        setStations(res.data.data);
      }
    };
    fetchStations();
  }, []);

  const filteredStations = stationType
    ? stations.filter((s) => s.type === stationType)
    : stations;

  return (
    <>
      {/* Global font registration */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "Brushstrike",
            src: `url("/fonts/Brushstrike.ttf") format("truetype")`,
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />

      <Box
        sx={{
          bgcolor: "#0A0D17",
          minHeight: "100vh",
          py: 6,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Back Button */}
        <Box sx={{ maxWidth: "1400px", mx: "auto", mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: "20px" }} />}
            onClick={() => navigate(backTarget)}
            sx={{
              color: "#A905BC",
              textTransform: "none",
              border: "2px solid #A905BC",
              borderRadius: "50%",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(169, 5, 188, 0.1)",
                borderColor: "#A905BC",
              },
              "& .MuiButton-startIcon": {
                margin: 0,
              },
            }}
          ></Button>
        </Box>

        {/* Main Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Brushstrike, sans-serif",
              fontSize: { xs: "40px", sm: "55px", md: "84px" },
              fontWeight: 400,
              fontStyle: "normal",
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              lineHeight: { xs: "44px", sm: "60px", md: "80px" },
              letterSpacing: "0.03em",
            }}
          >
            BOOK YOUR GAMING SESSION
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#FFFFFF",
              maxWidth: "1200px",
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

        {/* Select Station Section */}
        <SelectStation
          stations={filteredStations}
          onNext={handleStationSelect}
          selectedStation={bookingData.station}
        />

        {/* Pick Date & Time Section */}
        <PickDateTime
          onNext={handleDateTimeSelect}
          selectedStation={bookingData.station}
          selectedDateTime={bookingData.dateTime}
        />

        {/* Player Info Section */}
        <PlayerInfo
          selectedStation={bookingData.station}
          selectedDateTime={bookingData.dateTime}
        />
      </Box>
    </>
  );
};

export default Booking;
