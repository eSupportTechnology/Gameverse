import React from "react";
import { Box, Grid, Typography, IconButton, Link, Divider } from "@mui/material";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footter = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #4E0256, #000000)",
        color: "#fff",
        py: 6,
        px: { xs: 3, sm: 6, md: 10 },
      }}
    >
      {/* Transparent Box */}
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.16)",
          borderRadius: "90px",
          maxWidth: "1100px",
          width: "100%",
          mx: "auto",
          my: 6,
          p: { xs: 3, md: 6 },

          display: "flex",           // flex container
          flexDirection: "column",   // stack children vertically
          justifyContent: "space-between", // top content at top, bottom at bottom
          height: "100%",            // occupy full height of container
        }}
      >
        {/* Top Section */}
        <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 2, fontSize: "14px" }}>
              <LocationOn sx={{ mr: 1, fontSize: 16 }} /> 666 Trincomalee Street, Matale
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 2, fontSize: "14px" }}>
              <Phone sx={{ mr: 1, fontSize: 16 }} /> 071 7111882 / 066 2224321
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 2, fontSize: "14px" }}>
              <Email sx={{ mr: 1, fontSize: 16 }} /> Gameverse.ltd@gmail.com
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", mb: 2, fontSize: "14px" }}>
              <AccessTime sx={{ mr: 1, fontSize: 16 }} /> Opening Hours: 12 PM – 12 AM (Daily)
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small">
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: "14px", fontWeight: "bold" }}>
              QUICK LINKS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8, fontSize: "14px" }}>
              <Link href="#" color="inherit" underline="hover">HOME</Link>
              <Link href="#" color="inherit" underline="hover">ABOUT US</Link>
              <Link href="#" color="inherit" underline="hover">GAMES</Link>
              <Link href="#" color="inherit" underline="hover">CONTACT</Link>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={4}>
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.454343614969!2d80.63331777373575!3d7.30274301362038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367d431bdb637%3A0x43523ff88f06a6cd!2s666%20DS%20Senanayake%20Veediya%2C%20Kandy!5e0!3m2!1ssi!2slk!4v1756720951247!5m2!1ssi!2slk"
              style={{ border: 0, borderRadius: "8px" }}
              width="100%"
              height="200px"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", my: 2 }} />

        {/* Bottom Bar */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" fontSize="12px" sx={{ opacity: 0.8 }}>
            © 2025 GAMEVERSE. All Rights Reserved. Powered by eSupport ®
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footter;
