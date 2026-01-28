import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const OtherGames = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const otherGames = [
    {
      id: 1,
      title: "Arcade Machine",
      description:
        "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    displayPrice: "Rs 100 / Coin",
      image: "/Images/pic1.png",
    },
    {
      id: 2,
      title: "Archery Gaming",
      description:
        "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    displayPrice: "Rs 600 / 5 Arrows",
      image: "/Images/pic2.png",
    },
    {
      id: 3,
      title: "Carrom Gaming",
      description:
        "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    displayPrice: "Rs 75 / hr (1 Person)",
      image: "/Images/pic3.png",
    },
  ];

  const cardVariants = [
    "polygon(10% 0, 100% 0, 88% 100%, 0 92%)",
    "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
    "polygon(6% 0, 98% 0, 94% 100%, 0 100%)",
  ];

  // Auto-play functionality with Intersection Observer for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAutoPlaying(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile]);

  // Auto-scroll effect for mobile
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return;

    const container = scrollRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      if (currentScroll >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: currentScroll + container.clientWidth, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [isMobile, isAutoPlaying]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "#0A0D17",
        py: { xs: 5, md: 10 },
        px: { xs: 1.5, sm: 4 },
        color: "white",
        overflow: "hidden",
        // Background glow effect
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: { xs: "400px", md: "800px" },
          height: { xs: "400px", md: "800px" },
          background:
            "radial-gradient(circle, rgba(51, 178, 247, 0.3), rgba(169, 5, 188, 0.25), transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: { xs: "blur(100px)", md: "blur(150px)" },
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{ position: "relative", zIndex: 2, maxWidth: "1400px", mx: "auto" }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "34px", sm: "44px", md: "75px" },
              fontFamily: "BRUSHSTRIKE, sans-serif",
              fontWeight: 400,
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 2, md: 3 },
              lineHeight: 1.15,
            }}
          >
            OTHER GAMES
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "8px", sm: "14px", md: "16px" },
              lineHeight: 1.3,
              maxWidth: "1100px",
              mx: "auto",
              px: { xs: 2, sm: 0 },
            }}
          >
            Dive into our hottest picks! From immersive VR worlds and thrilling
            racing simulators to classic arcade battles and next-gen PS5 action
            — these are the games that define the ultimate gaming experience
          </Typography>
        </Box>

        {/* Games Grid */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 4 },
            flexWrap: { xs: "nowrap", sm: "wrap" },
            overflowX: { xs: "auto", sm: "visible" },
            scrollSnapType: { xs: "x mandatory", sm: "none" },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {otherGames.map((game, idx) => {
            const clipPath = cardVariants[idx % cardVariants.length];

            return (
              <Box
                key={game.id}
                sx={{
                  flex: { xs: "0 0 85%", sm: "0 0 auto" },
                  width: { xs: "85%", sm: "280px", md: "360px" },
                  height: { xs: "280px", sm: "380px", md: "500px" },
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  scrollSnapAlign: { xs: "center", sm: "none" },
                  "&:hover": {
                    transform: { xs: "none", md: "scale(1.02)" },
                    boxShadow: { xs: "0 20px 50px rgba(0,0,0,0.35)", md: "0 25px 60px rgba(0,0,0,0.45)" },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    clipPath,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={game.image}
                    alt={game.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  {/* Text Content - Bottom */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: { xs: "38%", sm: "34%", md: "32%" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        bgcolor: "#000",
                        p: { xs: 1.25, sm: 1.75, md: 2.25 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        className="game-title"
                        variant="h6"
                        sx={{
                          mb: { xs: 0.5, md: 1 },
                          fontSize: { xs: "13px", sm: "15px", md: "18px" },
                          fontWeight: 700,
                          transition: "color 0.3s ease",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {game.title}
                      </Typography>

                       <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "15px", sm: "16px", md: "18px" },
                          color: "#00d7ec",
                          opacity: 0.9,
                          textAlign: "center",
                          lineHeight: 1.6,
                          fontWeight:"bold",
                        }}
                      >
                        {game.displayPrice}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          color: "#FFFFFF",
                          opacity: 0.9,
                          textAlign: "center",
                          lineHeight: { xs: 1.4, md: 1.6 },
                          display: { xs: "-webkit-box", md: "block" },
                          WebkitLineClamp: { xs: 3, md: "unset" },
                          WebkitBoxOrient: "vertical",
                          overflow: { xs: "hidden", md: "visible" },
                        }}
                      >
                        {game.description}
                      </Typography>
                       
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherGames;
