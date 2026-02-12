import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, Button, styled, useMediaQuery } from "@mui/material";

const SelectButton = styled(Button)(() => ({
  width: "100%",
  py: 1.5,
  borderRadius: 0,
  fontWeight: "bold",
  fontSize: "16px",
  textTransform: "none",
  color: "#fff",
  background: "linear-gradient(to right, #A905BC, #33B2F7)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(to right, #33B2F7, #A905BC)",
  },
}));

const SelectStation = ({ onNext, selectedStation, stations = [] }) => {
  const scrollRef = useRef(null);
  const [snaps, setSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isMobile = useMediaQuery("(max-width:899px)");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayIntervalRef = useRef(null);
  const [selectedStationName, setSelectedStationName] = useState(
    selectedStation || null,
  );
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  const visibleCount = isDesktop ? 3 : 1;
  const dotsToShow = Math.max(stations.length - visibleCount + 1, 1);

  // Sync local state with prop
  useEffect(() => {
    if (selectedStation !== undefined && selectedStation !== null) {
      setSelectedStationName(selectedStation);
    }
  }, [selectedStation]);

  // Calculate snap positions
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

  // Scroll to snap position
  const scrollToSnap = (snapIndex) => {
    const container = scrollRef.current;
    if (!container || snaps.length === 0) return;
    const left = snaps[snapIndex] || 0;
    container.scrollTo({ left, behavior: "smooth" });
  };

  const handleDotClick = (dotIdx) => {
    scrollToSnap(dotIdx);
  };

  // Update active dot while scrolling
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || snaps.length === 0) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      let firstVisibleIndex = 0;
      for (let i = 0; i < snaps.length; i++) {
        if (scrollLeft <= snaps[i]) {
          firstVisibleIndex = i;
          break;
        }
      }
      setSelectedIndex(Math.min(firstVisibleIndex, dotsToShow - 1));
      // Update current visible card index for mobile
      setCurrentVisibleIndex(firstVisibleIndex);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [snaps, dotsToShow]);

  // Drag to scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onPointerDown = (e) => {
      // Don't interfere with button clicks
      if (e.target.closest("button") || e.target.closest(".select-btn")) {
        return;
      }
      isDown = true;
      container.style.cursor = "grabbing";
      startX = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      scrollStart = container.scrollLeft;
      if (e.pointerId) container.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const x = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
      container.scrollLeft = scrollStart + (startX - x);
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

  // Auto-play with Intersection Observer
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAutoPlaying(entry.isIntersecting);
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
    return () => observer.disconnect();
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
    }, 3000);

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, snaps, dotsToShow]);

  const PS5_FALLBACK_IMAGES = {
    "PS5 Station 1": "/Images/f1.jpg",
    "PS5 Station 2": "/Images/f2.jpg",
    "PS5 Station 3": "/Images/f3.jpg",
    "PS5 Station 4": "/Images/f4.jpg",
    "PS5 Station 5": "/Images/f5.jpg",
  };

  const getStationImage = (station) => {
    if (station.thumbnail_url) return station.thumbnail_url;
    return "/Images/f1.jpg";
  };

  const handleSelect = (station) => {
    setSelectedStationName(station.name);
    if (onNext) onNext(station);
  };

  useEffect(() => {
    if (selectedStation) {
      setSelectedStationName(selectedStation.name || selectedStation);
    }
  }, [selectedStation]);

  const formatTime = (mins) => {
    if (!mins || isNaN(mins)) return "";

    if (mins < 60) return `${mins} mins`;

    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    if (remainingMins === 0) {
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    }

    return `${hours} hr ${remainingMins} mins`;
  };

  return (
    <Box
      sx={{
        color: "white",
        mb: 8,
      }}
    >
      {/* Select Station Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "18px", sm: "24px", md: "32px" },
          mb: 6,
        }}
      >
        Select Station
      </Typography>

      {/* Scrollable Stations Container */}
      <Box
        ref={scrollRef}
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          display: "flex",
          gap: 4,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {stations.map((station, idx) => {
          const isSelected = selectedStationName === station.name;
          const isCurrentCard = currentVisibleIndex === idx;
          return (
            <Box
              key={station.id}
              className="slide-item"
              sx={{
                position: "relative",
                minWidth: { xs: "85%", sm: "45%", md: "30%" },
                height: { xs: 400, md: 450 },
                scrollSnapAlign: "start",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
                "&:hover .bottom-glow": {
                  opacity: "1 !important",
                },
                "&:hover .select-btn": {
                  opacity: "1 !important",
                },
                "&:hover .selected-banner": {
                  opacity: "1 !important",
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
                    "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                    "polygon(5% 0, 95% 0, 100% 100%, 0 95%)",
                  ][idx % 5],
                  overflow: "hidden",
                  border: "2px solid rgba(51, 178, 247, 0.5)",
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
                  src={getStationImage(station)}
                  alt={station.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Select / Selected Button - Visible on hover (desktop) or scroll (mobile) */}
                <Box
                  className="select-btn"
                  sx={{
                    position: "absolute",
                    bottom: { xs: "38%", md: "40%" },
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    opacity: isMobile
                      ? isCurrentCard
                        ? 1
                        : 0
                      : isSelected
                        ? 1
                        : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {isSelected ? (
                    <Box
                      sx={{
                        width: "100%",
                        py: 1.5,
                        bgcolor: "#4CAF50",
                        textAlign: "center",
                        cursor: "default",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "16px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Selected
                      </Typography>
                    </Box>
                  ) : (
                    <SelectButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelect(station);
                      }}
                    >
                      Select
                    </SelectButton>
                  )}
                </Box>

                {/* Station Info */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.9)",
                    p: { xs: 2, md: 3 },
                    textAlign: "center",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontSize: { xs: "18px", md: "20px" },
                      fontWeight: 600,
                      color: "#33B2F7",
                    }}
                  >
                    {station.name}
                  </Typography>
                  {/* Prices in same line, centered */}
                  {(station.price || station.vrPrice) && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {station.price && station.vrPrice ? (
                        // Both Normal and VR prices
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", md: "10px" },
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          Price: Rs. {station.price} /{" "}
                          {formatTime(station.time)} & VR: Rs. {station.vrPrice}{" "}
                          / {formatTime(station.vrTime)}
                        </Typography>
                      ) : station.price ? (
                        // Only normal price
                        <Typography
                          sx={{
                            fontSize: { xs: "13px", md: "14px" },
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          Price: Rs. {station.price} /{" "}
                          {formatTime(station.time)}
                        </Typography>
                      ) : station.vrPrice ? (
                        // Only VR price
                        <Typography
                          sx={{
                            fontSize: { xs: "13px", md: "14px" },
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          VR: Rs. {station.vrPrice} /{" "}
                          {formatTime(station.vrTime)}
                        </Typography>
                      ) : null}
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "10px", md: "12px" },
                      color: "gray.300",
                      lineHeight: 2.1,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {station.description ||
                      "Latest PS5 games with 4K graphics and immersive gameplay on premium gaming setups"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Dots Indicator */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, gap: 1.5 }}>
        {Array.from({ length: dotsToShow }).map((_, idx) => (
          <Box
            key={idx}
            onClick={() => handleDotClick(idx)}
            sx={{
              width: selectedIndex === idx ? 12 : 8,
              height: selectedIndex === idx ? 12 : 8,
              borderRadius: "50%",
              bgcolor: selectedIndex === idx ? "#D100FF" : "#555",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectStation;
