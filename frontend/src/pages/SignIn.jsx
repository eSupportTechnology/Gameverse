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

/* ------------------------ FRAME BACKGROUND ------------------------ */

const Frame = styled(Box)({
  maxWidth: "900px",
  width: "100%",
  minHeight: "400px",
  margin: "auto",
  position: "relative",
  padding: "40px",
  borderRadius: "20px",

  background: `
    repeating-linear-gradient(
      to right,
      #1a101c 0px,
      #1a101c 4px,
      #120a13 4px,
      #120a13 6px
    )
  `,
});

/* ------------------------ FIXED LABEL TEXT FIELD ------------------------ */

const FixedLabelTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    background: "#29254B94",
    backdropFilter: "blur(16px)",
    borderRadius: "8px",
    color: "#fff",
    border: "1px solid #3741519E",

    "&:hover": {
      borderColor: "#ff00ff",
    },

    "& fieldset": {
      border: "none",
    },

    "& .MuiOutlinedInput-input": {
      padding: "14px 14px",
      fontSize: "15px",
    },
  },
});

/* ------------------------ SVG BORDER ------------------------ */

const SvgBorder = styled("svg")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

const borderPath = `
M 24 0
H 650
L 665 40
H 770
L 785 0
H 826
A 24 24 0 0 1 850 24
V 426
A 24 24 0 0 1 826 450
H 360
L 320 410
H 130
L 90 450
H 24
A 24 24 0 0 1 0 426
V 24
A 24 24 0 0 1 24 0
Z
`;

const boldPath = `
  M215 0 H650 
  M785 0 H826         
  A24 24 0 0 1 850 24
  V426
  A24 24 0 0 1 826 450
  M826 450 H360
  M90 450 H24
  A24 24 0 0 1 0 426
  V24
  A24 24 0 0 1 24 0
  M24 0 H215
  Z
`;

/* ------------------------ SIGN-IN COMPONENT ------------------------ */

const SignIn = () => {
  // const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      const userData = {
        id: res.data.user.id,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        token: res.data.token,
      };

      toast.success("Login successful!");

      // after saving:
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // notify other components in same tab
      window.dispatchEvent(new Event("userUpdated"));

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/Brushstrike.ttf") format("truetype")`,
          },
        }}
      />

      {/* Background */}
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
            left: "20%",
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
              fontSize: { xs: "32px", sm: "40px", md: "50px" },
            }}
          >
            Sign In
          </Typography>
        </Box>

        {/* Main Frame */}
        <Frame>
          {/* SVG border */}
          <SvgBorder viewBox="0 0 850 450" preserveAspectRatio="none">
            <path d={borderPath} stroke="#ff00ff" strokeWidth="2" fill="none" />
            <path d={boldPath} stroke="#ff00ff" strokeWidth="10" fill="none" />

            {/* Bottom glow */}
            <path
              d="M550 450 H826"
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

          {/* Top Tab */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: { xs: 10, sm: 20, md: 95 },
              width: 150,
              height: 70,
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
                d="M150 0 H30 L40 30 L140 30 Z"
                stroke="#ff00ff"
                strokeWidth="2"
                fill="rgba(255,255,255,0.05)"
              />
              <path d="M150 0 H30" stroke="#ff00ff" strokeWidth="10" />
            </SvgBorder>
          </Box>

          {/* Bottom Button */}
          <Box
            onClick={handleLogin}
            sx={{
              position: "absolute",
              bottom: -8,
              left: { xs: 10, sm: 20, md: 115 },
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
                <linearGradient id="signin" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B210C1" />
                  <stop offset="100%" stopColor="#0F0F18" />
                </linearGradient>
              </defs>

              <path
                d="M10 60 L40 30 L250 30 L280 60 Z"
                fill={"url(#signin)"}
                stroke="#ff00ff"
                strokeWidth="3"
                style={{ cursor: "pointer" }}
              />

              <text
                x="150"
                y="45"
                fill="#FFFFFF"
                fontSize="18"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                Sign In
              </text>
            </SvgBorder>
          </Box>

          {/* Content Wrapper */}
          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" }, // MIRRORED
              alignItems: "center",
              pl: { xs: 0, sm: 2, md: 5 }, // MIRRORED
              pr: { xs: 0, sm: 2, md: 0 },
            }}
          >
            {/* ----- FORM ----- */}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", sm: "80%", md: "550px" },
                gap: 2,
                zIndex: 2,
                p: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  mb: 0.5,
                  fontSize: "32px",
                  fontWeight: 700,
                }}
              >
                Welcome Back
              </Typography>
              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: "16px" }}>
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

              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: "16px" }}>
                  Password
                </Typography>
                <FixedLabelTextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Link to Sign Up */}
                <Typography sx={{ color: "white", fontSize: "12px" }}>
                  Didn't have a account.?
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      backgroundImage:
                        "linear-gradient(90deg, #CF36E1, #D100FF, #33B2F7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/sing-up")}
                  >
                    Sign Up
                  </Box>
                </Typography>

                {/* Reset password */}
                <Typography sx={{ color: "white", fontSize: "12px" }}>
                  Forget Password?
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      backgroundImage:
                        "linear-gradient(90deg, #CF36E1, #D100FF, #33B2F7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate("/email-verify", {
                        state: { email: formData.email },
                      })
                    }
                  >
                    Reset
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Frame>

        {/* ----- USER IMAGE----- */}
        <Box
          component="img"
          src={singup}
          alt="Character"
          sx={{
            position: "absolute",
            bottom: { xs: -10, sm: -20 },
            right: { xs: "50%", sm: 20 },
            transform: { xs: "translateX(-50%) scaleX(-1)", sm: "scaleX(-1)" },
            width: { xs: 220, sm: 280, md: 380, lg: 430 },
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      </Box>
    </>
  );
};

export default SignIn;
