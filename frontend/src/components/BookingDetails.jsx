import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Box, Typography, Divider, Button } from "@mui/material";
import { API_BASE_URL } from "../apiConfig";
import jsPDF from "jspdf";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    fetchBookings();
  }, [token]);

  const downloadReceipt = (booking) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Gaming Session Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${booking.order_id || booking.id}`, 20, 35);
    doc.text(
      `Date: ${booking.booking_date ? dayjs(booking.booking_date).format("DD/MM/YYYY") : "-"}`,
      20,
      45,
    );
    doc.text(`Station: ${booking.station || "-"}`, 20, 55);
    doc.text(`Customer: ${booking.customer_name || "-"}`, 20, 65);
    doc.text(`Phone: ${booking.phone_number || "-"}`, 20, 75);
    doc.text(`VR Play: ${booking.vr_play || "No"}`, 20, 85);
    doc.text(`Start Time: ${booking.start_time || "-"}`, 20, 95);
    doc.text(`Duration: ${booking.duration || "-"}`, 20, 105);

    doc.setFontSize(14);
    doc.text(
      `Amount Paid: LKR ${Number(booking.amount || 0).toFixed(2)}`,
      20,
      120,
    );

    doc.save(`Receipt_${booking.customer_name}_${booking.id}.pdf`);
  };

  return (
    <Box sx={{ pl: { xs: 0, md: 12 } }}>
      <Typography
        sx={{ color: "#fff", fontSize: { xs: 18, md: 22 }, fontWeight: 600 }}
      >
        My Bookings
      </Typography>
      <Typography
        sx={{
          color: "#9CA3AF",
          mb: { xs: 2, md: 4 },
          fontSize: { xs: 12, md: 14 },
        }}
      >
        See all your bookings.
      </Typography>

      {bookings.length === 0 ? (
        <Typography sx={{ color: "#9CA3AF" }}>No bookings found.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {bookings.map((booking) => (
            <Box
              key={booking.id}
              sx={{
                width: "90%", 
                p: { xs: 2, md: 3 },
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[
                ["Customer Name", booking.customer_name || "-"],
                ["Phone Number", booking.phone_number || "-"],
                ["Station", booking.station || "-"],
                ["VR Play", booking.vr_play || "No"],
                [
                  "Date",
                  booking.booking_date
                    ? dayjs(booking.booking_date).format("DD/MM/YYYY")
                    : "-",
                ],
                ["Start Time", booking.start_time || "-"],
                ["Duration", booking.duration || "-"],
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

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography sx={{ color: "#9CA3AF", fontSize: 14 }}>
                  Payment :
                </Typography>
                <Typography
                  sx={{ color: "#C084FC", fontSize: 15, fontWeight: 600 }}
                >
                  LKR {Number(booking.amount || 0).toFixed(2)}
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
                onClick={() => downloadReceipt(booking)}
              >
                Download Receipt
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
