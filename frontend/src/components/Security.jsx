import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { API_BASE_URL } from "../apiConfig";

export default function Security() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      width: "100%",
      height: 52,
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "rgba(41,37,75,0.58)",
      "& fieldset": { border: "1px solid rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "#7C3AED" },
      "&.Mui-focused fieldset": { borderColor: "#2563EB" },
    },
    "& input": { padding: "14px 16px", color: "#fff" },
    "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
  };

  const handleUpdatePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You are not authenticated!");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/change-password`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          newPassword_confirmation: form.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <Box sx={{ pl: { xs: 0, md: 12 }, maxWidth: { xs: "100%", md: 640 } }}>
      <Typography sx={{ color: "#fff", fontSize: { xs: 18, md: 22 }, fontWeight: 600, mb: 1 }}>
        Sign-In & Security
      </Typography>
      <Typography sx={{ color: "#9CA3AF", mb: { xs: 2, md: 4 }, fontSize: { xs: 12, md: 14 } }}>
        Control how you sign in and secure your account.
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        <Typography sx={{ color: "#9CA3AF", fontSize: { xs: 12, md: 13 } }}>
          Current Password*
        </Typography>
        <TextField
          type={showPassword.current ? "text" : "password"}
          placeholder="Enter current password"
          sx={textFieldStyles}
          value={form.currentPassword}
          onChange={(e) =>
            setForm({ ...form, currentPassword: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePassword("current")}
                  edge="end"
                >
                  {showPassword.current ? (
                    <VisibilityOff sx={{ color: "#9CA3AF" }} />
                  ) : (
                    <Visibility sx={{ color: "#9CA3AF" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography sx={{ color: "#9CA3AF", fontSize: 13 }}>
          New Password*
        </Typography>
        <TextField
          type={showPassword.new ? "text" : "password"}
          placeholder="Enter new password"
          sx={textFieldStyles}
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => togglePassword("new")} edge="end">
                  {showPassword.new ? (
                    <VisibilityOff sx={{ color: "#9CA3AF" }} />
                  ) : (
                    <Visibility sx={{ color: "#9CA3AF" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography sx={{ color: "#9CA3AF", fontSize: 13 }}>
          Confirm Password
        </Typography>
        <TextField
          type={showPassword.confirm ? "text" : "password"}
          placeholder="Confirm new password"
          sx={textFieldStyles}
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePassword("confirm")}
                  edge="end"
                >
                  {showPassword.confirm ? (
                    <VisibilityOff sx={{ color: "#9CA3AF" }} />
                  ) : (
                    <Visibility sx={{ color: "#9CA3AF" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={handleUpdatePassword}
          sx={{
            mt: 2,
            width: { xs: "100%", sm: 140 },
            height: { xs: 38, md: 42 },
            background: "linear-gradient(90deg,#C026D3,#2563EB)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: 13, md: 14 },
            "&:hover": { background: "linear-gradient(90deg,#7C3AED,#2563EB)" },
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
