import { Box, GlobalStyles, Typography } from "@mui/material";

const Privacy = () => {
  return (
    <>
      {/* font-face */}
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/Brushstrike.ttf") format("truetype")`,
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
          PRIVACY POLICY
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: 4,
            fontSize: "14px",
          }}
        >
          Gameverse respects your privacy and is committed to protecting your
          personal information. We collect customer information such as name,
          contact number, and email address only for booking, payment
          processing, and customer support purposes. Payment information is
          securely processed via third-party payment gateways and is not stored
          on our servers. We do not sell, trade, or share personal information
          with third parties except as required to provide our services or by
          law.
        </Typography>
      </Box>
    </>
  );
};

export default Privacy;
