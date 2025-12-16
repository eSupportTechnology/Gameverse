// src/components/ProfileModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

const ProfileModal = ({ open, onClose, user, onSignOut }) => {
  if (!user) return null;

  const initials = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your Profile</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 60, height: 60, bgcolor: "#A905BC" }}>
            {initials}
          </Avatar>

          <Box>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            You can add more profile settings here later.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>

        <Button
          color="error"
          onClick={() => {
            onSignOut();
            onClose();
          }}
        >
          Sign out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
