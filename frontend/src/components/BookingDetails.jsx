import { Box, Typography, Button, Divider } from "@mui/material";

export default function BookingDetails() {
  return (
    <Box sx={{ pl: { xs: 0, md: 12 } }}>
      {/* Title */}
      <Typography sx={{ color: "#fff", fontSize: { xs: 18, md: 22 }, fontWeight: 600 }}>
        Booking Details
      </Typography>
      <Typography sx={{ color: "#9CA3AF", mb: { xs: 2, md: 4 }, fontSize: { xs: 12, md: 14 } }}>
        See your Booking Details.
      </Typography>

      {/* Card */}
      <Box
        sx={{
          width: { xs: "100%", md: 380 },
          p: { xs: 2, md: 3 },
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Row */}
        {[
          ["Customer Name", "Alex Chen"],
          ["Phone Number", "071 3226865"],
          ["Station", "PS5 Station 1"],
          ["VR Play", "Yes"],
          ["Date", "11/08/2025"],
          ["Start Time", "12.00 pm"],
          ["Duration", "02h 00min"],
        ].map(([label, value]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.4,
            }}
          >
            <Typography sx={{ color: "#9CA3AF", fontSize: 14 }}>
              {label}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              {value}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Payment */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography sx={{ color: "#9CA3AF", fontSize: 14 }}>
            Payment :
          </Typography>
          <Typography
            sx={{
              color: "#C084FC",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            LKR 845.00
          </Typography>
        </Box>

        <Button
          fullWidth
          sx={{
            backgroundColor: "transparent",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 999,
            py: 1.2,
            border: "1px solid rgba(255,255,255,0.7)",
            transition: "all 0.25s ease",

            "&:hover": {
              backgroundColor: "#16A34A",
              border: "1px solid #16A34A",
            },
          }}
        >
          Download Receipt
        </Button>
      </Box>
    </Box>
  );
}
