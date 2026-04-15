import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import { API_BASE_URL } from "../apiConfig";
import RedeemIcon from "@mui/icons-material/Redeem";
import Pagination from "@mui/material/Pagination";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function GiftsRewards() {
  const [nfcUser, setNfcUser] = useState(null);
  const token = localStorage.getItem("authToken");

  const [openToast, setOpenToast] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUserAndNfc = async () => {
      try {
        // 1. Get logged user
        const res = await axios.get(`${API_BASE_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;
        const email = userData.email;

        // 2. Fetch NFC user using email
        const nfcRes = await axios.get(
          `${API_BASE_URL}/api/nfc-user-by-email`,
          {
            params: { email },
          },
        );

        if (nfcRes.data.success) {
          setNfcUser(nfcRes.data.data);
        } else {
          setNfcUser(null);
        }
      } catch (err) {
        console.error("Error fetching user/NFC:", err);
        setNfcUser(null);
      }
    };

    if (token) fetchUserAndNfc();
  }, [token]);

  const sortedRewards = [...(nfcUser?.used_rewards || [])].sort(
    (a, b) => new Date(b.used_at) - new Date(a.used_at),
  );

  const paginatedRewards = sortedRewards.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const totalPages = Math.ceil(sortedRewards.length / itemsPerPage);

  const handleGetRewards = () => {
    setOpenToast(true);
  };

  return (
    <Box sx={{ pl: { xs: 0, md: 12 } }}>
      <Typography sx={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>
        My Gifts & Rewards
      </Typography>
      <Typography
        sx={{
          color: "#9CA3AF",
          mb: { xs: 2, md: 4 },
          fontSize: { xs: 12, md: 14 },
        }}
      >
        See all your gifts and rewards.
      </Typography>

      {/* ================= EMPTY STATE ================= */}
      {!nfcUser ? (
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            color: "#9CA3AF",
          }}
        >
          <RedeemIcon sx={{ fontSize: 50, color: "#6B7280", mb: 1 }} />

          <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
            No NFC Customer Found
          </Typography>

          <Typography sx={{ fontSize: 14 }}>
            You are not registered as an NFC customer yet.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          {/* ================= HEADER ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
              My Rewards
            </Typography>

            <Button
              variant="contained"
              onClick={handleGetRewards}
              sx={{
                background: "#C084FC",
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                "&:hover": { background: "#a855f7" },
              }}
            >
              Get Rewards
            </Button>
          </Box>

          {/* ================= GIFTS ================= */}
          <Typography sx={{ color: "#9CA3AF", fontSize: 14, mb: 1 }}>
            Available Gifts
          </Typography>

          {nfcUser.gift && Object.keys(nfcUser.gift).length > 0 ? (
            Object.entries(nfcUser.gift).map(([type, data], i) => {
              if (data.count <= 0) return null;

              return (
                <Box
                  key={i}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #1F2937, #111827)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <RedeemIcon sx={{ color: "#C084FC" }} />
                      <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                        {type}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 10,
                        background: "#16A34A",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {data.count}
                    </Box>
                  </Box>

                  {data.rewards.map((reward, idx) => (
                    <Typography
                      key={idx}
                      sx={{
                        color: "#D1D5DB",
                        fontSize: 13,
                        ml: 4,
                        mb: 0.5,
                      }}
                    >
                      • {reward}
                    </Typography>
                  ))}
                </Box>
              );
            })
          ) : (
            <Typography sx={{ color: "#6B7280" }}>
              No gifts available
            </Typography>
          )}

          {/* ================= USED REWARDS ================= */}
          <Typography sx={{ color: "#9CA3AF", fontSize: 14, mt: 3, mb: 1 }}>
            Used Rewards
          </Typography>

          {paginatedRewards.length > 0 ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {paginatedRewards.map((r, i) => {
                const id =
                  r.booking_id || r.sale_id || r.game_checkout_id || "N/A";

                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#22C55E", fontSize: 18 }} />

                    <Typography sx={{ color: "#E5E7EB", fontSize: 13 }}>
                      {r.type} • #{id}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6B7280",
                        fontSize: 12,
                        ml: "auto",
                      }}
                    >
                      {dayjs(r.used_at).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                );
              })}

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#fff",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Typography sx={{ color: "#6B7280" }}>No used rewards</Typography>
          )}

          {/* ================= TOAST ================= */}
          {openToast && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
              onClick={() => setOpenToast(false)}
            >
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: 350,
                  p: 3,
                  borderRadius: 3,
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <CheckCircleIcon
                  sx={{ color: "#22C55E", fontSize: 50, mb: 1 }}
                />

                <Typography
                  sx={{ color: "#fff", fontSize: 16, fontWeight: 600 }}
                >
                  Rewards Available!
                </Typography>

                <Typography sx={{ color: "#9CA3AF", fontSize: 13, mt: 1 }}>
                  Visit the PlayStation area and claim your rewards 🎮
                </Typography>

                <Button
                  onClick={() => setOpenToast(false)}
                  sx={{
                    mt: 2,
                    background: "#C084FC",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": { background: "#a855f7" },
                  }}
                  fullWidth
                >
                  Got it
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
