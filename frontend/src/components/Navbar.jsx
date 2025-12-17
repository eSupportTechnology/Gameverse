import React, { useState, useEffect } from "react";
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
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  // const navLinks = ["Home", "Games", "About Us", "Contact"];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Check if Games link should be active (includes booking page)
  const isGamesActive =
    location.pathname === "/games" || location.pathname === "/booking";

  // reactive user state (initial read)
  const [storedUser, setStoredUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // when other tabs change the storage, update user as well
    const onStorage = (e) => {
      if (e.key === "user") {
        setStoredUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", onStorage);

    // in-tab event when SignIn dispatches
    const onUserUpdated = () => {
      console.log("userUpdated event fired");
      try {
        setStoredUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setStoredUser(null);
      }
    };
    window.addEventListener("userUpdated", onUserUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userUpdated", onUserUpdated);
    };
  }, []);

  const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0)?.toUpperCase() || "";
    const l = lastName?.charAt(0)?.toUpperCase() || "";
    return f + l || "U";
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
                  color: isGamesActive ? "#ff00ff" : "#ffffff",
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

          {/* Desktop user info or sign in */}
          {!isMobile &&
            (storedUser ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/my-account")}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "#F1F1F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    fontSize: 16,
                    userSelect: "none",
                  }}
                >
                  {getInitials(storedUser.firstName, storedUser.lastName)}
                </Box>

                <Box>
                  <Box
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: 1.2,
                    }}
                  >
                    {storedUser.firstName} {storedUser.lastName}
                  </Box>

                  <Box
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      background: "linear-gradient(90deg, #33B2F7, #A905BC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    My Account
                  </Box>
                </Box>
              </Box>
            ) : (
              <GradientButton onClick={() => navigate("/sing-in")}>
                Sign in
              </GradientButton>
            ))}

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
              sx={{
                color: isGamesActive ? "#ff00ff" : "inherit",
              }}
            >
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to="/contact"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>

          {/* Mobile user info or sign in */}
          {isMobile &&
            (storedUser ? (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 3 }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "#F1F1F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/my-account");
                  }}
                >
                  {getInitials(storedUser.firstName, storedUser.lastName)}
                </Box>

                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/my-account");
                  }}
                >
                  <Box
                    sx={{
                      color: "#000000",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: 1.2,
                    }}
                  >
                    {storedUser.firstName} {storedUser.lastName}
                  </Box>

                  <Box
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      background: "linear-gradient(90deg, #33B2F7, #A905BC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    My Account
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                <GradientButton
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/sing-in");
                  }}
                  fullWidth
                >
                  Sign in
                </GradientButton>
              </Box>
            ))}
        </Box>
      </Drawer>

      {/* Spacer to prevent content behind navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
