import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  GlobalStyles,
} from "@mui/material";
import axios from "axios";
import astronaut from "../assets/astronaut.png";
import BookingSection from "../components/BookingSection";
import { API_BASE_URL } from "../apiConfig";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  //Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submit function
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      alert(res.data.message);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to send message");
    }
  };

  return (
    <>
      {/* font-face */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
          },
        }}
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #06080F, #0A0D17)",
          pt: 3,
          pb: 1,
          px: { xs: 2, sm: 4, md: 20 },
          color: "#fff",
        }}
      >
        {/* PAGE TITLE */}
        <Typography
          sx={{
            fontSize: { xs: "36px", sm: "50px", md: "70px" },
            fontFamily: "BRUSHSTRIKE",
            textAlign: "center",
            background: "linear-gradient(to right, #CF36E1, #15A2EF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CONTACT US
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: 4,
            fontSize: "14px",
          }}
        >
          Any question or remarks? Just write us a message!
        </Typography>

        {/* ====== MAIN GLASS CARD (2 columns) ====== */}
        <Box
          sx={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: { xs: "16px", md: "22px" },
            backdropFilter: "blur(15px)",
            border: "1px solid #000000",
            p: { xs: 2, sm: 3, md: 5 },
          }}
        >
          <Grid container columnSpacing={{ xs: 4, md: 8 }} rowSpacing={{ xs: 4, md: 10 }}>
            {/* LEFT COLUMN — FORM */}
            <Grid
              item
              xs={12}
              md={5}
              p={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
                order: { xs: 2, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Let’s connect
              </Typography>

              <Typography
                sx={{
                  color: "#cfcfcf",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 3,
                }}
              >
                Drop us a message and unlock the next level of <br />{" "}
                collaboration in our gaming universe.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <TextField
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: {
                      background: "linear-gradient( rgba(255,255,255,0.05))",
                      border: "1px solid #FFFFFF33",
                      borderRadius: "5px",
                      color: "#ffffff99",
                      height: "42px",
                    },
                  }}
                />

                <TextField
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: {
                      background: "linear-gradient( rgba(255,255,255,0.05))",
                      border: "1px solid #FFFFFF33",
                      borderRadius: "5px",
                      color: "#ffffff99",
                      height: "42px",
                    },
                  }}
                />
              </Box>

              <TextField
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: {
                    background: "linear-gradient( rgba(255,255,255,0.05))",
                    border: "1px solid #FFFFFF33",
                    borderRadius: "5px",
                    color: "#ffffff99",
                    height: "42px",
                  },
                }}
              />

              <TextField
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: {
                    background: "linear-gradient( rgba(255,255,255,0.05))",
                    border: "1px solid #FFFFFF33",
                    borderRadius: "5px",
                    color: "#ffffff99",
                    height: "42px",
                  },
                }}
              />

              <TextField
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Message"
                variant="outlined"
                fullWidth
                InputProps={{
                  sx: {
                    background: "linear-gradient( rgba(255,255,255,0.05))",
                    border: "1px solid #FFFFFF33",
                    borderRadius: "5px",
                    color: "#ffffff99",
                  },
                }}
              />

              <Button
                fullWidth
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  borderRadius: "5px",
                  fontWeight: 700,
                  background: "linear-gradient(to right, #33B2F7, #A905BC)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(to right, #A905BC, #33B2F7)",
                  },
                }}
              >
                Send Message
              </Button>
            </Grid>

            {/* RIGHT COLUMN — IMAGE WITH TEXT INSIDE */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 0 } }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: { xs: "300px", md: "520px" },
                }}
              >
                {/* IMAGE */}
                <img
                  src={astronaut}
                  alt="astronaut"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* TEXT OVERLAY (inside the image) */}
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    color: "#cfcfcf",
                    fontSize: "16px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                >
                  Let’s power up together! Reach out and join forces to create
                  the ultimate gaming experience where ideas, passion, and
                  collaboration collide.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={5}>
          <BookingSection />
        </Box>
      </Box>
    </>
  );
};

export default Contact;
