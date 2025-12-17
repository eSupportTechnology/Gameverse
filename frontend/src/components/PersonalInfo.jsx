import { Box, Typography, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

export default function PersonalInfo() {
  return (
    <Box
      sx={{
        pl: 12,       // ✅ aligns with ProfileSidebar divider
        pt: 0.5,     // subtle vertical alignment polish
      }}
    >
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
            sx={textFieldStyles}
          />
        </Box>

        <Box>
          <Typography sx={fieldLabelStyles}>Last Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter last name"
            sx={textFieldStyles}
          />
        </Box>

        <Box>
          <Typography sx={fieldLabelStyles}>Email</Typography>
          <TextField
            fullWidth
            placeholder="alex123@gmail.com"
            sx={textFieldStyles}
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            <Typography sx={fieldLabelStyles}>Telephone</Typography>
            <TextField fullWidth placeholder="+94" sx={textFieldStyles} />
          </Box>

          <Box>
            <Typography sx={fieldLabelStyles}>DOB</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
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
          Update
        </Button>
      </Box>
    </Box>
  );
}
