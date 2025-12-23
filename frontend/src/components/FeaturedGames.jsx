import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const games = [
  {
    title: "PS5 Stations",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    descLines: [
      "Latest PS5 games with 4K graphics",
      "and immersive gameplay",
      "on premium gaming setups",
    ],
    img: "./images/f1.jpg",
    category: 'ps5',
  },
  {
    title: "Pool Tables",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    descLines: [
      "Latest PS5 games with 4K graphics",
      "and immersive gameplay",
      "on premium gaming setups",
    ],
    img: "./images/f5.jpg",
    category: 'pool',
  },
  {
    title: "Racing Simulators",
    desc: "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups",
    descLines: [
      "Latest PS5 games with 4K graphics",
      "and immersive gameplay",
      "on premium gaming setups",
    ],
    img: "./images/f3.jpg",
    category: 'racing',
  },
];

export default function FeaturedGames() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [snaps, setSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIntervalRef = useRef(null);

  // number of visible items per slide
  const visibleCount = isDesktop ? 3 : 1;
  const dotsToShow = Math.max(games.length - visibleCount + 1, 1);

  // calculate left offsets for each slide
  const calcSnaps = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const children = Array.from(container.querySelectorAll(".slide-item"));
    const positions = children.map((child) => child.offsetLeft);
    setSnaps(positions);
  }, []);

  useEffect(() => {
    calcSnaps();
    const container = scrollRef.current;
    if (!container) return;

    const imgs = Array.from(container.querySelectorAll("img"));
    const onImgLoad = () => calcSnaps();
    imgs.forEach((img) => img.addEventListener("load", onImgLoad));
    window.addEventListener("resize", calcSnaps);
    const t = setTimeout(calcSnaps, 120);

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      window.removeEventListener("resize", calcSnaps);
      clearTimeout(t);
    };
  }, [calcSnaps]);

  // scroll to a particular snap
  const scrollToSnap = useCallback((snapIndex) => {
    const container = scrollRef.current;
    if (!container || snaps.length === 0) return;
    const left = snaps[snapIndex] || 0;
    container.scrollTo({ left, behavior: "smooth" });
  }, [snaps]);

  // Scroll to the starting slide of that dot
  const handleDotClick = (dotIdx) => {
    scrollToSnap(dotIdx); 
  };

  // Update active dot while scrolling
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || snaps.length === 0) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      // Find the first fully visible item
      let firstVisibleIndex = 0;
      for (let i = 0; i < snaps.length; i++) {
        if (scrollLeft <= snaps[i]) {
          firstVisibleIndex = i;
          break;
        }
      }
      // Clamp the active dot to max possible dot
      setSelectedIndex(Math.min(firstVisibleIndex, dotsToShow - 1));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [snaps, dotsToShow]);

  // drag-to-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onPointerDown = (e) => {
      // Don't interfere with buttons or interactive elements
      if (e.target.closest('button') || e.target.closest('a')) {
        return;
      }
      isDown = true;
      container.style.cursor = "grabbing";
      startX = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      scrollStart = container.scrollLeft;
      if (e.pointerId) container.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const x = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      const diff = Math.abs(startX - x);
      if (diff > 5) {
        container.scrollLeft = scrollStart + (startX - x);
      }
    };
    const onPointerUp = (e) => {
      isDown = false;
      container.style.cursor = "grab";
      if (e?.pointerId) container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);
    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      container.style.cursor = "";
    };
  }, []);

  // Auto-play functionality with Intersection Observer
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

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying || snaps.length === 0) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    autoPlayIntervalRef.current = setInterval(() => {
      setSelectedIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % dotsToShow;
        scrollToSnap(nextIndex);
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, snaps, dotsToShow, scrollToSnap]);

  return (
    <>
      <GlobalStyles
        styles={{
          "@font-face": {
            fontFamily: "BRUSHSTRIKE",
            src: `url("/fonts/BRUSHSTRIKE.ttf") format("truetype")`,
          },
        }}
        
      />

      <Box
        component="section"
        id="featured-games"
        sx={{
          position: "relative",
          bgcolor: "#0A0D17",
          py: { xs: 4, md: 2 },
          px: { xs: 2, sm: 4 },
          color: "white",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "60%",
            left: "50%",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(51, 178, 247, 0.73), rgba(84, 14, 92, 0.6), transparent 50%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(120px)",
            zIndex: 0,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "32px", sm: "44px", md: "75px" },
              fontFamily: "BRUSHSTRIKE",
              fontWeight: 400,
              background:
                "linear-gradient(to right, #A033FF, #D100FF, #00C3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 1.5, md: 2 },
              lineHeight: 1.3,
            }}
          >
            Featured Games
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray.400",
              maxWidth: 950,
              mx: "auto",
              fontSize: { xs: "14px", md: "16px" },
              px: { xs: 1, sm: 0 },
            }}
          >
            Dive into our hottest picks! From immersive VR worlds and thrilling
            racing simulators to classic arcade battles and next-gen PS5 action
            — these are the games that define the ultimate gaming experience.
          </Typography>
        </Box>

        {/* Carousel */}
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            maxWidth: "1200px",
            mx: "auto",
          }}
          ref={scrollRef}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              px: { xs: 1, sm: 0 },
            }}
          >
            {games.map((game, idx) => (
              <Box
                key={idx}
                className="slide-item"
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 240, sm: 320, md: 380 },
                  height: { xs: 320, sm: 420, md: 500 },
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  paddingBottom: "4px",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                  "&:hover .game-title": { color: "#33B2F7 !important" },
                  "&:hover .bottom-glow": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    clipPath: [
                      "polygon(10% 0, 100% 0, 80% 100%, 0 90%)",
                      "polygon(15% 0, 98% 0, 100% 100%, 0 100%)",
                      "polygon(2% 0, 98% 0, 90% 100%, 0 100%)",
                      "polygon(20% 0, 95% 0, 98% 100%, 0% 100%)",
                      "polygon(0% 0, 100% 0, 80% 100%, 0 100%)",
                    ][idx % 5],
                    overflow: "hidden",
                    border: "2px solid rgba(51, 178, 247, 0.5)",
                    transition: "all 0.3s ease",
                    position: "relative",
                  }}
                >
                  {/* Bottom white line on hover */}
                  <Box
                    className="bottom-glow"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#FFFFFF",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 10,
                    }}
                  />
                  <Box
                    component="img"
                    src={game.img}
                    alt={game.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Booking Now Button */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "36%",
                      left: 0,
                      right: 0,
                      zIndex: 10,
                      pointerEvents: "auto",
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerMove={(e) => e.stopPropagation()}
                  >
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/booking", { state: { from: '/', stationCategory: game.category } });
                      }}
                      sx={{
                        width: "100%",
                        py: { xs: 1.1, md: 1.3 },
                        borderRadius: 0,
                        fontWeight: "bold",
                        fontSize: { xs: "17px", md: "19px" },
                        textTransform: "none",
                        color: "#fff",
                        background: "linear-gradient(to right, #A905BC, #33B2F7)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(to right, #33B2F7, #A905BC)",
                        },
                      }}
                    >
                      Booking Now
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 2,
                      right: 0,
                      height: "44%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        bgcolor: "rgba(0,0,0)",
                        p: { xs: 1.4, sm: 1.85, md: 2.1 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        className="game-title"
                        variant="h6"
                        sx={{
                          mb: 0.1,
                          fontSize: { xs: "19px", sm: "22px", md: "24px" },
                          fontWeight: 700,
                          transition: "color 0.3s ease",
                          color: "#FFFFFF",
                        }}
                      >
                        {game.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "14px", sm: "15px", md: "16px" },
                          color: "#FFFFFF",
                          lineHeight: 1.32,
                        }}
                      >
                        {(game.descLines ?? [game.desc]).map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx !== (game.descLines?.length ?? 1) - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 6 },
          }}
        >
        </Box>
      </Box>
    </>
  );
}
