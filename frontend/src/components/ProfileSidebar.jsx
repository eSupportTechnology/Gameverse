import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import personalIcon from "../assets/personal.png";
import securityIcon from "../assets/security.png";
import paymentIcon from "../assets/payment.png";
import bookingIcon from "../assets/booking.png";

const menu = [
  { key: "personal", label: "Personal Information", icon: personalIcon },
  { key: "security", label: "Sign-in & Security", icon: securityIcon },
  { key: "payment", label: "Payment Methods", icon: paymentIcon },
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
        px: { xs: 3, md: 8 }, // page margins (left & right)
        py: 1,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "300px 1px 1fr",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        {/*  LEFT SIDEBAR */}
        <Box sx={{ pr: 2 }}>
          <Typography sx={{ color: "#fff", fontSize: 24, mb: 4 }}>
            My Profile
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                mr: 2,
                backgroundColor: "#F1F1F1",
                color: "#1A1A1A",
              }}
            >
              {getInitials(user?.firstName, user?.lastName)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
              </Typography>
              <Typography sx={{ color: "#9CA3AF", fontSize: 14 }}>
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
                startIcon={<Box component="img" src={item.icon} />}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  px: 2,
                  py: 1.1,
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

        {/* VERTICAL DIVIDER */}
        <Box
          sx={{
            width: "1px",
            height: "610px",
            background: "#374151",
          }}
        />

        {/* RIGHT CONTENT */}
        <Box>{/* Render your right-side components where this is used */}</Box>
      </Box>
    </Box>
  );
}
