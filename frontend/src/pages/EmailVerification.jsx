import { useEffect, useRef, useState } from "react";
import { Box, TextField, Typography, GlobalStyles } from "@mui/material";
import { styled } from "@mui/system";
import singup from "../assets/singup-img.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import backIcon from "../assets/back-icon.png";
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
  background: `
    repeating-linear-gradient(
      to right,
      #1a101c 0px,
      #1a101c 4px,
      #120a13 4px,
      #120a13 6px
    )
  `,

  /* ---------------- MOBILE ONLY ---------------- */
  [theme.breakpoints.down("sm")]: {
    maxWidth: "80%", // slightly smaller
    minHeight: "500px", // taller for mobile
    padding: "20px",
    overflow: "hidden",
    background: `url(${singup}) no-repeat center bottom`,
    backgroundSize: "contain",
  },
}));

/* ------------------------ FIXED LABEL TEXT FIELD ------------------------ */

const FixedLabelTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    border: "1px solid #3741519E",
    background: "#29254B94",
    borderRadius: "8px",
    backdropFilter: "blur(100px)",
    color: "#8E8D97",
    "& .MuiOutlinedInput-input": {
      padding: "8px 12px",
      fontSize: "16px",
      color: "white",
    },
    "& input::placeholder": {
      color: "rgba(255,255,255,0.7)",
      opacity: 1,
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

const EmailVerification = () => {
  // state to track if code sent already
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);

  // Get email from previous page
  const passedEmail = location.state?.email || "";

  useEffect(() => {
    if (passedEmail) {
      setEmail(passedEmail);
    }
  }, [passedEmail]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9a-zA-Z]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // New function to send verification code (initial and resend)
  const sendVerificationCode = async () => {
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/send-verification-code`, {
        email,
      });
      toast.success("Verification code sent! Check your email.");
      setCodeSent(true);
      setCode(Array(6).fill("")); // reset code input
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification code.",
      );
    }
  };
  // Adjust handleVerifyEmail to just verify the code if codeSent is true
  const handleVerifyEmail = async () => {
    if (!codeSent) {
      // send code on first click
      sendVerificationCode();
      return;
    }

    // verify code
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.warning("Enter full 6-digit code.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/verify-code`, {
        email,
        code: verificationCode,
      });
      const resetToken = res.data.reset_token;

      sessionStorage.setItem("reset_token", resetToken);
      sessionStorage.setItem("reset_email", email);

      toast.success("Email verified.");
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed.");
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
            password reset
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

          {/* Top Tab  */}
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
            onClick={handleVerifyEmail}
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
                Verify Code
              </text>
            </SvgBorder>
          </Box>

          {/* Content Wrapper */}
          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              pl: { xs: 0, sm: 2, md: 5 },
              pr: { xs: 0, sm: 2, md: 0 },
            }}
          >
            {/* ----- FORM ----- */}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "80%", md: "550px" },
                maxWidth: { xs: "280px", sm: "none" }, // mobile max width
                gap: 2,
                zIndex: 2,
                p: { xs: 1.5, sm: 3 }, // mobile padding
                mx: { xs: "auto", md: 0 }, // center form on mobile
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  cursor: "pointer",
                  mb: 0.5,
                }}
              >
                <Box
                  onClick={() => navigate("/sign-in")}
                  component="img"
                  src={backIcon}
                  alt="back-icon"
                  sx={{
                    width: 22,
                  }}
                />

                <Typography
                  sx={{
                    color: "white",
                    fontSize: "32px",
                    fontWeight: 700,
                  }}
                >
                  Reset Password
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: "16px" }}>
                  E mail
                </Typography>
                <Box sx={{ position: "relative", width: "100%" }}>
                  <FixedLabelTextField
                    name="email"
                    placeholder="Enter your email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={codeSent}
                  />
                  <Box
                    onClick={!email ? null : sendVerificationCode}
                    sx={{
                      position: "absolute",
                      right: "-150px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      cursor: email ? "pointer" : "not-allowed",
                      background: email
                        ? "linear-gradient(90deg, #CF36E1, #D100FF, #33B2F7)"
                        : "#555",
                      opacity: email ? 1 : 0.4,
                      transition: "0.3s",
                      width: "80px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Send
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ color: "white", mb: 0.5, fontSize: "16px" }}>
                  Verification Code
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1, sm: 2 }, // smaller gap on mobile
                    justifyContent: "center", // center inputs on mobile
                    flexWrap: "nowrap", // wrap if screen is too small
                  }}
                >
                  {code.map((digit, index) => (
                    <FixedLabelTextField
                      key={index}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: { xs: "18px", sm: "22px" }, // smaller font on mobile
                          color: "white",
                          padding: { xs: "6px 8px", sm: "8px 12px" }, // adjust padding for mobile
                        },
                      }}
                      value={digit}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      sx={{
                        width: { xs: "40px", sm: "80px" }, // smaller width on mobile
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* Resend code */}
                <Typography sx={{ color: "white", fontSize: "12px" }}>
                  Didn’t have a code.?
                  <Box
                    component="span"
                    onClick={sendVerificationCode}
                    sx={{
                      ml: 1,
                      backgroundImage:
                        "linear-gradient(90deg, #CF36E1, #D100FF, #33B2F7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Resend
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Frame>

        {/* ----- USER IMAGE ----- */}
        <Box
          component="img"
          src={singup}
          alt="Character"
          sx={{
            position: "absolute",
            bottom: { xs: -10, sm: -20 },
            right: { xs: "50%", sm: 20 },
            transform: { xs: "translateX(50%) scaleX(-1)", sm: "scaleX(-1)" },
            width: { xs: 0, sm: 280, md: 380, lg: 430 }, // hidden on mobile
            opacity: { xs: 0, sm: 1 }, // hidden on mobile
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      </Box>
    </>
  );
};

export default EmailVerification;
