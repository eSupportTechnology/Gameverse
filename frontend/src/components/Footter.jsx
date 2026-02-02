import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaTiktok } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const handleFooterNavigation = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#0A0D17",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 0 },
      }}
    >
      {/* ==================== FOOTER PILL CONTAINER ==================== */}
      <Box
        sx={{
          background: "#1c1e2bff",
          borderRadius: { xs: "20px", sm: "30px", md: "100px" },
          width: { xs: "100%", sm: "90%", md: "90%" },
          maxWidth: "1300px",
          mx: { xs: 1, sm: "auto" },
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2, sm: 4, md: 6 },
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* justifyContent="center" -> Groups columns in the middle 
           columnSpacing -> Adds specific space between the grouped columns
        */}
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 4, md: 8, lg: 24 }}
          rowSpacing={{ xs: 2, sm: 4, md: 4 }}
          justifyContent="center"
          alignItems={{ xs: "stretch", md: "flex-start" }}
        >
          {/* --- Left Column: Contact Info --- */}
          <Grid item xs={6} sm={6} md={4.5} lg={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1, md: 2 },
                height: "100%",
              }}
            >
              {" "}
              {/* Reduced gap from 2.5 to 2 */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {" "}
                {/* Align items center ensures icon and text line up */}
                <LocationOn sx={{ mr: { xs: 1, md: 2 }, fontSize: { xs: 14, md: 20 }, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "10px", md: "14px" }, color: "#ccc" }}
                >
                  666 Trincomalee Street, Matale
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: { xs: 1, md: 2 }, fontSize: { xs: 14, md: 20 }, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "10px", md: "14px" }, color: "#ccc" }}
                >
                  <Link
                    href="tel:0717111882"
                    underline="none"
                    sx={{ color: "#ccc", mr: 1 }}
                  >
                    071 7111882
                  </Link>
                  /
                  <Link
                    href="tel:0662224321"
                    underline="none"
                    sx={{ color: "#ccc", ml: 1 }}
                  >
                    066 2224321
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: { xs: 1, md: 2 }, fontSize: { xs: 14, md: 20 }, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "10px", md: "14px" }, color: "#ccc" }}
                >
                  <Link
                    href="mailto:Gameverse.ltd@gmail.com"
                    underline="none"
                    sx={{
                      color: "#ccc",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    Gameverse.ltd@gmail.com
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTime sx={{ mr: { xs: 1, md: 2 }, fontSize: { xs: 14, md: 20 }, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "10px", md: "14px" }, color: "#ccc" }}
                >
                  Opening Hours: 12 PM – 12 AM (Daily)
                </Typography>
              </Box>
              <Box sx={{ mt: 1, display: "flex", gap: 1.5, ml: 0.5 }}>
                <a
                  href="https://www.facebook.com/share/17kPm9jmgS/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton size="small" sx={{ color: "white", p: 0 }}>
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                </a>

                <a
                  href="https://www.tiktok.com/@gameverse.lk?_r=1&_t=ZS-92QgqKm25pp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton size="small" sx={{ color: "white", p: 0 }}>
                    <FaTiktok size={16} />
                  </IconButton>
                </a>

                <a
                  href="https://www.instagram.com/gameverse.lk?igsh=eHBnZW81dDc5bWwx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton size="small" sx={{ color: "white", p: 0 }}>
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                </a>
              </Box>
            </Box>
          </Grid>

          {/* --- Middle Column: Quick Link --- */}
          <Grid item xs={12} sm={6} md={4.5} lg={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                height: "10%",
                pl: { xs: 0, md: 2 },
                gap: { xs: 0, md: 1.2 },
                "& > *": {
                  lineHeight: { xs: 1, md: 1.4 },
                  m: { xs: "unset", md: "unset" },
                  p: { xs: 0, md: 0 },
                  display: "block",
                },
                "& > *:not(:first-of-type)": { mt: { xs: 0, md: 0 } },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "10px", md: "14px" },
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "#fff",
                  mb: { xs: 1, md: 2 },
                }}
              >
                QUICK LINK
              </Typography>
              <Typography
                component={RouterLink}
                to="/"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  lineHeight: { xs: 0, md: 1.4 },
                  "&:hover": { color: "#fff" },
                }}
              >
                HOME
              </Typography>
              <Typography
                component={RouterLink}
                to="/games"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                GAMES
              </Typography>
              <Typography
                component={RouterLink}
                to="/contact"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                CONTACT US
              </Typography>
              <Typography
                component={RouterLink}
                to="/refund-policy"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                RETURN/ REFUND POLICY
              </Typography>
              <Typography
                component={RouterLink}
                to="/privacy-policy"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                PRIVACY POLICY
              </Typography>
              <Typography
                component={RouterLink}
                to="/terms-and-conditions"
                onClick={handleFooterNavigation}
                sx={{
                  fontSize: { xs: "9px", md: "13px" },
                  color: "#ccc",
                  textDecoration: "none",
                  "&:hover": { color: "#fff" },
                }}
              >
                TERMS &  CONDITIONS
              </Typography>
            </Box>
          </Grid>

          {/* --- Right Column: Map --- */}
          <Grid item xs={12} sm={12} md={4.5} lg={4}>
            <Box
              sx={{
                width: "100%",
                height: { xs: "180px", sm: "200px", md: "200px" },
                borderRadius: { xs: "16px", md: "25px" },
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                mx: "auto",
              }}
            >
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.454343614969!2d80.63331777373575!3d7.30274301362038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367d431bdb637%3A0x43523ff88f06a6cd!2s666%20DS%20Senanayake%20Veediya%2C%20Kandy!5e0!3m2!1ssi!2slk!4v1756720951247!5m2!1ssi!2slk"
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        {/* --- Divider Line --- */}
        <Divider
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            mt: { xs: 3, md: 5 },
            mb: { xs: 2, md: 3 },
            width: "100%",
          }}
        />

        {/* --- Copyright --- */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: { xs: "8px", md: "12px" } }}
          >
            Copyright © 2025 GAMEVERSE. All Right Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
