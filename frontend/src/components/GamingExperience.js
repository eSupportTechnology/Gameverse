import React from "react";
import { Box, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";

const firstRowFeatures = [
    {
        title: "Surround Sound",
        description: "+ Ambient Lighting",
        image: "/images/f7.jpg",
    },
    {
        title: "Snacks, desserts, juice & ice cream bar",
        description: "",
        image: "/images/ice.png",
    },
    {
        title: "Supreme and premium lounge seating",
        description: "",
        image: "/images/f9.png",
    },
    {
        title: "NFC Cards – Loyalty / Membership / Offers",
        description: "",
        image: "/images/f10.png",
    },
];

const secondRowFeatures = [
    {
        title: "Weekly and competitive tournaments",
        description: "",
        image: "/images/f11.png",
    },
    {
        title: "Neon party nights",
        description: "",
        image: "/images/f12.png",
    },
    {
        title: "Powerful Gaming Tool",
        description: "",
        image: "/images/f8.png",
    },
];

const FeatureCard = ({ feature }) => (
    <Card
        sx={{
            background: "transparent",
            boxShadow: "none",
            textAlign: "center",
            color: "#fff",
            minHeight: 250, // taller card
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}
    >

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
            }}
        >
            <CardMedia
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{
                    width: 160,
                    height: 160,
                    borderRadius: 3,
                    objectFit: "cover",
                    transition: "0.3s",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 25px #CF36E1",
                    },
                }}
            />
        </Box>


        <CardContent sx={{ p: 0 }}>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    color: "#fff",
                    textAlign: "center",
                    maxWidth: "220px",
                    mx: "auto",
                }}
            >
                {feature.title}
            </Typography>
            {feature.description && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "rgba(255,255,255,0.7)",
                        textAlign: "center",
                        maxWidth: "200px",
                        mx: "auto",
                        mt: 1,
                    }}
                >
                    {feature.description}
                </Typography>
            )}
        </CardContent>
    </Card>
);

export default function GamingExperience() {
    return (
        <Box
            sx={{
                py: 8,
                px: { xs: 2, md: 8 },
                minHeight: "100vh",
                background: "#000",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "800px",
                    height: "800px",
                    background:
                        "radial-gradient(circle, rgba(51,178,247,0.6), rgba(207,54,225,0.6), transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(120px)",
                    zIndex: 0,
                },
            }}
        >
            <Box sx={{ position: "relative", zIndex: 1, mt: 5 }}>

                <Typography
                    // variant="h3"
                    fontSize="70px"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        background: "linear-gradient(90deg, #33B2F7, #CF36E1)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                    }}
                >
                    Why Choose Us
                </Typography>


                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: "800px",
                        mx: "auto",
                        color: "rgba(255,255,255,0.7)",
                        mb: 4,
                    }}
                >
                    Level up your fun with unbeatable variety, cutting-edge gear, and a vibrant atmosphere
                    designed for every gamer. Whether you're here to compete, unwind, or explore the latest in
                    gaming tech, we deliver an experience like no other.
                </Typography>


                <Grid container justifyContent="center" sx={{ mb: 6 }}>
                    {firstRowFeatures.map((feature, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i} sx={{ m: 4 }}>
                            <FeatureCard feature={feature} />
                        </Grid>
                    ))}
                </Grid>


                <Grid container justifyContent="center">
                    {secondRowFeatures.map((feature, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i} sx={{ m: 4 }}>
                            <FeatureCard feature={feature} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
