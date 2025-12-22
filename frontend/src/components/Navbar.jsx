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
  Menu,
  MenuItem,
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

  const navigate = useNavigate();
  const location = useLocation();

  // const navLinks = ["Home", "Games", "About Us", "Contact"];

  /* ---------- Account Menu ---------- */
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountMenuOpen = Boolean(accountAnchorEl);

  /* ---------- User State ---------- */
  const [storedUser, setStoredUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onUserUpdated = () => {
      try {
        setStoredUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setStoredUser(null);
      }
    };
    window.addEventListener("userUpdated", onUserUpdated);
    return () => window.removeEventListener("userUpdated", onUserUpdated);
  }, []);

  /* ---------- Helpers ---------- */
  const getInitials = (firstName, lastName) =>
    (firstName?.[0] || "") + (lastName?.[0] || "");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    setAccountAnchorEl(null);
    navigate("/");
  };

  const isGamesActive =
    location.pathname === "/games" || location.pathname === "/booking";

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
                onClick={(e) => setAccountAnchorEl(e.currentTarget)}
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
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Account Dropdown */}
      <Menu
        anchorEl={accountAnchorEl}
        open={isAccountMenuOpen}
        onClose={() => setAccountAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: "#0F172A",
            borderRadius: "8px",
            minWidth: 160,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAccountAnchorEl(null);
            navigate("/my-account");
          }}
          sx={{
            color: "#F5F5F5",
            "&:hover": {
              backgroundColor: "#070F1E",
            },
          }}
        >
          My Account
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#F5F5F5",
            "&:hover": {
              backgroundColor: "#070F1E",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem button component={NavLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={NavLink} to="/games">
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem button component={NavLink} to="/contact">
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>

          {storedUser ? (
            <Button
              fullWidth
              sx={{ mt: 2, color: "error.main", fontWeight: 600 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <GradientButton fullWidth onClick={() => navigate("/sing-in")}>
              Sign in
            </GradientButton>
          )}
        </Box>
      </Drawer>

      {/* Spacer */}
      <Toolbar />
    </>
  );
};

export default Navbar;
