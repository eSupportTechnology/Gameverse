import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import personalIcon from "../assets/personal.png";
import securityIcon from "../assets/security.png";
// import paymentIcon from "../assets/payment.png";
import bookingIcon from "../assets/booking.png";
import giftIcon from "../assets/giftIcon.png";

const menu = [
  { key: "personal", label: "Personal Information", icon: personalIcon },
  { key: "security", label: "Sign-in & Security", icon: securityIcon },
  { key: "gifts", label: "Gifts & Rewards", icon: giftIcon },
  { key: "booking", label: "Booking Details", icon: bookingIcon },
];

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      setUser(stored);
    } catch (e) {
      setUser(null);
    }

    // Listen for user updates in other tabs
    const onStorage = (e) => {
      if (e.key === "user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", onStorage);

    // In-tab event for updates
    const onUserUpdated = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("userUpdated", onUserUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userUpdated", onUserUpdated);
    };
  }, []);

  const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0)?.toUpperCase() || "";
    const l = lastName?.charAt(0)?.toUpperCase() || "";
    return f + l || "U";
  };

  return (
    <Box
      sx={{
        px: { xs: 0, md: 0 },
        py: 1,
        minHeight: { xs: "auto", md: "100vh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 6 },
          alignItems: "flex-start",
        }}
      >
        {/*  LEFT SIDEBAR */}
        <Box sx={{ pr: { xs: 0, md: 2 }, width: "100%" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: 20, md: 24 },
              mb: { xs: 2, md: 4 },
            }}
          >
            My Profile
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={user?.profileImage}
              sx={{
                width: { xs: 56, md: 72 },
                height: { xs: 56, md: 72 },
                mr: 2,
                backgroundColor: "#F1F1F1",
                color: "#1A1A1A",
              }}
            >
              {!user?.profileImage &&
                getInitials(user?.firstName, user?.lastName)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
              </Typography>
              <Typography
                sx={{ color: "#9CA3AF", fontSize: { xs: 12, md: 14 } }}
              >
                {user?.email || "guest@example.com"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
            {menu.map((item) => (
              <Button
                key={item.key}
                fullWidth
                onClick={() => setActiveTab(item.key)}
                startIcon={
                  <Box
                    component="img"
                    src={item.icon}
                    sx={{
                      width: { xs: 18, md: 24 },
                      height: { xs: 18, md: 24 },
                    }}
                  />
                }
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  px: { xs: 1.5, md: 2 },
                  py: { xs: 0.8, md: 1.1 },
                  fontSize: { xs: 12, md: 14 },
                  border: "1px solid #5a5f68ff",
                  color: "#ebe7e5ff",
                  background:
                    activeTab === item.key
                      ? "linear-gradient(90deg, #13373e 0%, #1a0237 100%)"
                      : "#2D333D",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #13373e 0%, #1a0237 100%)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
