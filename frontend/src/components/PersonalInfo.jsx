import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { API_BASE_URL } from "../apiConfig";

const fieldLabelStyles = {
  color: "#9CA3AF",
  fontSize: 13,
  mb: 1,
};

export const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: 52,
    borderRadius: "8px",
    color: "#E5E7EB",
    backgroundColor: "rgba(41, 37, 75, 0.58)",

    "& fieldset": {
      border: "1px solid rgba(55, 65, 81, 0.62)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(55, 65, 81, 0.8)",
    },

    "&.Mui-disabled": {
      borderColor: "rgba(55, 65, 81, 0.62)",
      backgroundColor: "rgba(41, 37, 75, 0.58)",
      cursor: "text",
    },
  },

  "& input": {
    padding: "14px 16px",
  },

  "& input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
    fontSize: 14,
  },

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#E5E7EB",
    opacity: 1,
    cursor: "text",
  },
};

/* COMPONENT */

export default function PersonalInfo() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: null,
    nic: "",
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  /* ---------- Fetch Logged-in User ---------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return setLoading(false);

        // 1️⃣ Fetch logged-in user
        const res = await axios.get(`${API_BASE_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;
        setForm({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dob: userData.dob ? dayjs(userData.dob) : null,
          nic: userData.nic || "",
        });

        if (userData.email) {
          try {
            const nfcRes = await axios.get(
              `${API_BASE_URL}/api/nfc-user-by-email`,
              { params: { email: userData.email } },
            );

            if (nfcRes.data.success) {
              setForm((prev) => ({
                ...prev,
                nic: nfcRes.data.data.nicNumber || prev.nic,
              }));
              if (nfcRes.data.data.profileImage) {
                setProfilePicturePreview(nfcRes.data.data.profileImage);
              }
            }
          } catch (err) {
            console.log("NFC user not found for this email", err);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ---------- Update Profile ---------- */
  const handleUpdate = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You are not authenticated!");
        setSaving(false);
        return;
      }

      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("phone", form.phone);
      formData.append("nic", form.nic);
      if (form.dob) {
        formData.append("dob", form.dob.format("YYYY-MM-DD"));
      }

      await axios.put(`${API_BASE_URL}/api/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully ");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Typography sx={{ color: "#fff" }}>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography sx={{ color: "#fff" }}>
        Failed to load profile. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ pl: { xs: 0, md: 12 }, pt: 0.5 }}>
      <Typography
        sx={{ color: "#fff", fontSize: { xs: 18, md: 22 }, fontWeight: 600 }}
      >
        Profile Information
      </Typography>
      <Typography
        sx={{
          color: "#9CA3AF",
          mb: { xs: 2, md: 4 },
          fontSize: { xs: 12, md: 14 },
        }}
      >
        Update your profile and contact preferences.
      </Typography>

      {/* Profile Picture Upload */}
      <Box sx={{ mb: 4, width: { xs: "100%", md: 640 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 1,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={profilePicturePreview}
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                bgcolor: "rgba(41, 37, 75, 0.58)",
                border: "2px solid rgba(55, 65, 81, 0.62)",
                fontSize: { xs: 32, md: 40 },
                color: "#9CA3AF",
                cursor: "default",
              }}
            >
              {!profilePicturePreview && (form.firstName?.[0] || "U")}
            </Avatar>
            <IconButton
              component="label"
              disabled
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "linear-gradient(90deg,#C026D3,#2563EB)",
                width: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
                cursor: "not-allowed",
                "&:hover": {
                  background: "linear-gradient(90deg,#C026D3,#2563EB)",
                },
              }}
            >
              {/* <PhotoCamera
                sx={{ fontSize: { xs: 16, md: 18 }, color: "#fff" }}
              /> */}
              {/* <input type="file" hidden accept="image/*" disabled /> */}
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, md: 3 },
          width: { xs: "100%", md: 640 },
        }}
      >
        <Box>
          <Typography sx={fieldLabelStyles}>First Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            sx={textFieldStyles}
          />
        </Box>

        <Box>
          <Typography sx={fieldLabelStyles}>Last Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            sx={textFieldStyles}
          />
        </Box>

        <Box>
          <Typography sx={fieldLabelStyles}>Email</Typography>
          <TextField
            fullWidth
            placeholder="alex123@gmail.com"
            value={form.email}
            disabled
            sx={textFieldStyles}
          />
        </Box>

        <Box>
          <Typography sx={fieldLabelStyles}>NIC Number</Typography>
          <TextField
            fullWidth
            placeholder="Enter NIC number"
            value={form.nic}
            onChange={(e) => setForm({ ...form, nic: e.target.value })}
            disabled
            sx={textFieldStyles}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box>
            <Typography sx={fieldLabelStyles}>Telephone</Typography>
            <TextField
              fullWidth
              placeholder="+94"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              sx={textFieldStyles}
            />
          </Box>

          <Box>
            <Typography sx={fieldLabelStyles}>DOB</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={form.dob}
                onChange={(newValue) => setForm({ ...form, dob: newValue })}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "21/03/2001",
                    InputProps: {
                      sx: {
                        height: 52,
                        borderRadius: "8px",
                        backgroundColor: "rgba(41, 37, 75, 0.58)",
                        color: "#E5E7EB",
                        "& fieldset": {
                          border: "1px solid rgba(55, 65, 81, 0.62)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(55, 65, 81, 0.8)",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#9CA3AF", // calendar icon
                        },
                      },
                    },
                    inputProps: {
                      sx: {
                        padding: "14px 16px",
                        color: "#E5E7EB",
                        "&::placeholder": {
                          color: "#9CA3AF",
                          opacity: 1,
                          fontSize: 14,
                        },
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Button
          onClick={handleUpdate}
          sx={{
            mt: { xs: 2, md: 3 },
            width: { xs: "100%", sm: 140 },
            height: { xs: 38, md: 42 },
            background: "linear-gradient(90deg,#C026D3,#2563EB)",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: { xs: 13, md: 14 },
          }}
        >
          {saving ? "Updating..." : "Update"}
        </Button>
      </Box>
    </Box>
  );
}
