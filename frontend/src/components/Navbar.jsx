import React, {useEffect, useState } from "react";
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
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, styled } from "@mui/material/styles";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ProfileModal from "./ProfileModal";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data from your backend/database
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      
      if (!userId) {
        setUser(null);
        setLoading(false);
        return;
      }

      // TEMPORARY: For testing with mock data
      // Remove this block when you have a real API
      const mockUserData = localStorage.getItem("mockUserData");
      if (mockUserData) {
        setUser(JSON.parse(mockUserData));
        setLoading(false);
        return;
      }

      // PRODUCTION: Fetch from your actual API
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Listen for storage changes across tabs
    const onStorage = (e) => {
      if (e.key === "userId" || e.key === "token") {
        fetchUserData();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Sign out helper
  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("mockUserData"); // Remove mock data too
    setUser(null);
    navigate("/sign-in");
  };

  // Compute initials for avatar (handles firstName or username)
  const getAvatarInitial = () => {
    if (!user) return "?";
    
    // Try firstName first, then username, then email
    if (user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    } else if (user.username) {
      return user.username.charAt(0).toUpperCase();
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const avatarInitial = getAvatarInitial();

  // Check if Games link should be active (includes booking page)
  const isGamesActive = location.pathname === "/games" || location.pathname === "/booking";

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
              <Button
                component={NavLink}
                to="/"
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: "bold",
                  "&.active": { color: "#ff00ff" },
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

          {/* Right side: Avatar when logged in else Sign in button */}
          {!isMobile && (
            <>
              {!loading && user ? (
                <IconButton onClick={() => setProfileOpen(true)} sx={{ p: 0 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: "#A905BC", 
                      width: 40, 
                      height: 40,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#33B2F7",
                        transform: "scale(1.1)",
                      }
                    }}
                  >
                    {avatarInitial}
                  </Avatar>
                </IconButton>
              ) : !loading && (
                <GradientButton onClick={() => navigate("/sign-in")}>
                  Sign in
                </GradientButton>
              )}
            </>
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

          <Box sx={{ mt: 2 }}>
            {!loading && user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "#A905BC" }}>{avatarInitial}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>
                    {user.firstName || user.username || "User"}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {user.email}
                  </div>
                </Box>
                <Button 
                  size="small" 
                  onClick={() => { 
                    setProfileOpen(true); 
                    setDrawerOpen(false); 
                  }}
                  sx={{ ml: "auto" }}
                >
                  Profile
                </Button>
              </Box>
            ) : !loading && (
              <GradientButton 
                fullWidth 
                onClick={() => { 
                  navigate("/sign-in"); 
                  setDrawerOpen(false); 
                }}
              >
                Sign in
              </GradientButton>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Profile Modal */}
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />

      {/* Spacer to prevent content behind navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;