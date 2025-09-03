
import React from "react";
import { Box, Grid, Typography, Card, CardMedia, Button } from "@mui/material";
import { styled } from "@mui/system";


const GradientText = styled(Typography)({
    background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "70px",
});


const GradientButton = styled(Button)({
    background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "24px",
    textTransform: "none",
    fontWeight: 600,
    display: "block",
    margin: "40px auto 0",
    "&:hover": {
        opacity: 0.9,
        background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
    },
});


const GradientBorderCard = styled("div")({
    borderRadius: "22px",
    padding: "1.5px",
    background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 60px rgba(51,178,247,0.2), 0 0 80px rgba(207,54,225,0.1)",
    transition: "transform 0.3s",
    "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 15px 50px rgba(0,0,0,0.9), 0 0 80px rgba(51,178,247,0.3), 0 0 100px rgba(207,54,225,0.2)",
    },
});


const InnerCard = styled(Card)({
    borderRadius: "21px",
    background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)",
    color: "#fff",
    textAlign: "center",
    padding: "0px",
    minHeight: "460px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
});


const ImageWrapper = styled("div")({
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "16px",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "50%",
        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
    },
});

const events = [
    { title: "Call of Duty Championship", date: "AUG 25, 2025", countdown: "3d 14h 25m 3s", image: "/images/e2.jpg" },
    { title: "Pubg Championship", date: "SEP 08, 2025", countdown: "10d 12h 15m 12s", image: "/images/e1.jpg" },
    { title: "Car Game Championship", date: "SEP 15, 2025", countdown: "17d 08h 25m 2s", image: "/images/e3.jpg" },
];

export const EventsSection = () => {
    return (
        <Box
            sx={{
                width:'100%',
                background: "#000",
                py: 8,
                px: 2,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "700px",
                    height: "700px",
                    background: "radial-gradient(circle, rgba(51,178,247,0.15) 0%, rgba(207,54,225,0.1) 100%)",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                    borderRadius: "50%",
                    filter: "blur(100px)",
                },
            }}
        >
            <GradientText variant="h3">Events & Tournaments</GradientText>

            <Typography
                variant="body1"
                sx={{ color: "#aaa", textAlign: "center", maxWidth: "600px", margin: "0 auto 40px", position: "relative", zIndex: 1 }}
            >
                Get ready to battle it out! Join our exciting events and competitive tournaments featuring top
                games, epic challenges, and massive rewards. Whether you're a casual player or a pro, there's
                always a stage for you to shine.
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ position: "relative", zIndex: 1 }}>
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <GradientBorderCard>
                            <InnerCard>
                                <ImageWrapper>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={event.image}
                                         
                                        alt={event.title}
                                        sx={{ width: "100%", display: "block" }}
                                    />
                                </ImageWrapper>
                                <GradientText sx={{ fontSize: "22px" }}>UPCOMING</GradientText>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                      //  background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
                                      background: "White",
                                        color: "white",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {event.title}
                                </Typography>
                                 <GradientText  sx={{ color: "#aaa", mb: 1 ,fontSize:"20px"}}>{event.date}</GradientText>
                                <Typography  sx={{ color: "#f8f0f9ff", fontWeight: 600,fontSize:"20px" }}>{event.countdown}</Typography>
                            </InnerCard>
                        </GradientBorderCard>
                    </Grid>
                ))}
            </Grid>

            <GradientButton>See All Events</GradientButton>
        </Box>
    );
};
