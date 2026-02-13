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

// --- 1. Booking Details (Receipt) Modal ---
const BookingDetailsModal = ({ open, onClose, data }) => {
  // Helper to render a single row
  const DetailRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs" // Narrower width for the receipt
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
          value={`${data.firstName} ${data.lastName}`}
        />
        <DetailRow
          label="Phone Number"
          value={data.contactNumber || "071 3226865"}
        />
        <DetailRow label="Station" value={data.station || "PS5 Station 1"} />
        <DetailRow
          label="VR Play"
          value={data.vrPlay === "yes" ? "Yes" : "No"}
        />
        <DetailRow label="Date" value="11/08/2025" />
        <DetailRow label="Start Time" value="12.00 pm" />
        <DetailRow label="Duration" value="02h 00min" />
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
          LKR 845.00
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

// --- 2. Checkout Modal ---
const CheckoutModal = ({ open, onClose, onPaySuccess, amount }) => {
  // Local state for payment inputs to handle validation
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  // Handler for Card Number (Numbers only)
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    // Regex: Only allows digits (0-9)
    if (/^\d*$/.test(value)) {
      setCardDetails({ ...cardDetails, cardNumber: value });
    }
  };

  // Handler for Expiry Date (Numbers and '/' only)
  const handleExpiryChange = (e) => {
    const value = e.target.value;
    // Regex: Only allows digits and forward slash
    if (/^[0-9/]*$/.test(value)) {
      setCardDetails({ ...cardDetails, expiry: value });
    }
  };

  // Handler for CVC (Numbers only - Optional update for consistency)
  const handleCvcChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCardDetails({ ...cardDetails, cvc: value });
    }
  };

  // Handler for Name (Letters and spaces only)
  const handleNameChange = (e) => {
    const value = e.target.value;
    // Regex: Only allows letters (a-z, A-Z) and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardDetails({ ...cardDetails, name: value });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0B0F19",
          color: "white",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      }}
    >
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Checkout Details
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "gray" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">Total:</Typography>
            <Typography variant="body2" fontWeight="bold">
              LKR {amount || "845.00"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">Discount</Typography>
            <Typography variant="body2" color="gray">
              ...........
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 1,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Balance:
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#A905BC" }}
            >
              LKR {amount || "845.00"}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="gray"
          display="block"
          sx={{ mb: 1 }}
        >
          All transactions are secure and encrypted.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "gray",
                "&.Mui-checked": { color: "#A905BC" },
                padding: "4px 9px",
              }}
            />
          }
          label={
            <Typography variant="caption" color="gray">
              Add default payment method
            </Typography>
          }
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            p: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="caption"
            color="gray"
            sx={{ mb: 1, display: "block" }}
          >
            Credit Card
          </Typography>

          {/* Card Number Input */}
          <TextField
            fullWidth
            placeholder="Card Number"
            size="small"
            value={cardDetails.cardNumber}
            onChange={handleCardNumberChange}
            sx={modalInputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#EB001B",
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#F79E1B",
                        ml: -1,
                      }}
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {/* Expiration Date Input */}
            <TextField
              placeholder="Expiration Date (MM/YY)"
              size="small"
              fullWidth
              value={cardDetails.expiry}
              onChange={handleExpiryChange}
              inputProps={{ maxLength: 5 }} // Optional: limits length to 5 chars
              sx={modalInputStyle}
            />
            {/* CVC Input */}
            <TextField
              placeholder="Security Code"
              size="small"
              fullWidth
              value={cardDetails.cvc}
              onChange={handleCvcChange}
              sx={modalInputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon sx={{ fontSize: 16, color: "gray" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Name on Card Input */}
          <TextField
            fullWidth
            placeholder="Name on card"
            size="small"
            value={cardDetails.name}
            onChange={handleNameChange}
            sx={{ ...modalInputStyle, mt: 2 }}
          />
        </Box>

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
          onClick={onPaySuccess}
        >
          Pay Now
        </Button>
      </Box>
    </Dialog>
  );
};

const modalInputStyle = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(0,0,0,0.2)",
    color: "white",
    fontSize: "13px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#A905BC" },
  },
  "& .MuiOutlinedInput-input": { padding: "10px 14px" },
};

// --- 3. Main Component ---
const PlayerInfo = ({
  selectedStation,
  selectedDateTime,
  onPlayerInfoChange,
}) => {
  const [formData, setFormData] = useState({
    players: 1,
    playerDetails: [
      { firstName: "", lastName: "", contactNumber: "", vrPlay: "yes" },
    ],
  });

  const showVRPlay = selectedStation?.vrPrice && selectedStation?.vrTime;
  // State to control Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false); // Close checkout
    setIsReceiptOpen(true); // Open receipt
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
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "8px", sm: "10px" },
                      color: "gray.400",
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
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio sx={{ color: "#33B2F7" }} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio sx={{ color: "#33B2F7" }} />}
                      label="No"
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

        {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 3 }}>
          <Box><Typography sx={{ fontSize: "25px", fontWeight: "bold", mb: 1, color: "white" }}>Amount</Typography></Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold", background: "linear-gradient(to right, #A905BC, #33B2F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              LKR 000.00
            </Typography>
            <Button
              onClick={handleBookingClick}
              sx={{
                px: 8, py: 1.8, borderRadius: "30px", fontWeight: "bold", fontSize: "18px", textTransform: "none", color: "#fff",
                background: "linear-gradient(to right, #33B2F7, #A905BC)", boxShadow: "0 4px 15px rgba(51, 178, 247, 0.4)",
                "&:hover": { background: "linear-gradient(to right, #A905BC, #33B2F7)", boxShadow: "0 6px 20px rgba(169, 5, 188, 0.5)" },
              }}
            >
              Booking Session
            </Button>
          </Box>
        </Box> */}
      </Box>

      {/* Modals */}
      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaySuccess={handlePaymentSuccess}
        amount="845.00"
      />

      <BookingDetailsModal
        open={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        data={{
          ...formData,
          station: selectedStation,
          // You can pass real date/time props here if available
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
