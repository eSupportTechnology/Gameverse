import {
  Box,
  GlobalStyles,
  Typography
} from "@mui/material";

const Refund = () => {

  return (
    <>
      {/* font-face */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
          },
        }}
      />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #06080F, #0A0D17)",
          pt: 3,
          pb: 1,
          px: { xs: 3, md: 20 },
          color: "#fff",
        }}
      >
        {/* PAGE TITLE */}
        <Typography
          sx={{
            fontSize: { xs: "36px", sm: "50px", md: "70px" },
            fontFamily: "BRUSHSTRIKE",
            textAlign: "center",
            background: "linear-gradient(to right, #CF36E1, #15A2EF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          RETURN / REFUND POLICY
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#bbbbbb",
            mb: 4,
            fontSize: "14px",
          }}
        >
          Payments made for game sessions, bookings, or packages at Gameverse
          are generally non-refundable once the session has started. If a
          booking is cancelled at least 24 hours in advance, customers may
          request a reschedule or credit for future use, subject to
          availability. In case of technical issues or service disruptions
          caused by Gameverse, refunds or rescheduling will be handled on a
          case-by-case basis. For refund inquiries, please contact us at
          info@gameverse.lk.
        </Typography>
      </Box>
    </>
  );
};

export default Refund;
