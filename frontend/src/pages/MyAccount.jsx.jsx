import { Box } from "@mui/material";
import { useState } from "react";
import BookingDetails from "../components/BookingDetails";
import PaymentMethods from "../components/PaymentMethods";
import PersonalInfo from "../components/PersonalInfo";
import ProfileSidebar from "../components/ProfileSidebar";
import Security from "../components/Security";
import GiftsRewards from "../components/GiftsRewards";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "security":
        return <Security />;
      // case "payment":
      //   return <PaymentMethods />;
      case "booking":
        return <BookingDetails />;
      case "gifts":
        return <GiftsRewards />;
      case "personal":
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B0F1A, #111827, #020617)",
        px: { xs: 2, md: 8 },
        py: 5,
        pb: 6,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 6,
        }}
      >
        {/* LEFT SIDEBAR */}
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* RIGHT CONTENT */}
        <Box>{renderContent()}</Box>
      </Box>
    </Box>
  );
}
