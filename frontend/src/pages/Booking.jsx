import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, duration, GlobalStyles, Typography } from "@mui/material";
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
    players: 1,
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

  const handleStationSelect = (station) => {
    setBookingData({ ...bookingData, station });
  };

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
    const duration = bookingData.dateTime?.duration || null;

    try {
      for (const player of playerInfo.playerDetails) {
        const payload = {
          nfc_card_number: null,
          customer_name: `${player.firstName} ${player.lastName}`,
          phone_number: player.contactNumber,
          station: bookingData.station.name,
          booking_date: date,
          start_time: time,
          duration,
          amount: totalAmount,
          vr_play: player.vrPlay,
          number_of_players: 1,
        };

        await axios.post(`${API_BASE_URL}/api/bookings`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Bookings created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create bookings");
    }
  };

  const calculateAmount = () => {
    if (!bookingData.station || !bookingData.dateTime) return 0;

    const selectedDuration =
      Number(
        bookingData.dateTime?.durationMinutes || bookingData.dateTime?.duration,
      ) || 0;

    if (!selectedDuration) return 0;

    const pricingArray = bookingData.station.pricing || [];

    const price30 = pricingArray.find((p) => Number(p.duration) === 30);
    const price60 = pricingArray.find((p) => Number(p.duration) === 60);

    if (!price30 || !price60) return 0;

    let total = 0;

    playerInfo.playerDetails?.forEach((player) => {
      const isVR = player.vrPlay === "yes";

      const hours = Math.floor(selectedDuration / 60);
      const remainingMinutes = selectedDuration % 60;

      // 1 Hour blocks
      if (hours > 0) {
        const baseHour = parseFloat(price60.price) || 0;
        const vrHour = isVR ? parseFloat(price60.vrPrice || 0) : 0;
        total += hours * (baseHour + vrHour);
      }

      // 30 Minute block
      if (remainingMinutes === 30) {
        const base30 = parseFloat(price30.price) || 0;
        const vr30 = isVR ? parseFloat(price30.vrPrice || 0) : 0;
        total += base30 + vr30;
      }
    });

    return total;
  };

  const totalAmount = calculateAmount();

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
              fontSize: { xs: "24px", sm: "55px", md: "84px" },
              fontWeight: 400,
              fontStyle: "normal",
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              lineHeight: { xs: "30px", sm: "60px", md: "80px" },
              letterSpacing: "0.03em",
            }}
          >
            BOOK YOUR GAMING SESSION
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "8px", sm: "15px", md: "18px" },
              color: "#FFFFFF",
              maxWidth: "1200px",
              mx: "auto",
              lineHeight: 1.3,
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
          amount={totalAmount}
        />

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-end" },
            gap: 2,
          }}
        >
          <Button
            onClick={handleBookingSubmit}
            sx={{
              px: { xs: 4, sm: 8 },
              py: { xs: 1.2, sm: 1.8 },
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: { xs: "12px", sm: "18px" },
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
