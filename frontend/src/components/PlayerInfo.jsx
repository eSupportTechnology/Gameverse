import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PlayerInfo = ({ selectedStation, selectedDateTime }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    vrPlay: "yes",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle booking submission
    console.log("Booking data:", {
      ...formData,
      station: selectedStation,
      dateTime: selectedDateTime,
    });
    // You can add API call here to submit the booking
  };

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
        Player Info
      </Typography>

      {/* Form */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Name Fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 4,
          }}
        >
          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px", color: "gray.400" }}>
              First Name
            </Typography>
            <TextField
              fullWidth
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(51, 178, 247, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#33B2F7",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px", color: "gray.400" }}>
              Last Name
            </Typography>
            <TextField
              fullWidth
              name="lastName"
              placeholder="Enter your second name"
              value={formData.lastName}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(51, 178, 247, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#33B2F7",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>

        {/* Contact and VR Play */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 6,
          }}
        >
          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px", color: "gray.400" }}>
              Contact Number
            </Typography>
            <TextField
              fullWidth
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(51, 178, 247, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#33B2F7",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontSize: "14px", color: "gray.400" }}>
              VR Play
            </Typography>
            <RadioGroup
              row
              name="vrPlay"
              value={formData.vrPlay}
              onChange={handleChange}
              sx={{ gap: 2, height: "56px" }}
            >
              <Box
                sx={{
                  flex: 1,
                  bgcolor: formData.vrPlay === "yes" ? "rgba(51, 178, 247, 0.1)" : "rgba(255,255,255,0.05)",
                  border: formData.vrPlay === "yes" ? "1px solid #33B2F7" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(51, 178, 247, 0.08)",
                    borderColor: "rgba(51, 178, 247, 0.5)",
                  },
                }}
                onClick={() => setFormData({ ...formData, vrPlay: "yes" })}
              >
                <FormControlLabel
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        color: "rgba(255,255,255,0.3)",
                        "&.Mui-checked": {
                          color: "#33B2F7",
                        },
                      }}
                    />
                  }
                  label="Yes"
                  sx={{ 
                    color: "white",
                    width: "100%",
                    m: 0,
                    ml: 1,
                    pointerEvents: "none",
                  }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: formData.vrPlay === "no" ? "rgba(51, 178, 247, 0.1)" : "rgba(255,255,255,0.05)",
                  border: formData.vrPlay === "no" ? "1px solid #33B2F7" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(51, 178, 247, 0.08)",
                    borderColor: "rgba(51, 178, 247, 0.5)",
                  },
                }}
                onClick={() => setFormData({ ...formData, vrPlay: "no" })}
              >
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      sx={{
                        color: "rgba(255,255,255,0.3)",
                        "&.Mui-checked": {
                          color: "#33B2F7",
                        },
                      }}
                    />
                  }
                  label="No"
                  sx={{ 
                    color: "white",
                    width: "100%",
                    m: 0,
                    ml: 1,
                    pointerEvents: "none",
                  }}
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            bgcolor: "rgba(255,255,255,0.1)",
            mb: 6,
          }}
        />

        {/* Amount and Booking Button */}
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
            <Typography sx={{ fontSize: "25px", fontWeight: "bold", mb: 1, color: "white" }}>
              Amount
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
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
              LKR 000
            </Typography>
            <Button
              onClick={handleSubmit}
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
    </Box>
  );
};

export default PlayerInfo;
