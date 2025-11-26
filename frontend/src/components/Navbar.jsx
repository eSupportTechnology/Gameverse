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
import { useTheme, styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const GradientButton = styled(Button)(() => ({
  padding: "8px 18px",
  minWidth: "100px", 
  borderRadius: "10px",
  fontWeight: "bold",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  background: "transparent",
  color: "#A905BC",
  border: "2px solid #A905BC",

  "&:hover": {
    borderColor: "#33B2F7",
    color: "#33B2F7",
    boxShadow: "0 0 8px rgba(51,178,247,0.5)",
  },

  "&:active": {
    borderColor: "#15A2EF",
    color: "#15A2EF",
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const navLinks = ["Home", "Games", "About Us", "Contact"];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };



  // const drawer = (
  //   <Box
  //     sx={{ width: 250, }}
  //     role="presentation"
  //     onClick={handleDrawerToggle}
  //     onKeyDown={handleDrawerToggle}
  //   >
  //     <List>
  //       {navLinks.map((text) => (
  //         <ListItem button key={text} component="a" href={`${text.toLowerCase().replace(" ", "-")}`}>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(90deg, #000000 0%, #1a0033 50%, #000000 100%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 8 } }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              height: "50px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} alt="Gameverse Logo" style={{ width: 200 }} />
            </Link>
          </Box>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              {/* {navLinks.map((item) => (
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
              ))} */}

              <Button
                component={NavLink}
                to="/"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: "bold",
                  "&.active": { color: "#ff00ff" }, // active link highlight
                  "&:hover": { color: "#ff00ff" },
                }}
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/games"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: "bold",
                  "&.active": { color: "#ff00ff" },
                  "&:hover": { color: "#ff00ff" },
                }}
              >
                Games
              </Button>

              <Button
                component={NavLink}
                to="/contact"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: "bold",
                  "&.active": { color: "#ff00ff" },
                  "&:hover": { color: "#ff00ff" },
                }}
              >
                Contact Us
              </Button>
            </Box>
          )}

          {!isMobile && <GradientButton>Sign in</GradientButton>}

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem
              button
              component={NavLink}
              to="/"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/games"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Games" />
            </ListItem>
            {/* <ListItem
              button
              component={NavLink}
              to="/about"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="About Us" />
            </ListItem> */}
            <ListItem
              button
              component={NavLink}
              to="/contact"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>

          <GradientButton>Sign in</GradientButton>
        </Box>
      </Drawer>

      {/* Spacer to prevent content behind navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
