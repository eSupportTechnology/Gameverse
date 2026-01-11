import { Box, GlobalStyles, Typography } from "@mui/material";

const Terms = () => {
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
          TERMS & CONDITIONS
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: 4,
            fontSize: "14px",
          }}
        >
          By using Gameverse’s website and services, you agree to comply with
          these Terms and Conditions. All bookings and payments are subject to
          availability. Gameverse reserves the right to modify pricing,
          services, or operating hours without prior notice. Customers are
          responsible for adhering to in-lounge rules and regulations during
          their visit. Any misuse of equipment or violation of rules may result
          in termination of the session without refund.
        </Typography>
      </Box>
    </>
  );
};

export default Terms;
