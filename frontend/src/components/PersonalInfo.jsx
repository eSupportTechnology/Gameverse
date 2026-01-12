import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import { Box, Typography, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { API_BASE_URL } from "../apiConfig";

const fieldLabelStyles = {
  color: "#9CA3AF",
  fontSize: 13,
  mb: 1,
};

const textFieldStyles = {
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
  },

  "& input": {
    padding: "14px 16px",
  },

  "& input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
    fontSize: 14,
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
  });

  /* ---------- Fetch Logged-in User ---------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.warn("No token found in localStorage");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          dob: res.data.dob ? dayjs(res.data.dob) : null,
        });
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

      await axios.put(
        `${API_BASE_URL}/api/profile`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          dob: form.dob ? form.dob.format("YYYY-MM-DD") : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    <Box sx={{ pl: 12, pt: 0.5 }}>
      <Typography sx={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>
        Profile Information
      </Typography>
      <Typography sx={{ color: "#9CA3AF", mb: 4 }}>
        Update your profile and contact preferences.
      </Typography>

      <Box sx={{ display: "grid", gap: 3, width: 640 }}>
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
            sx={textFieldStyles}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
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
            mt: 3,
            width: 140,
            height: 42,
            background: "linear-gradient(90deg,#C026D3,#2563EB)",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {saving ? "Updating..." : "Update"}
        </Button>
      </Box>
    </Box>
  );
}
