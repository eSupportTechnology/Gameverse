import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PickDateTime = ({ onNext, selectedStation, selectedDateTime }) => {
  const [selectedDate, setSelectedDate] = useState(selectedDateTime?.date || null);
  const [selectedTime, setSelectedTime] = useState(selectedDateTime?.time || null);

  // Generate dates for November 2025
  const dates = [];
  for (let i = 3; i <= 12; i++) {
    dates.push(i);
  }

  // Generate time slots
  const timeSlots = [
    { time: "12.00", name: "Alex Chen", status: "Booked" },
    { time: "12.15", name: "Alex Chen", status: "Booked" },
    { time: "12.30", name: "Alex Chen", status: "Booked" },
    { time: "12.45", name: "Alex Chen", status: "Booked" },
    { time: "01.00", name: "Alex Chen", status: "Booked" },
    { time: "01.15", status: "Available" },
    { time: "01.30", status: "Available" },
    { time: "01.45", status: "Available" },
    { time: "02.00", status: "Available" },
    { time: "02.15", status: "Available" },
    { time: "02.30", status: "Available" },
    { time: "02.45", status: "Available" },
    { time: "03.00", status: "Available" },
    { time: "03.15", status: "Available" },
    { time: "03.45", status: "Available" },
    { time: "04.00", status: "Available" },
    { time: "04.15", status: "Available" },
    { time: "04.30", status: "Available" },
    { time: "04.45", status: "Available" },
    { time: "05.00", status: "Available" },
    { time: "05.15", status: "Available" },
    { time: "05.30", status: "Available" },
    { time: "05.45", status: "Available" },
    { time: "06.00", status: "Available" },
    { time: "06.15", status: "Available" },
    { time: "06.30", status: "Available" },
    { time: "06.45", status: "Available" },
    { time: "07.00", status: "Available" },
    { time: "07.15", status: "Available" },
    { time: "07.30", status: "Available" },
    { time: "07.45", status: "Available" },
    { time: "08.00", status: "Available" },
    { time: "08.15", status: "Available" },
    { time: "08.30", status: "Available" },
    { time: "08.45", status: "Available" },
    { time: "09.00", status: "Available" },
    { time: "09.15", status: "Available" },
    { time: "09.30", status: "Available" },
    { time: "09.45", status: "Available" },
    { time: "10.00", status: "Available" },
    { time: "10.15", status: "Available" },
    { time: "10.30", status: "Available" },
    { time: "10.45", status: "Available" },
    { time: "11.00", status: "Available" },
    { time: "11.15", status: "Available" },
    { time: "11.30", status: "Available" },
    { time: "11.45", status: "Available" },
    { time: "12.00", status: "Available" },
    { time: "12.15", status: "Available" },
    { time: "01.30", status: "Available" },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time, status) => {
    if (status === "Available") {
      setSelectedTime(time);
    }
  };

  React.useEffect(() => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  }, [selectedDate, selectedTime, onNext]);

  return (
    <Box
      sx={{
        color: "white",
        mb: 8,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "24px", md: "32px" },
          mb: 6,
        }}
      >
        Pick a Date & Time
      </Typography>

      {/* Month Navigation */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #A905BC, #33B2F7)",
          py: 2,
          clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)",
        }}
      >
        <IconButton sx={{ color: "white" }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          sx={{ mx: 4, fontSize: "20px", fontWeight: "bold", minWidth: 150, textAlign: "center" }}
        >
          November 2025
        </Typography>
        <IconButton sx={{ color: "white" }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Dates */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "flex",
          gap: 2,
          mb: 4,
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#33B2F7", borderRadius: "4px" },
        }}
      >
        <IconButton sx={{ color: "white", minWidth: "40px" }}>
          <ChevronLeftIcon />
        </IconButton>
        {dates.map((date) => (
          <Box
            key={date}
            onClick={() => handleDateSelect(date)}
            sx={{
              minWidth: 60,
              textAlign: "center",
              py: 1.5,
              px: 2,
              bgcolor: selectedDate === date ? "rgba(51, 178, 247, 0.3)" : "rgba(255,255,255,0.05)",
              border: selectedDate === date ? "2px solid #33B2F7" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(51, 178, 247, 0.2)",
              },
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {date.toString().padStart(2, "0")}
            </Typography>
          </Box>
        ))}
        <IconButton sx={{ color: "white", minWidth: "40px" }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Time Slots Grid */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(10, 1fr)",
          },
          gap: 2,
        }}
      >
        {timeSlots.map((slot, idx) => (
          <Box
            key={idx}
            onClick={() => handleTimeSelect(slot.time, slot.status)}
            sx={{
              textAlign: "center",
              py: 1.2,
              px: 0.8,
              bgcolor:
                slot.status === "Booked"
                  ? "rgba(169, 5, 188, 0.3)"
                  : selectedTime === slot.time
                  ? "rgba(51, 178, 247, 0.3)"
                  : "rgba(255,255,255,0.05)",
              border:
                selectedTime === slot.time
                  ? "2px solid #33B2F7"
                  : slot.status === "Booked"
                  ? "1px solid rgba(169, 5, 188, 0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              cursor: slot.status === "Available" ? "pointer" : "not-allowed",
              opacity: slot.status === "Booked" ? 0.6 : 1,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor:
                  slot.status === "Available"
                    ? "rgba(51, 178, 247, 0.2)"
                    : undefined,
              },
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "bold", mb: 0.3 }}>
              {slot.time}
            </Typography>
            {slot.name && (
              <Typography sx={{ fontSize: "9px", color: "gray.400" }}>
                {slot.name}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: "10px",
                color: slot.status === "Booked" ? "#A905BC" : "#33B2F7",
                fontWeight: 500,
              }}
            >
              {slot.status}
            </Typography>
          </Box>
        ))}
      </Box>

    </Box>
  );
};

export default PickDateTime;
