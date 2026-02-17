import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  IconButton,
  Checkbox,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import { API_BASE_URL } from "../apiConfig";
import axios from "axios";

// --- 1. Booking Details (Receipt) Modal ---
const BookingDetailsModal = ({ open, onClose, data, amount }) => {
  // Helper to render a single row
  const DetailRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
        {value ?? "-"}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0B0F19",
          color: "white",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          p: 2,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Booking Details
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Details List */}
      <Box sx={{ mb: 2 }}>
        <DetailRow
          label="Player Name"
          value={`${data.playerDetails?.[0]?.firstName || ""} ${
            data.playerDetails?.[0]?.lastName || ""
          }`}
        />
        <DetailRow
          label="Phone Number"
          value={data.playerDetails?.[0]?.contactNumber || "N/A"}
        />
        <DetailRow label="Station" value={data.station?.name || "N/A"} />
        <DetailRow label="Station Type" value={data.station?.type || "-"} />
        <DetailRow
          label="VR Play"
          value={data.playerDetails?.[0]?.vrPlay === "yes" ? "Yes" : "No"}
        />
        <DetailRow label="Date" value={data.date || "N/A"} />
        <DetailRow label="Start Time" value={data.startTime || "N/A"} />
        <DetailRow label="Duration" value={data.duration || "N/A"} />
      </Box>

      {/* Divider & Payment Total */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          pt: 2,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Payment :
        </Typography>
        <Typography variant="body1" fontWeight="bold" sx={{ color: "#A905BC" }}>
          LKR {data.amount?.toFixed(2) || "0.00"}
        </Typography>
      </Box>

      {/* Download Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#22C55E",
          color: "white",
          fontWeight: "bold",
          textTransform: "none",
          py: 1.5,
          borderRadius: "30px",
          "&:hover": { bgcolor: "#16A34A" },
        }}
        onClick={onClose}
      >
        Download Receipt
      </Button>
    </Dialog>
  );
};

// --- 3. Main Component ---
const PlayerInfo = ({
  selectedStation,
  selectedDateTime,
  onPlayerInfoChange,
  amount,
  onBookingSubmit,
}) => {
  const [formData, setFormData] = useState({
    players: 1,
    playerDetails: [
      { firstName: "", lastName: "", contactNumber: "", vrPlay: "yes" },
    ],
  });

  const showVRPlay =
    selectedStation?.pricing?.some((p) => p.vrPrice && p.vrPrice > 0) || false;
  // State to control Modals
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prev) => ({
        ...prev,
        playerDetails: [
          {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            contactNumber: user.phone || "",
            email: user.email || "",
            vrPlay: "yes",
          },
        ],
      }));
    }
  }, []);

  // Update number of players
  const handlePlayersChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setFormData((prev) => {
      const details = [...prev.playerDetails];
      while (details.length < newCount) {
        details.push({
          firstName: "",
          lastName: "",
          contactNumber: "",
          vrPlay: "yes",
        });
      }
      while (details.length > newCount) {
        details.pop();
      }
      return { ...prev, players: newCount, playerDetails: details };
    });
  };

  // Handle individual player input change
  const handlePlayerChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.playerDetails];
      updated[index][field] = value;
      return { ...prev, playerDetails: updated };
    });
  };

  const handlePaymentSuccess = async () => {
    try {
      const orderId = `ORDER_${Date.now()}`;
      const amountValue = amount.toFixed(2);

      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${API_BASE_URL}/api/payhere/hash`,
        {
          order_id: orderId,
          amount: amountValue,
          currency: "LKR",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { hash, merchant_id } = res.data;

      const payment = {
        sandbox: true,
        merchant_id,
        return_url: window.location.href,
        cancel_url: window.location.href,
        notify_url: `${API_BASE_URL}/api/payhere/notify`,
        order_id: orderId,
        items: "Gaming Session Booking",
        amount: amountValue,
        currency: "LKR",
        hash,
        first_name: formData.playerDetails[0]?.firstName || "N/A",
        last_name: formData.playerDetails[0]?.lastName || "N/A",
        email: formData.playerDetails[0].email || "N/A",
        phone: formData.playerDetails[0]?.contactNumber || "N/A",
        address: "N/A",
        city: "N/A",
        country: "Sri Lanka",
      };

      window.payhere.onCompleted = function (orderId) {
        console.log("Payment completed:", orderId);
        onBookingSubmit(orderId);
        setIsReceiptOpen(true);
      };

      window.payhere.onDismissed = function () {
        console.log("Payment dismissed");
        alert("Payment was cancelled.");
      };

      window.payhere.onError = function (error) {
        console.error("PayHere Error:", error);
        alert("Payment error occurred!");
      };

      window.payhere.startPayment(payment);
    } catch (err) {
      console.error("Failed to start payment:", err);
      alert("Failed to initiate payment.");
    }
  };

  useEffect(() => {
    if (onPlayerInfoChange) onPlayerInfoChange(formData);
  }, [formData, onPlayerInfoChange]);

  return (
    <Box sx={{ color: "white", mb: 8 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "18px", sm: "24px", md: "32px" },
          mb: 6,
        }}
      >
        Player Info
      </Typography>

      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              mb: 1,
              fontSize: { xs: "11px", sm: "14px" },
              color: "gray.400",
            }}
          >
            Number of Players
          </Typography>
          <FormControl fullWidth>
            <Select
              name="players"
              value={formData.players}
              onChange={handlePlayersChange}
              displayEmpty
              sx={{
                ...mainInputStyle,
                "& .MuiSelect-select": {
                  color: "white",
                  padding: { xs: "10px 12px", sm: "14px" },
                  fontSize: { xs: "12px", sm: "14px" },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(51, 178, 247, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#33B2F7",
                },
                bgcolor: "rgba(255,255,255,0.05)",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#0B0F19",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.1)",
                  },
                },
              }}
            >
              {[1, 2, 3, 4].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Player{num > 1 && "s"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Render Player Forms */}
        {formData.playerDetails.map((player, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 6,
              p: 3,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <Typography sx={{ mb: 2, fontWeight: "bold" }}>
              Player {idx + 1} {idx === 0 && "(Logged-in User)"}
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                placeholder="First Name"
                value={player.firstName}
                disabled={idx === 0}
                onChange={(e) =>
                  handlePlayerChange(idx, "firstName", e.target.value)
                }
                sx={mainInputStyle}
              />
              <TextField
                placeholder="Last Name"
                value={player.lastName}
                disabled={idx === 0}
                onChange={(e) =>
                  handlePlayerChange(idx, "lastName", e.target.value)
                }
                sx={mainInputStyle}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: showVRPlay ? "1fr 1fr" : "1fr",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                placeholder="Contact Number"
                value={player.contactNumber}
                disabled={idx === 0}
                onChange={(e) =>
                  handlePlayerChange(idx, "contactNumber", e.target.value)
                }
                sx={mainInputStyle}
              />

              {showVRPlay && (
                <Box 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "8px", sm: "10px" },
                      color: "gray.400",
                      mb: { xs: 0, sm: 0.5 },
                    }}
                  >
                    VR Play
                  </Typography>
                  <RadioGroup
                    row
                    value={player.vrPlay}
                    onChange={(e) =>
                      handlePlayerChange(idx, "vrPlay", e.target.value)
                    }
                    sx={{ 
                      gap: { xs: 0.2, sm: 2 },
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={
                        <Radio 
                          sx={{ 
                            color: "#33B2F7",
                            padding: { xs: "4px", sm: "9px" },
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: "18px", sm: "24px" },
                            },
                          }} 
                        />
                      }
                      label="Yes"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "12px", sm: "14px" },
                          color: "white",
                        },
                        margin: 0,
                      }}
                    />
                    <FormControlLabel
                      value="no"
                      control={
                        <Radio 
                          sx={{ 
                            color: "#33B2F7",
                            padding: { xs: "4px", sm: "9px" },
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: "18px", sm: "24px" },
                            },
                          }} 
                        />
                      }
                      label="No"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "12px", sm: "14px" },
                          color: "white",
                        },
                        margin: 0,
                      }}
                    />
                  </RadioGroup>
                </Box>
              )}
            </Box>
          </Box>
        ))}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            bgcolor: "rgba(255,255,255,0.1)",
            mb: 6,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                mb: 1,
                color: "white",
              }}
            >
              Amount
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #A905BC, #33B2F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LKR {amount}
            </Typography>
            <Button
              onClick={handlePaymentSuccess}
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
      </Box>

      <BookingDetailsModal
        open={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        data={{
          ...formData,
          station: selectedStation,
          date: selectedDateTime?.date,
          startTime: selectedDateTime?.time,
          duration: selectedDateTime?.duration,
          amount: amount,
        }}
      />
    </Box>
  );
};

// Helper for Styles
const mainInputStyle = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: { xs: "12px", sm: "14px" },
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(51, 178, 247, 0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#33B2F7" },
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
    padding: { xs: "10px 12px", sm: "14px" },
    fontSize: { xs: "12px", sm: "14px" },
  },
  "&.Mui-disabled": {
    borderColor: "rgba(55, 65, 81, 0.62)",
    backgroundColor: "rgba(41, 37, 75, 0.58)",
    cursor: "text",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#E5E7EB",
    opacity: 1,
    cursor: "text",
  },
};

// Helper Component for Radio Button visual
const CustomRadioOption = ({ value, label, currentValue, onClick }) => (
  <Box
    sx={{
      flex: 1,
      bgcolor:
        currentValue === value
          ? "rgba(51, 178, 247, 0.1)"
          : "rgba(255,255,255,0.05)",
      border:
        currentValue === value
          ? "1px solid #33B2F7"
          : "1px solid rgba(255,255,255,0.1)",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      py: { xs: 0.5, sm: 1 },
      "&:hover": {
        bgcolor: "rgba(51, 178, 247, 0.08)",
        borderColor: "rgba(51, 178, 247, 0.5)",
      },
    }}
    onClick={onClick}
  >
    <FormControlLabel
      value={value}
      control={
        <Radio
          size="small"
          sx={{
            color: "rgba(255,255,255,0.3)",
            "&.Mui-checked": { color: "#33B2F7" },
            "& .MuiSvgIcon-root": { fontSize: { xs: 16, sm: 24 } },
          }}
        />
      }
      label={label}
      sx={{
        color: "white",
        width: "100%",
        m: 0,
        ml: { xs: 0.5, sm: 1 },
        pointerEvents: "none",
        "& .MuiFormControlLabel-label": {
          fontSize: { xs: "12px", sm: "14px" },
        },
      }}
    />
  </Box>
);

export default PlayerInfo;
