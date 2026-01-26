import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, GlobalStyles, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PickDateTime from "../components/PickDateTime";
import PlayerInfo from "../components/PlayerInfo";
import SelectStation from "../components/SelectStation";
import { API_BASE_URL } from "../apiConfig";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backTarget = location.state?.from || "/";
  const [bookingData, setBookingData] = useState({
    station: null,
    dateTime: null,
  });
  const [playerInfo, setPlayerInfo] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    vrPlay: "yes",
  });

  const [stations, setStations] = useState([]);
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const stationType = location.state?.stationType;

  useEffect(() => {
    const fetchStations = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/stations`);
      if (res.data.status === "success") {
        setStations(res.data.data);
      }
    };
    fetchStations();
  }, []);

  const filteredStations = stationType
    ? stations.filter((s) => s.type === stationType)
    : stations;

  const handleStationSelect = (stationId) =>
    setBookingData({ ...bookingData, station: stationId });

  const handleDateTimeSelect = (dateTime) =>
    setBookingData({ ...bookingData, dateTime });

  const handlePlayerInfoChange = (data) => setPlayerInfo(data);

  const handleBookingSubmit = async () => {
    const token = localStorage.getItem("authToken");

    if (!bookingData.station || !bookingData.dateTime) {
      alert("Please select a station and date/time.");
      return;
    }

    const date = bookingData.dateTime?.date;
    const time = bookingData.dateTime?.time?.replace(".", ":");

    if (!date || !time) {
      alert("Invalid date or time selected.");
      return;
    }

    const payload = {
      nfc_card_number: null,
      customer_name: `${playerInfo.firstName} ${playerInfo.lastName}`,
      phone_number: playerInfo.contactNumber,
      station: bookingData.station,
      booking_date: date,
      start_time: time,
      duration: "1h 0m",
      amount: 0,
      vr_play: playerInfo.vrPlay,
    };

    console.log("Booking payload:", payload);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/bookings`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Booking created:", res.data);
      alert("Booking successful!");
      navigate("/booking");
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };

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

        <PickDateTime
          onNext={handleDateTimeSelect}
          selectedStation={bookingData.station}
          selectedDateTime={bookingData.dateTime}
        />

        <PlayerInfo
          selectedStation={bookingData.station}
          selectedDateTime={bookingData.dateTime}
          onPlayerInfoChange={handlePlayerInfoChange}
        />

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={handleBookingSubmit}
            sx={{
              px: 8,
              py: 1.8,
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "18px",
              textTransform: "none",
              color: "#fff",
              background: "linear-gradient(to right, #33B2F7, #A905BC)",
              boxShadow: "0 4px 15px rgba(51, 178, 247, 0.4)",
              "&:hover": {
                background: "linear-gradient(to right, #A905BC, #33B2F7)",
                boxShadow: "0 6px 20px rgba(169, 5, 188, 0.5)",
              },
            }}
          >
            Booking Session
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Booking;
