import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PickDateTime = ({ onNext, selectedStation, selectedDateTime }) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    selectedDateTime?.date || null
  );
  const [selectedTime, setSelectedTime] = useState(
    selectedDateTime?.time || null
  );
  const datesScrollRef = useRef(null);

  // Get number of days in the current month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get month name
  const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  // Generate dates for current month
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  // Scroll dates left
  const scrollDatesLeft = () => {
    if (datesScrollRef.current) {
      datesScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll dates right
  const scrollDatesRight = () => {
    if (datesScrollRef.current) {
      datesScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
    // { time: "12.00", status: "Available" },
    // { time: "12.15", status: "Available" },
    // { time: "01.30", status: "Available" },
  ];

  const handleDateSelect = (day) => {
    const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(fullDate);
  };

  const handleTimeSelect = (time, status) => {
    if (status === "Available") {
      setSelectedTime(time);
    }
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  }, [selectedDate, selectedTime]);

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
        <IconButton onClick={handlePrevMonth} sx={{ color: "white" }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          sx={{
            mx: 4,
            fontSize: "20px",
            fontWeight: "bold",
            minWidth: 150,
            textAlign: "center",
          }}
        >
          {getMonthName(currentMonth)} {currentYear}
        </Typography>
        <IconButton onClick={handleNextMonth} sx={{ color: "white" }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Dates */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          mb: 4,
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={scrollDatesLeft}
          sx={{
            color: "white",
            minWidth: "40px",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={datesScrollRef}
          sx={{
            flex: 1,
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 2,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#33B2F7",
              borderRadius: "4px",
            },
          }}
        >
          {dates.map((day) => {
            const fullDate = `${currentYear}-${String(
              currentMonth + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            return (
              <Box
                key={day}
                onClick={() => handleDateSelect(day)}
                sx={{
                  minWidth: 60,
                  textAlign: "center",
                  py: 1.5,
                  px: 2,
                  bgcolor:
                    selectedDate === fullDate
                      ? "rgba(51, 178, 247, 0.3)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    selectedDate === fullDate
                      ? "2px solid #33B2F7"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": { bgcolor: "rgba(51, 178, 247, 0.2)" },
                }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  {String(day).padStart(2, "0")}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <IconButton
          onClick={scrollDatesRight}
          sx={{
            color: "white",
            minWidth: "40px",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
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
