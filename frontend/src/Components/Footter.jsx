import React from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
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
        px: { xs: 4, md: 10 },
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1, fontSize: '14px' }}>
            <LocationOn sx={{ mr: 1, width: '14px' }} /> 666 Trincomalee Street, Matale
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1, fontSize: '14px' }}>
            <Phone sx={{ mr: 1, width: '14px' }} /> 071 7111882 / 066 2224321
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 1, fontSize: '14px' }}>
            <Email sx={{ mr: 1, width: '14px' }} /> Gameverse.ltd@gmail.com
          </Typography>
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mb: 2, fontSize: '14px' }}>
            <AccessTime sx={{ mr: 1, width: '14px' }} /> Opening Hours: 12 PM – 12 AM (Daily)
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="inherit" sx={{ width: 18 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ width: 18 }}>
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ width: 18 }}>
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '14px' }}>
            QUICK LINK
          </Typography>
          <Box sx={{ display: "flex", fontSize: '14px',lineHeight:'100%', flexDirection: "column", gap: 1 }}>
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
            maxWidth="400px"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #444", pt: 2 }}>
        <Typography variant="body2" fontSize='12px'>
          Copyright © 2025 GAMEVERSE. All Right Reserved. Powered by eSupport ®
        </Typography>
      </Box>
    </Box>
  )
}

export default Footter
