import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const games = [
    {
        title: "PlayStation 5 Gaming",
        desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
        img: "./images/f1.jpg",
    },
    {
        title: "VR Experiences",
        desc: "Step into virtual worlds with our cutting-edge VR headsets and immersive experiences",
        img: "./images/f2.jpg",
    },
    {
        title: "PlayStation 5 Gaming",
        desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
        img: "./images/f3.jpg",
    },

    {
        title: "Billiards & Pool",
        desc: "Classic billiards tables in a modern neon-lit vibe environment for competitive gameplay",
        img: "./images/f4.jpg",
    },
    {
        title: "Arcade Machines",
        desc: "Retro and modern arcade games with coin-operated machines for nostalgic gaming fun",
        img: "./images/f5.jpg",
    },
    {
        title: "PlayStation 5 Gaming",
        desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
        img: "./images/f6.jpg",
    },
];

export default function FeaturedGames() {
    return (
        <Box
            component="section"
            /*
            sx={{
              bgcolor: "background.default",
              background: "linear-gradient(to bottom, #0b0c10, #1f2833)",
              py: 8,
              px: 2,
              color: "white",
            }}*/

            sx={{
                bgcolor: "#0b0c10", // solid black background
                py: 8,
                px: 2,
                color: "white",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "63%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
                    height: "200px",
                    background: "radial-gradient(circle, rgba(218, 60, 205, 0.9) 5%, rgba(62, 112, 229, 0.88) 3%, transparent 100%)",
                    zIndex: 0,
                    filter: "blur(100px)",
                }}
            />















            <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mb: 6 }}>
                <Typography
                    //variant="h3"
                    fontSize="70px"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        background: "linear-gradient(to right, #ec4899, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                    }}
                >
                    Featured Games
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "gray.400", maxWidth: 700, mx: "auto" }}
                >
                    Dive into our hottest picks! From immersive VR worlds and thrilling
                    racing simulators to classic arcade battles and next-gen PS5 action —
                    these are the games that define the ultimate gaming experience
                </Typography>
            </Box>


            <Grid container spacing={4} justifyContent="center">
                {games.map((game, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                bgcolor: "#251C29",
                                borderRadius: 2,
                                overflow: "hidden",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={game.img}
                                alt={game.title}
                            />
                            <CardContent>
                                <Typography variant="h6" color="#FFFFFF" sx={{ mb: 1 }}>
                                    {game.title}
                                </Typography>
                                <Typography variant="body2" color="#FFFFFF" >
                                    {game.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Button
                    variant="contained"
                    sx={{
                        px: 5,
                        py: 1.5,
                        borderRadius: "50px",
                        mb: 4,
                        fontWeight: "medium",
                        background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                        "&:hover": {
                            background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                        },
                    }}
                >
                    View All Games & Pricing
                </Button>
            </Box>
        </Box>
    );
}
