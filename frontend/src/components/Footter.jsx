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
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footter = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #4E0256, #0A0D17)",
        color: "#fff",
        py: { xs: 3, sm: 1 },
        px: { xs: 2, sm: 6, md: 10 },
      }}
    >
      {/* Transparent Responsive Box */}
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.16)",
          borderRadius: { xs: "16px", sm: "32px", md: "90px" },
          width: { xs: "90%", sm: "90%", md: "90%" },
          mx: "auto",
          my: { xs: 2, md: 6 },
          p: { xs: 2, sm: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Section */}
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              <LocationOn sx={{ mr: 1, fontSize: { xs: 14, md: 16 } }} /> 666
              Trincomalee Street, Matale
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              <Phone sx={{ mr: 1, fontSize: { xs: 14, md: 16 } }} /> 071 7111882
              / 066 2224321
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              <Email sx={{ mr: 1, fontSize: { xs: 14, md: 16 } }} />{" "}
              Gameverse.ltd@gmail.com
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              <AccessTime sx={{ mr: 1, fontSize: { xs: 14, md: 16 } }} />{" "}
              Opening Hours: 12 PM – 12 AM (Daily)
            </Typography>

            <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 }, mt: 1 }}>
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
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontSize: { xs: "13px", md: "14px" },
                fontWeight: "bold",
              }}
            >
              QUICK LINKS
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 0.8, md: 1.5 },
                fontSize: { xs: "12px", md: "14px" },
              }}
            >
              <Link href="#" color="inherit" underline="hover">
                HOME
              </Link>
              <Link href="#" color="inherit" underline="hover">
                ABOUT US
              </Link>
              <Link href="#" color="inherit" underline="hover">
                GAMES
              </Link>
              <Link href="#" color="inherit" underline="hover">
                CONTACT
              </Link>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={4}>
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.454343614969!2d80.63331777373575!3d7.30274301362038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367d431bdb637%3A0x43523ff88f06a6cd!2s666%20DS%20Senanayake%20Veediya%2C%20Kandy!5e0!3m2!1ssi!2slk!4v1756720951247!5m2!1ssi!2slk"
              sx={{
                border: 0,
                borderRadius: "8px",
                width: "100%",
                minHeight: { xs: "150px", md: "200px" },
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>

        {/* Divider Line */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", my: 2 }} />

        {/* Bottom Bar */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            fontSize={{ xs: "10px", md: "12px" }}
            sx={{ opacity: 0.8 }}
          >
            © 2025 GAMEVERSE. All Rights Reserved. Powered by eSupport ®
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footter;
