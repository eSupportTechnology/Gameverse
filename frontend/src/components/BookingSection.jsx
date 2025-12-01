import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, styled } from "@mui/material";

const GradientButton = styled(Button)(({ theme }) => ({
  position: "relative",
  padding: "12px 28px",
  borderRadius: "30px",
  fontWeight: "bold",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  color: "#fff",
  background: "linear-gradient(to right, #33B2F7, #A905BC)",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "30px",
    padding: "2px",
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
    "&::before": {
      background: "linear-gradient(to right, #33B2F7, #A905BC)",
    },
  },
}));


const BookingSection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{
          bgcolor: "#0A0D17",
          py: { xs: 2, sm: 2 },
          textAlign: "center",
          border: "none",
        }}
      >
        {/* Gradient Text */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #9b5de5, #00bbf9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3,
          }}
        >
          Your seat is waiting — Book Now and Game On!
        </Typography>

        <GradientButton onClick={() => navigate('/booking')}>Booking Now</GradientButton>

      </Box>
    </div>
  )
}

export default BookingSection
