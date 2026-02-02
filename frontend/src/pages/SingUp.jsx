import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  GlobalStyles,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/system";
import singup from "../assets/singup-img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";

const Frame = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  width: "100%",
  minHeight: "400px",
  margin: "auto",
  position: "relative",
  padding: "40px",
  borderRadius: "20px",
  background: `repeating-linear-gradient(
    to right,
    #1a101c 0px,
    #1a101c 4px,
    #120a13 4px,
    #120a13 6px
  )`,

  /* -------- MOBILE ONLY -------- */
  [theme.breakpoints.down("sm")]: {
    maxWidth: "80%", // narrower for mobile
    minHeight: "500px", // taller for mobile
    padding: "20px",
    overflow: "hidden",
    background: `url(${singup}) no-repeat center bottom`,
    backgroundSize: "contain",
  },
}));

const SvgBorder = styled("svg")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

const FixedLabelTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    border: "1px solid #3741519E",
    background: "#29254B94",
    borderRadius: "8px",
    backdropFilter: "blur(100px)",
    color: "#8E8D97",
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px",
      fontSize: "16px",
      color: "white",
      [theme.breakpoints.down("sm")]: {
        padding: "8px 10px",
        fontSize: "12px",
      },
    },
    "& input::placeholder": {
      color: "rgba(255,255,255,0.7)",
      opacity: 1,
    },
  },
}));

const borderPath = `
M 24 0
H 80
L 95 40
H 200
L 215 0
H 826
A 24 24 0 0 1 850 24
V 426
A 24 24 0 0 1 826 450
H 750
L 710 410
H 520
L 480 450
H 24
A 24 24 0 0 1 0 426
V 24
A 24 24 0 0 1 24 0
Z
`;

const boldPath = `
  M215 0 H826          
  A24 24 0 0 1 850 24
  V426
  A24 24 0 0 1 826 450
  M826 450 H748
  M482 450 H24
  A24 24 0 0 1 0 426
  V24
  A24 24 0 0 1 24 0
  M24 0 H80
  Z
`;

const SingUp = () => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration successful! Please sign in.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/sing-in");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <>
      {/* Global font registration */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/Brushstrike.ttf") format("truetype")`,
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />

      <Box
        sx={{
          height: "100%",
          minHeight: "100vh",
          pt: 5,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0A0D17",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "10%",
            width: { xs: "500px", sm: "650px", md: "800px" },
            height: { xs: "500px", sm: "650px", md: "800px" },
            background:
              "radial-gradient(circle, rgba(51, 178, 247, 0.73), rgba(84, 14, 92, 0.6), transparent 50%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(120px)",
            zIndex: 0,
          },
        }}
      >
        {/* Title */}
        <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              fontFamily: "BRUSHSTRIKE",
              letterSpacing: "0.03em",
              backgroundImage:
                "linear-gradient(90deg, #CF36E1 0%, #D100FF 35%, #33B2F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              fontSize: { xs: "24px", sm: "40px", md: "50px" },
            }}
          >
            Sign Up
          </Typography>
        </Box>

        {/* Frame */}
        <Frame>
          <SvgBorder viewBox="0 0 850 450" preserveAspectRatio="none">
            <path d={borderPath} stroke="#ff00ff" strokeWidth="2" fill="none" />
            <path d={boldPath} stroke="#ff00ff" strokeWidth="10" fill="none" />
            <path
              d="M24 450 H300"
              stroke="#ff00ff"
              strokeWidth="6"
              fill="none"
              style={{
                filter:
                  "drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #ff00ff) drop-shadow(0 0 8px #ff00ff)",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </SvgBorder>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: { xs: 10, sm: 20, md: 110 },
              width: 150, // Add width
              height: 70, // Add height
              zIndex: 5,
            }}
          >
            <SvgBorder
              width="100%"
              height="100%"
              viewBox="0 0 150 70"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0 H120 L110 30 L10 30 Z"
                stroke="#ff00ff"
                strokeWidth="2"
                fill="rgba(255,255,255,0.05)"
              />
              <path
                d="M0 0 H120"
                stroke="#ff00ff"
                strokeWidth="10"
                fill="none"
              />
            </SvgBorder>
          </Box>

          <Box
            onClick={handleSubmit}
            sx={{
              position: "absolute",
              bottom: -8,
              right: { xs: 10, sm: 20, md: 115 },
              width: 300,
              height: 70,
              zIndex: 5,
              cursor: "pointer",
            }}
          >
            <SvgBorder
              width="100%"
              height="100%"
              viewBox="0 0 300 70"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="signupGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#B210C1" />
                  <stop offset="100%" stopColor="#0F0F18" />
                </linearGradient>

                <linearGradient
                  id="hoverGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0F0F18" />
                  <stop offset="100%" stopColor="#B210C1" />
                </linearGradient>
              </defs>

              {/* MAIN BUTTON SHAPE */}
              <path
                d="M10 60 L40 30 L250 30 L280 60 Z"
                fill={isHover ? "url(#hoverGradient)" : "url(#signupGradient)"}
                stroke="#ff00ff"
                strokeWidth="3"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{ cursor: "pointer", transition: "0.3s ease" }}
              />

              {/* Text */}
              <text
                x="150"
                y="45"
                fill="#FFFFFF"
                fontSize="18"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ pointerEvents: "none" }}
              >
                Sign Up
              </text>

              {/* Bottom border */}
              <path
                d="M10 60 L280 60"
                stroke="#ff00ff"
                strokeWidth="4"
                fill="none"
              />
            </SvgBorder>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
              pr: { xs: 0, sm: 2, md: 5 },
              pl: { xs: 0, sm: 2, md: 0 },
            }}
          >
            {/* Form */}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", sm: "80%", md: "550px" },
                gap: { xs: 1.5, sm: 2 },
                zIndex: 2,
                p: { xs: 1, sm: 3 },
                pt: { xs: 4, sm: 3 },
              }}
            >
              {/* Name Fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ color: "white", mb: 0.5, fontSize: { xs: "11px", sm: "14px" } }}
                  >
                    First Name
                  </Typography>
                  <FixedLabelTextField
                    name="firstName"
                    placeholder="Enter your first name"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ color: "white", mb: 0.5, fontSize: { xs: "11px", sm: "14px" } }}
                  >
                    Last Name
                  </Typography>
                  <FixedLabelTextField
                    name="lastName"
                    placeholder="Enter your last name"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Box>
              </Box>

              {/* Email */}
              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: { xs: "11px", sm: "14px" } }}>
                  E mail
                </Typography>
                <FixedLabelTextField
                  name="email"
                  placeholder="Enter your email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              {/* Password */}
              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: { xs: "11px", sm: "14px" } }}>
                  Password
                </Typography>
                <FixedLabelTextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: "#868A93" }}
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {/* Correct behavior */}
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: { xs: "11px", sm: "14px" } }}>
                  Confirm Password
                </Typography>
                <FixedLabelTextField
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: "#868A93" }}
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Sign In Link */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-start",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                p: 1,
                borderRadius: "8px",
              }}>
                <Typography sx={{ 
                  color: "white", 
                  fontSize: { xs: "9px", sm: "12px" },
                  fontWeight: 500,
                }}>
                  Do you have an account?{" "}
                  <Box
                    component="span"
                    sx={{
                      backgroundImage:
                        "linear-gradient(90deg, #CF36E1 0%, #D100FF 35%, #33B2F7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/sing-in")}
                  >
                    Sign In
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Frame>

        {/* User image bottom-left */}
        <Box
          component="img"
          src={singup}
          alt="User"
          sx={{
            position: "absolute",
            bottom: { xs: -10, sm: -20 },
            left: { xs: "50%", sm: 20 },
            transform: { xs: "translateX(-50%)", sm: "none" }, // hide on mobile
            width: { xs: 0, sm: 280, md: 380, lg: 430 }, // hide on mobile
            opacity: { xs: 0, sm: 1 }, // hide on mobile
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      </Box>
    </>
  );
};

export default SingUp;
