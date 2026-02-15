import React, { useState, useRef, useEffect, useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

const PickDateTime = ({ onNext, selectedStation, selectedDateTime }) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    selectedDateTime?.date || null,
  );
  const [selectedTime, setSelectedTime] = useState(
    selectedDateTime?.time || null,
  );
  const [selectedDuration, setSelectedDuration] = useState(
    selectedDateTime?.duration || null,
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
  const [bookedCounts, setBookedCounts] = useState([]);

  useEffect(() => {
    if (!selectedStation || !selectedDate) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings-count`, {
          params: {
            station: selectedStation.name,
            booking_date: selectedDate,
          },
        });

        if (res.data.success) {
          setBookedCounts(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch booking counts", err);
      }
    };

    fetchBookings();
  }, [selectedStation, selectedDate]);

  const convertDurationToMinutes = (duration) => {
    if (!duration) return 0;

    const match = duration.match(/(?:(\d+)h)?\s*(?:(\d+)m)?/);
    const hours = match?.[1] ? parseInt(match[1]) : 0;
    const minutes = match?.[2] ? parseInt(match[2]) : 0;

    return hours * 60 + minutes;
  };

  const timeSlots = useMemo(() => {
    const slots = [];

    // Convert booking ranges into blocked times
    const blockedTimes = new Map();

    bookedCounts.forEach((booking) => {
      const start = new Date(`${selectedDate} ${booking.start_time}`);
      const durationMinutes =
        convertDurationToMinutes(booking.duration) +
        convertDurationToMinutes(booking.extended_time);

      const totalSlots = durationMinutes / 30;

      for (let i = 0; i < totalSlots; i++) {
        const slotTime = new Date(start.getTime() + i * 30 * 60000);

        const hour = slotTime.getHours();
        const minute = slotTime.getMinutes();
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? "AM" : "PM";

        const formatted =
          `${String(hour12).padStart(2, "0")}:` +
          `${String(minute).padStart(2, "0")} ${ampm}`;

        if (!blockedTimes.has(formatted)) {
          blockedTimes.set(formatted, []);
        }

        blockedTimes.get(formatted).push(booking.customer_name);
      }
    });

    // Generate slots
    for (let h = 12; h <= 23; h++) {
      for (let m of [0, 30]) {
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 ? "AM" : "PM";
        const displayTime =
          `${String(hour12).padStart(2, "0")}:` +
          `${String(m).padStart(2, "0")} ${ampm}`;

        const names = blockedTimes.get(displayTime) || [];

        slots.push({
          time: displayTime,
          status: names.length > 0 ? "Booked" : "Available",
          bookedNames: names,
        });
      }
    }

    return slots;
  }, [bookedCounts, selectedDate]);

  const durations = [];
  for (let min = 30; min <= 240; min += 30) {
    let label = "";
    let value = "";

    if (min < 60) {
      label = `${min} minutes`;
      value = `${min}m`;
    } else {
      const hours = Math.floor(min / 60);
      const minutes = min % 60;
      label =
        minutes === 0
          ? `${hours} hour${hours > 1 ? "s" : ""}`
          : `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
      value = minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
    }

    durations.push({ label, value });
  }

  const handleDateSelect = (day) => {
    const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(fullDate);
  };

  const handleTimeSelect = (time, status) => {
    if (status === "Available") {
      setSelectedTime(time);
    }
  };

  useEffect(() => {
    if (selectedDate && selectedTime && selectedDuration) {
      onNext({
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        durationMinutes: convertDurationToMinutes(selectedDuration),
      });
    }
  }, [selectedDate, selectedTime, selectedDuration]);

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
          fontSize: { xs: "18px", sm: "24px", md: "32px" },
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
          display: { xs: "grid", md: "flex" },
          gridTemplateColumns: { xs: "repeat(10, 1fr)", md: "none" },
          alignItems: { md: "center" },
          gap: { xs: 0.5, md: 2 },
          overflowX: { xs: "auto", md: "visible" },
          px: { xs: 1, md: 0 },
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#33B2F7",
            borderRadius: "4px",
          },
        }}
      >
        <IconButton
          onClick={scrollDatesLeft}
          sx={{
            display: { xs: "none", md: "flex" },
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
            display: { xs: "contents", md: "flex" },
            flex: { md: 1 },
            gap: { md: 2 },
            overflowX: { md: "auto" },
            pb: { md: 2 },
            scrollBehavior: { md: "smooth" },
            "&::-webkit-scrollbar": { height: "8px" },
            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#33B2F7",
              borderRadius: "4px",
            },
          }}
        >
          {dates.map((day) => {
            const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dateObj = new Date(fullDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = dateObj < today;

            return (
              <Box
                key={day}
                onClick={() => !isPast && handleDateSelect(day)}
                sx={{
                  textAlign: "center",
                  py: { xs: 0.8, md: 1.5 },
                  px: { xs: 0.5, md: 2 },
                  minWidth: { xs: "45px", md: "60px" },
                  bgcolor: isPast
                    ? "rgba(255,255,255,0.05)"
                    : selectedDate === fullDate
                      ? "rgba(51, 178, 247, 0.3)"
                      : "rgba(255,255,255,0.05)",
                  border: isPast
                    ? "1px solid rgba(255,255,255,0.05)"
                    : selectedDate === fullDate
                      ? "2px solid #33B2F7"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  cursor: isPast ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: !isPast ? "rgba(51, 178, 247, 0.2)" : undefined,
                  },
                  opacity: isPast ? 0.5 : 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "20px" },
                    fontWeight: "bold",
                  }}
                >
                  {String(day).padStart(2, "0")}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <IconButton
          onClick={scrollDatesRight}
          sx={{
            display: { xs: "none", md: "flex" },
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
          maxWidth: "1280px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: { xs: 0.5, sm: 0.5, md: 2 },
          overflowX: { xs: "auto", sm: "auto", md: "visible" },
          px: { xs: 1, sm: 1, md: 0 },
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#33B2F7",
            borderRadius: "4px",
          },
        }}
      >
        {timeSlots.map((slot, idx) => (
          <Box
            key={idx}
            onClick={() => handleTimeSelect(slot.time, slot.status)}
            sx={{
              textAlign: "center",
              py: { xs: 0.8, sm: 0.8, md: 1.2 },
              px: { xs: 0.3, sm: 0.3, md: 0.8 },
              minWidth: { xs: "55px", sm: "55px", md: "auto" },
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
              opacity: slot.status === "Booked" ? 0.8 : 1,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor:
                  slot.status === "Available"
                    ? "rgba(51, 178, 247, 0.2)"
                    : undefined,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "10px", md: "14px" },
                fontWeight: "bold",
                mb: 0.3,
              }}
            >
              {slot.time}
            </Typography>

            {slot.status === "Booked" && slot.bookedNames.length > 0 && (
              <Typography
                sx={{
                  fontSize: { xs: "8px", sm: "8px", md: "10px" },
                  color: "#fff",
                  mt: 0.2,
                }}
              >
                {slot.bookedNames.join(", ")}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: { xs: "8px", sm: "8px", md: "10px" },
                color: slot.status === "Booked" ? "#A905BC" : "#33B2F7",
                fontWeight: 500,
              }}
            >
              {slot.status}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Duration Selection */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          mt: 4,
          display: "flex",
          gap: 2,
          flexWrap: { xs: "nowrap", md: "wrap" },
          justifyContent: { xs: "flex-start", md: "center" },
          overflowX: { xs: "auto", md: "visible" },
          pb: { xs: 2, md: 0 },
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#33B2F7",
            borderRadius: "4px",
          },
        }}
      >
        {durations.map((dur) => (
          <Box
            key={dur.value}
            onClick={() => setSelectedDuration(dur.value)}
            sx={{
              px: { xs: 1.5, md: 3 },
              py: { xs: 0.8, md: 1.5 },
              minWidth: { xs: "auto", md: "fit-content" },
              borderRadius: "6px",
              cursor: "pointer",
              textAlign: "center",
              flexShrink: { xs: 0, md: "initial" },
              bgcolor:
                selectedDuration === dur.value
                  ? "rgba(51,178,247,0.3)"
                  : "rgba(255,255,255,0.05)",
              border:
                selectedDuration === dur.value
                  ? "2px solid #33B2F7"
                  : "1px solid rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(51,178,247,0.2)",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "11px", md: "16px" },
                whiteSpace: { xs: "nowrap", md: "normal" },
              }}
            >
              {dur.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PickDateTime;
