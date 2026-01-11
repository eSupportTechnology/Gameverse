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
        py: 4,
      }}
    >
      {/* ==================== FOOTER PILL CONTAINER ==================== */}
      <Box
        sx={{
          background: "#1c1e2bff",
          borderRadius: { xs: "30px", md: "100px" },
          width: { xs: "80%", md: "90%" },
          maxWidth: "1300px", // Slightly tighter max width to help centering
          mx: "auto",
          px: { xs: 4, md: 6 },
          py: { xs: 4, md: 6 },
          position: "relative",
        }}
      >
        {/* justifyContent="center" -> Groups columns in the middle 
           columnSpacing -> Adds specific space between the grouped columns
        */}
        <Grid
          container
          columnSpacing={{ xs: 2, md: 8, lg: 24 }}
          rowSpacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {/* --- Left Column: Contact Info --- */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {" "}
              {/* Reduced gap from 2.5 to 2 */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {" "}
                {/* Align items center ensures icon and text line up */}
                <LocationOn sx={{ mr: 2, fontSize: 20, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "#ccc" }}
                >
                  666 Trincomalee Street, Matale
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 2, fontSize: 20, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "#ccc" }}
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
                <Email sx={{ mr: 2, fontSize: 20, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "#ccc" }}
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
                <AccessTime sx={{ mr: 2, fontSize: 20, color: "#fff" }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "#ccc" }}
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
          <Grid item xs={12} md={2.5} lg={2}>
            {/* Flex container to center the content block within the column if needed, or keep left aligned */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                pl: { xs: 0, md: 2 },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                QUICK LINK
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  component={RouterLink}
                  to="/"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  HOME
                </Link>
                <Link
                  component={RouterLink}
                  to="/games"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  GAMES
                </Link>
                <Link
                  component={RouterLink}
                  to="/contact"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  CONTACT US
                </Link>
                <Link
                  component={RouterLink}
                  to="/refund-policy"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  RETURN/ REFUND POLICY
                </Link>{" "}
                <Link
                  component={RouterLink}
                  to="/privacy-policy"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  PRIVACY POLICY
                </Link>{" "}
                <Link
                  component={RouterLink}
                  to="/terms-and-conditions"
                  underline="none"
                  onClick={handleFooterNavigation}
                  sx={{
                    fontSize: "13px",
                    color: "#ccc",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  TERMS & CONDITIONS
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* --- Right Column: Map --- */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                borderRadius: "25px",
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
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}
          >
            Copyright © 2025 GAMEVERSE. All Right Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
