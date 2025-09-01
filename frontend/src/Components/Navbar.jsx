import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import logo from '../assets/logo.png'

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = ["Home", "Games", "About Us", "Contact"];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250, }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {navLinks.map((text) => (
          <ListItem button key={text} component="a" href={`${text.toLowerCase().replace(" ", "-")}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="fixed" sx={{  background: "linear-gradient(90deg, #01010a 0%, #1a0033 50%, #000000 100%)"}}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 4, md: 10 } }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer",height:'50px' }}>
            <img src={logo} alt="Gameverse Logo" style={{  width: 200 }} />
          </Box>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: "flex",  gap: 3, alignItems: "center" }}>
              {navLinks.map((item) => (
                <Button
                  key={item}
                  href={`${item.toLowerCase().replace(" ", "-")}`}
                  sx={{
                    color: "#ffffff",
                    textTransform: "none",
                    fontSize: 16,
                    "&:hover": { color: "#ff00ff" },
                  }}
                >
                  {item}
                </Button>
              ))}
              
            </Box>
          )}

          {!isMobile && (
            <Button
                variant="contained"
                sx={{ backgroundColor: "gray", borderRadius: 2, "&:hover": { backgroundColor: "#555" } }}
              >
                Log in
              </Button>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right"  open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "gray", borderRadius: 2, "&:hover": { backgroundColor: "#555" } }}
          >
            Log in
          </Button>
        </Box>
      </Drawer>

      {/* Spacer to prevent content behind navbar */}
      <Toolbar />
    </>
  )
}

export default Navbar
