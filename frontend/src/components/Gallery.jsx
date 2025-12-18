import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  GlobalStyles,
} from "@mui/material";

const GalleryView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const headerGradient = "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)";
  const imageBorderGradient =
    "linear-gradient(to right, #9F00FF, #B86BFF, #00D3FE, #3C7CFA)";

  const applyGradientText = (gradient) => ({
    background: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  });

  useEffect(() => {
    fetch("http://localhost:8001/api/galleries")
      .then((res) => res.json())
      .then((data) => setGalleryImages(data))
      .catch(console.error);
  }, []);

  const imageCardStyle = {
    flexShrink: 0,
    width: isMobile ? "280px" : "325px",
    height: isMobile ? "140px" : "220px",
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    marginRight: isMobile ? "16px" : "24px",
    "&:last-child": { marginRight: 0 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "2px",
      background: imageBorderGradient,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      inset: "2px",
      borderRadius: "inherit",
      boxShadow: "inset 0 0 10px 2px rgba(160, 51, 255, 0.4)",
      pointerEvents: "none",
    },

    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 8px 30px rgba(160, 51, 255, 0.6)",
      "&::after": {
        boxShadow: "inset 0 0 15px 3px rgba(160, 51, 255, 0.6)",
      },
    },
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAutoPlaying(true);
          } else {
            setIsAutoPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isAutoPlaying) return;

    let scrollDirection = 1;
    const scrollSpeed = 1;

    const autoScroll = () => {
      if (!container) return;

      container.scrollLeft += scrollSpeed * scrollDirection;

      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        scrollDirection = -1;
      } else if (container.scrollLeft <= 0) {
        scrollDirection = 1;
      }
    };

    const intervalId = setInterval(autoScroll, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoPlaying]);

  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#0A0D17",
          color: "#fff",
          padding: isMobile ? "40px 20px" : "60px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Box sx={{ maxWidth: 900, textAlign: "center", mb: isMobile ? 6 : 10 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              ...applyGradientText(headerGradient),
              fontFamily: "BRUSHSTRIKE",
              fontWeight: 400,
              fontSize: isMobile ? "48px" : "84px",
              lineHeight: isMobile ? "52px" : "90px",
              mb: 3,
              letterSpacing: "0.03em",
            }}
          >
            Gallery View
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              mb: isMobile ? 5 : 8,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.5,
              fontSize: isMobile ? "1rem" : "1.09rem",
              maxWidth: "900px",
              margin: "0 auto",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            Get ready to battle it out! Join our exciting events and competitive
            tournaments featuring top games, epic challenges, and massive
            rewards. Whether you're a casual player or a pro, there's always a
            stage for you to shine.{" "}
          </Typography>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            width: "100%",
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box sx={{ display: "inline-flex", flexDirection: "column", gap: 3 }}>
            {/* FIRST ROW */}
            <Box sx={{ display: "flex" }}>
              {galleryImages.length > 0 ? (
                galleryImages.map((img, i) => (
                  <Box key={`row1-${i}`} sx={imageCardStyle}>
                    <img
                      src={img.image}
                      alt="gallery"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "inherit",
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    opacity: 0.8,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  📸 No gallery images available
                </Typography>
              )}
            </Box>

            {/* SECOND ROW */}
            {galleryImages.length > 1 && (
              <Box sx={{ display: "flex" }}>
                {galleryImages
                  .slice()
                  .reverse()
                  .map((img, i) => (
                    <Box key={`row2-${i}`} sx={imageCardStyle}>
                      <img
                        src={img.image}
                        alt="gallery"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "inherit",
                        }}
                      />
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GalleryView;
