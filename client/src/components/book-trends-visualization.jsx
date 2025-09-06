"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "react-bootstrap";

// Sample data for book trends
const genreTrendsData = [
  { year: 2019, fiction: 45, nonFiction: 30, mystery: 15, sciFi: 10 },
  { year: 2020, fiction: 40, nonFiction: 35, mystery: 15, sciFi: 10 },
  { year: 2021, fiction: 38, nonFiction: 37, mystery: 12, sciFi: 13 },
  { year: 2022, fiction: 35, nonFiction: 40, mystery: 10, sciFi: 15 },
  { year: 2023, fiction: 32, nonFiction: 42, mystery: 8, sciFi: 18 },
];

const popularityData = [
  { title: "To Kill a Mockingbird", score: 95 },
  { title: "1984", score: 92 },
  { title: "Pride and Prejudice", score: 88 },
  { title: "The Great Gatsby", score: 85 },
  { title: "The Catcher in the Rye", score: 82 },
];

const BookTrendsVisualization = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState("genres");
  const [hoveredBar, setHoveredBar] = useState(null); // Stores ID of hovered bar (e.g., "0-0" for genre, 0 for popularity)
  const [tooltip, setTooltip] = useState(null); // { x, y, content }
  const [animateChart, setAnimateChart] = useState(false);
  const chartRef = useRef(null);
  const containerRef = useRef(null); // Ref for the chart's parent container

  // Function to draw the genre chart
  const drawGenreChart = useCallback(() => {
    if (!chartRef.current || !containerRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match its display size
    canvas.width = containerRef.current.clientWidth;
    canvas.height = compact ? 320 : 400;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 40, right: 30, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "rgba(10, 31, 28, 0.5)";
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.font = "16px var(--font-cormorant)";
    ctx.fillStyle = "#cdaf73";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Genre Trends Over Time", width / 2, 15);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom); // x-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom); // y-axis
    ctx.strokeStyle = "rgba(205, 175, 115, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw x-axis labels (years)
    const barWidth = (chartWidth / genreTrendsData.length / 4) * 0.8; // 4 genres, 80% width
    const groupWidth = chartWidth / genreTrendsData.length;
    const barSpacing = barWidth * 0.2;

    genreTrendsData.forEach((data, i) => {
      const x = padding.left + i * groupWidth + groupWidth / 2;
      ctx.font = "12px var(--font-cormorant)";
      ctx.fillStyle = "#cdaf73";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(data.year.toString(), x, height - padding.bottom + 15);
    });

    // Draw y-axis labels (percentages)
    for (let i = 0; i <= 100; i += 20) {
      const y = height - padding.bottom - (i / 100) * chartHeight;
      ctx.font = "10px var(--font-lora)";
      ctx.fillStyle = "#a8a090";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${i}%`, padding.left - 10, y);

      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.strokeStyle = "rgba(205, 175, 115, 0.1)";
      ctx.stroke();
    }

    // Define colors for each genre
    const colors = {
      fiction: "rgba(205, 175, 115, 0.8)",
      nonFiction: "rgba(150, 130, 85, 0.8)",
      mystery: "rgba(100, 85, 55, 0.8)",
      sciFi: "rgba(70, 60, 40, 0.8)",
    };

    // Draw bars with animation
    const currentAnimationProgress = animateChart ? 1 : 0;
    const genres = ["fiction", "nonFiction", "mystery", "sciFi"];
    const genreLabels = {
      fiction: "Fiction",
      nonFiction: "Non-Fiction",
      mystery: "Mystery",
      sciFi: "Sci-Fi",
    };

    genreTrendsData.forEach((data, i) => {
      const groupX = padding.left + i * groupWidth;

      genres.forEach((genre, j) => {
        const value = data[genre];
        // Apply animation to bar height
        const barHeight =
          (value / 100) * chartHeight * currentAnimationProgress;
        const x = groupX + j * (barWidth + barSpacing) + groupWidth * 0.1;
        const y = height - padding.bottom - barHeight;

        // Draw bar
        ctx.fillStyle =
          hoveredBar === `${i}-${j}`
            ? colors[genre].replace("0.8", "1") // Darker on hover
            : colors[genre];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw value on top of bar if tall enough
        if (barHeight > 20) {
          ctx.font = "10px var(--font-lora)";
          ctx.fillStyle = "#e9e2d0";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
        }
      });
    });

    // Draw legend
    const legendX = padding.left;
    const legendY = padding.top - 15;
    const legendItemWidth = chartWidth / 4;

    genres.forEach((genre, i) => {
      const x = legendX + i * legendItemWidth;
      const y = legendY;

      // Draw color box
      ctx.fillStyle = colors[genre];
      ctx.fillRect(x, y, 10, 10);

      // Draw label
      ctx.font = "12px var(--font-cormorant)";
      ctx.fillStyle = "#cdaf73";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(genreLabels[genre], x + 15, y + 5);
    });
  }, [animateChart, hoveredBar, compact]); // Add compact as a dependency

  // Function to draw the popularity chart
  const drawPopularityChart = useCallback(() => {
    if (!chartRef.current || !containerRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match its display size
    canvas.width = containerRef.current.clientWidth;
    canvas.height = compact ? 320 : 400;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 40, right: 30, bottom: 60, left: 150 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "rgba(10, 31, 28, 0.5)";
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.font = "16px var(--font-cormorant)";
    ctx.fillStyle = "#cdaf73";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Most Popular Classic Books", width / 2, 15);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom); // x-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom); // y-axis
    ctx.strokeStyle = "rgba(205, 175, 115, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw x-axis labels (scores)
    for (let i = 0; i <= 100; i += 20) {
      const x = padding.left + (i / 100) * chartWidth;
      ctx.font = "10px var(--font-lora)";
      ctx.fillStyle = "#a8a090";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(i.toString(), x, height - padding.bottom + 15);

      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.strokeStyle = "rgba(205, 175, 115, 0.1)";
      ctx.stroke();
    }

    // Calculate bar height and spacing
    const barHeight = (chartHeight / popularityData.length) * 0.7;
    const barSpacing = (chartHeight / popularityData.length) * 0.3;

    // Draw bars with animation
    const currentAnimationProgress = animateChart ? 1 : 0;

    popularityData.forEach((book, i) => {
      const y = padding.top + i * (barHeight + barSpacing);
      const barWidth =
        (book.score / 100) * chartWidth * currentAnimationProgress;

      // Draw book title
      ctx.font = "12px var(--font-cormorant)";
      ctx.fillStyle = "#cdaf73";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(book.title, padding.left - 10, y + barHeight / 2);

      // Draw bar
      const gradient = ctx.createLinearGradient(
        padding.left,
        0,
        padding.left + barWidth,
        0
      );
      gradient.addColorStop(0, "rgba(205, 175, 115, 0.8)");
      gradient.addColorStop(1, "rgba(205, 175, 115, 0.4)");

      ctx.fillStyle = hoveredBar === i ? "rgba(205, 175, 115, 0.9)" : gradient;
      ctx.fillRect(padding.left, y, barWidth, barHeight);

      // Draw score at end of bar
      ctx.font = "10px var(--font-lora)";
      ctx.fillStyle = "#e9e2d0";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        book.score.toString(),
        padding.left + barWidth + 5,
        y + barHeight / 2
      );
    });
  }, [animateChart, hoveredBar, compact]); // Add compact as a dependency

  // Effect to handle chart drawing and resizing
  useEffect(() => {
    const renderChart = () => {
      // Trigger animation every time the chart is rendered (e.g., on tab change or resize)
      setAnimateChart(false);
      setTimeout(() => setAnimateChart(true), 100);

      if (activeTab === "genres") {
        drawGenreChart();
      } else if (activeTab === "popularity") {
        drawPopularityChart();
      }
    };

    const handleResize = () => {
      renderChart(); // Redraw chart on window resize
    };

    renderChart(); // Initial render

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, compact, drawGenreChart, drawPopularityChart]); // Dependencies for the effect

  // Mouse move handler for tooltips and hover state
  const handleMouseMove = (e) => {
    if (!chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let newHoveredBar = null;
    let newTooltip = null;

    if (activeTab === "genres") {
      const padding = { top: 40, right: 30, bottom: 60, left: 60 };
      const chartWidth = chartRef.current.width - padding.left - padding.right;
      const chartHeight =
        chartRef.current.height - padding.top - padding.bottom;
      const groupWidth = chartWidth / genreTrendsData.length;
      const barWidth = (groupWidth / 4) * 0.8;
      const barSpacing = barWidth * 0.2;
      const genres = ["fiction", "nonFiction", "mystery", "sciFi"];
      const genreLabels = {
        fiction: "Fiction",
        nonFiction: "Non-Fiction",
        mystery: "Mystery",
        sciFi: "Sci-Fi",
      };

      for (let i = 0; i < genreTrendsData.length; i++) {
        const groupX = padding.left + i * groupWidth;
        for (let j = 0; j < 4; j++) {
          const barX = groupX + j * (barWidth + barSpacing) + groupWidth * 0.1;
          const value =
            genreTrendsData[i][
              ["fiction", "nonFiction", "mystery", "sciFi"][j]
            ];
          const barHeight = (value / 100) * chartHeight;
          const barY = chartRef.current.height - padding.bottom - barHeight;

          if (
            x >= barX &&
            x <= barX + barWidth &&
            y >= barY &&
            y <= chartRef.current.height - padding.bottom
          ) {
            newHoveredBar = `${i}-${j}`;
            newTooltip = {
              x: e.clientX,
              y: e.clientY,
              content: `${genreLabels[genres[j]]}: ${value}% (${
                genreTrendsData[i].year
              })`,
            };
            break;
          }
        }
        if (newHoveredBar) break;
      }
    } else if (activeTab === "popularity") {
      const padding = { top: 40, right: 30, bottom: 60, left: 150 };
      const chartWidth = chartRef.current.width - padding.left - padding.right;
      const chartHeight =
        chartRef.current.height - padding.top - padding.bottom;
      const barHeight = (chartHeight / popularityData.length) * 0.7;
      const barSpacing = (chartHeight / popularityData.length) * 0.3;

      for (let i = 0; i < popularityData.length; i++) {
        const barY = padding.top + i * (barHeight + barSpacing);
        const barWidth = (popularityData[i].score / 100) * chartWidth;

        if (
          x >= padding.left &&
          x <= padding.left + barWidth &&
          y >= barY &&
          y <= barY + barHeight
        ) {
          newHoveredBar = i;
          newTooltip = {
            x: e.clientX,
            y: e.clientY,
            content: `${popularityData[i].title}: ${popularityData[i].score}`,
          };
          break;
        }
      }
    }

    setHoveredBar(newHoveredBar);
    setTooltip(newTooltip);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
    setTooltip(null);
  };

  return (
    <div
      className="book-trends-section mb-5"
      ref={containerRef} // Attach ref to the container
      style={{
        border: "1px solid rgba(205, 175, 115, 0.2)",
        background: "rgba(10, 31, 28, 0.5)",
        position: "relative", // Needed for tooltip positioning
      }}
    >
      <div className="section-header text-center p-3">
        <h3
          className="font-heading mb-2"
          style={{
            color: "#cdaf73",
            fontWeight: "300",
            letterSpacing: "0.2em",
            fontSize: compact ? "1.5rem" : "1.8rem",
          }}
        >
          Genre & Popularity Analysis
        </h3>
        <div className="decorative-line mx-auto mb-3"></div>
        <p
          className="mx-auto"
          style={{
            maxWidth: "600px",
            color: "#a8a090",
            letterSpacing: "0.05em",
            fontSize: compact ? "0.85rem" : "0.95rem",
            fontWeight: "300",
            lineHeight: "1.7",
          }}
        >
          Discover the evolving landscape of literary genres and the enduring
          impact of classic works
        </p>
      </div>

      <div
        className="trends-tabs d-flex border-top border-bottom"
        style={{
          borderColor: "rgba(205, 175, 115, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Add a subtle glow effect */}
        <div
          className="tab-glow"
          style={{
            position: "absolute",
            top: "50%",
            left: "25%",
            width: "50%",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(205, 175, 115, 0), rgba(205, 175, 115, 0.3), rgba(205, 175, 115, 0))",
            zIndex: 0,
          }}
        ></div>
        <Button
          variant="link"
          className={`tab-button flex-grow-1 py-2 ${
            activeTab === "genres" ? "active" : ""
          }`}
          onClick={() => setActiveTab("genres")}
          style={{
            color: activeTab === "genres" ? "#cdaf73" : "#a8a090",
            textDecoration: "none",
            borderBottom: activeTab === "genres" ? "2px solid #cdaf73" : "none",
            borderRadius: 0,
            fontFamily: "var(--font-cormorant)",
            letterSpacing: "0.1em",
          }}
        >
          Genre Trends
        </Button>
        <Button
          variant="link"
          className={`tab-button flex-grow-1 py-2 ${
            activeTab === "popularity" ? "active" : ""
          }`}
          onClick={() => setActiveTab("popularity")}
          style={{
            color: activeTab === "popularity" ? "#cdaf73" : "#a8a090",
            textDecoration: "none",
            borderBottom:
              activeTab === "popularity" ? "2px solid #cdaf73" : "none",
            borderRadius: 0,
            fontFamily: "var(--font-cormorant)",
            letterSpacing: "0.1em",
          }}
        >
          Popularity Rankings
        </Button>
      </div>

      <div
        className="chart-container p-3"
        ref={containerRef} // Attach ref to the container
        style={{
          height: compact ? "320px" : "400px",
          position: "relative", // Ensure relative positioning for tooltip
        }}
      >
        <canvas
          ref={chartRef}
          // Width and Height are now set dynamically in useEffect and useCallback
          // Initial values are just placeholders for the component's first render
          width={600}
          height={400}
          style={{ width: "100%", height: "100%" }} // Make canvas fill its container
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {tooltip && (
          <div
            style={{
              position: "absolute",
              left:
                tooltip.x -
                (containerRef.current?.getBoundingClientRect().left || 0) +
                10, // Adjust for container's position
              top:
                tooltip.y -
                (containerRef.current?.getBoundingClientRect().top || 0) +
                10, // Adjust for container's position
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#e9e2d0",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              pointerEvents: "none", // Ensures it doesn't block mouse events on canvas
              zIndex: 1000,
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              fontFamily: "var(--font-lora)",
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      <div className="chart-description p-3 text-center">
        <p
          style={{
            color: "#a8a090",
            fontSize: compact ? "0.8rem" : "0.9rem",
            fontStyle: "italic",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {activeTab === "genres"
            ? "This visualization shows the shifting popularity of literary genres over the past five years, with non-fiction steadily gaining ground while traditional fiction sees a gradual decline."
            : "Based on reader ratings and critical acclaim, these classic works continue to resonate with audiences across generations, maintaining their literary significance."}
        </p>
      </div>
    </div>
  );
};

export default BookTrendsVisualization;
