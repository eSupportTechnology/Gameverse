import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";

import visaLogo from "../assets/visa.png";
import mastercardLogo from "../assets/mastercard.png";
import cardImage from "../assets/card-bg.png";

export default function PaymentMethods() {
  return (
    <Box sx={{ pl: 12, color: "#fff" }}>
      {/* TITLE */}
      <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
        Payments Methods
      </Typography>
      <Typography sx={{ color: "#9CA3AF", mb: 3 }}>
        Manage your payment methods.
      </Typography>

      {/* ADD CARD */}
      <Typography sx={{ mb: 1.5, fontSize: 14 }}>
        Add New Card Details
      </Typography>

      {/* ADD CARD CONTAINER */}
      <Box
        sx={{
          width: 550,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* HEADER STRIP */}
        <Box
          sx={{
            px: 3,
            py: 1.6,
            background:
              "linear-gradient(90deg, #6D28D9 0%, #1E3A8A 50%, #0EA5E9 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Credit Card
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box component="img" src={visaLogo} height={20} />
            <Box component="img" src={mastercardLogo} height={20} />
          </Box>
        </Box>

        {/* FORM BODY */}
        <Box sx={{ p: 3 }}>
          {/* CARD NUMBER */}
          <TextField
            fullWidth
            placeholder="Card Number"
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlinedIcon sx={{ color: "#9CA3AF", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* EXPIRY + CVV */}
          <Grid container columnSpacing={2}  sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Expiration Date (MM/YY)"
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                placeholder="Security Code"
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          {/* NAME */}
          <TextField
            fullWidth
            placeholder="Name on card"
            sx={{ ...inputStyle, mt: 2 }}
          />
        </Box>
      </Box>

      {/* ADD NOW BUTTON */}
      <Button
        fullWidth
        sx={{
          mt: 3,
          width: 550,
          height: 48,
          borderRadius: "4px",
          background: "linear-gradient(90deg, #211D37 0%, #115784 100%)",
          color: "#FFFFFF",
          fontWeight: 600,
          letterSpacing: 0.6,
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(90deg, #1B1830 0%, #0E4A6D 100%)",
          },
        }}
      >
        ADD NOW
      </Button>

      {/* PAYMENT OPTIONS */}
      <Typography sx={{ mt: 4, mb: 2, fontSize: 14 }}>
        Payment Options
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <SavedCard defaultCard />
        <SavedCard />
      </Box>
    </Box>
  );
}

/* ================= SAVED CARD ================= */

function SavedCard({ defaultCard }) {
  return (
    <Box sx={{ width: 300 }}>
      <Box
        component="img"
        src={cardImage}
        alt="Saved Card"
        sx={{ width: "100%", borderRadius: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 1.5,
        }}
      >
        <Typography sx={{ color: "#EF4444", cursor: "pointer" }}>
          Remove
        </Typography>

        {defaultCard ? (
          <Typography sx={{ color: "#22C55E" }}>Default</Typography>
        ) : (
          <Typography sx={{ color: "#9CA3AF", cursor: "pointer" }}>
            Make Default
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/* ================= INPUT STYLE ================= */

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 52, // MATCH Card Number exactly
    borderRadius: "6px",
    background:
      "linear-gradient(180deg, rgba(36,33,64,0.95), rgba(24,22,46,0.95))",
    color: "#E5E7EB",
    "& fieldset": {
      border: "1px solid rgba(255,255,255,0.08)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366F1",
    },
  },
  "& input::placeholder": {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
  },
};
