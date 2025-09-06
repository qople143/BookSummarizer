"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import {
  BookOpen,
  Feather,
  BookMarked,
  MessageSquare,
  RefreshCw,
  Search,
  BarChart2,
  Clock,
  BookText,
  Library,
  Award,
  Moon,
  Sun,
  Star,
} from "lucide-react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import FeaturedBooksCarousel from "./featured-books-carousel";
import BookTrendsVisualization from "./book-trends-visualization";

// Sample data for visualizations
const sampleGenreData = [
  { name: "Fiction", value: 45 },
  { name: "Non-Fiction", value: 30 },
  { name: "Mystery", value: 15 },
  { name: "Science Fiction", value: 10 },
];

const sampleTimelineData = [
  { year: "1800", count: 5 },
  { year: "1850", count: 12 },
  { year: "1900", count: 25 },
  { year: "1950", count: 40 },
  { year: "2000", count: 65 },
  { year: "Present", count: 80 },
];

function Book() {
  const [bookName, setBookName] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  const [questions, setQuestions] = useState({});
  const [showQuestion, setShowQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookMeta, setBookMeta] = useState({ title: "", author: "" });
  const [activeTab, setActiveTab] = useState("summary");
  const [bookAngle, setBookAngle] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverStates, setHoverStates] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    search: false,
    summary: false,
    treasures: false,
    insights: false,
  });

  const bookCoverRef = useRef(null);
  const chartRef = useRef(null);
  const pageRef = useRef(null);

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.dataset.section]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Handle mouse movement over book cover for 3D effect
  const handleMouseMove = (e) => {
    if (!bookCoverRef.current) return;

    const rect = bookCoverRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    setBookAngle({ x: angleX, y: angleY });
  };

  const resetBookAngle = () => {
    setBookAngle({ x: 0, y: 0 });
  };

  // Draw genre chart
  useEffect(() => {
    if (chartRef.current && activeTab === "trends") {
      const ctx = chartRef.current.getContext("2d");
      const centerX = chartRef.current.width / 2;
      const centerY = chartRef.current.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      // Clear canvas
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      // Draw chart background
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(10, 31, 28, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "rgba(205, 175, 115, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw decorative outer ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(205, 175, 115, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw segments
      let startAngle = 0;
      sampleGenreData.forEach((genre, index) => {
        const sliceAngle = (genre.value / 100) * 2 * Math.PI;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();

        // Determine if this segment is selected
        const isSelected = selectedGenre === index;

        // Fill with gradient
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

        if (isSelected) {
          gradient.addColorStop(0, "rgba(205, 175, 115, 0.8)");
          gradient.addColorStop(1, "rgba(205, 175, 115, 0.4)");
        } else {
          gradient.addColorStop(0, `rgba(205, 175, 115, ${0.3 + index * 0.1})`);
          gradient.addColorStop(
            1,
            `rgba(205, 175, 115, ${0.1 + index * 0.05})`
          );
        }

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = "rgba(205, 175, 115, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add label
        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        ctx.font = isSelected
          ? "bold 14px var(--font-cormorant)"
          : "14px var(--font-cormorant)";
        ctx.fillStyle = "#cdaf73";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(genre.name, labelX, labelY);

        // Add value
        const valueRadius = radius * 0.85;
        const valueX = centerX + valueRadius * Math.cos(labelAngle);
        const valueY = centerY + valueRadius * Math.sin(labelAngle);

        ctx.font = "12px var(--font-lora)";
        ctx.fillStyle = "#e9e2d0";
        ctx.fillText(`${genre.value}%`, valueX, valueY);

        startAngle += sliceAngle;
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(10, 31, 28, 0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(205, 175, 115, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add center text
      ctx.font = "16px var(--font-cormorant)";
      ctx.fillStyle = "#cdaf73";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Genre", centerX, centerY - 10);
      ctx.fillText("Distribution", centerX, centerY + 10);

      // Draw decorative elements
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = centerX + (radius + 20) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(205, 175, 115, 0.3)";
        ctx.fill();
      }
    }
  }, [activeTab, selectedGenre]);

  // Draw timeline chart
  useEffect(() => {
    if (chartRef.current && activeTab === "timeline") {
      const ctx = chartRef.current.getContext("2d");
      const width = chartRef.current.width;
      const height = chartRef.current.height;
      const padding = 60;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = "rgba(10, 31, 28, 0.7)";
      ctx.fillRect(0, 0, width, height);

      // Draw decorative border
      ctx.strokeStyle = "rgba(205, 175, 115, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Draw timeline line
      ctx.beginPath();
      ctx.moveTo(padding, height / 2);
      ctx.lineTo(width - padding, height / 2);
      ctx.strokeStyle = "rgba(205, 175, 115, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw data points
      const dataWidth = width - padding * 2;
      const pointSpacing = dataWidth / (sampleTimelineData.length - 1);

      // Draw connecting curve
      ctx.beginPath();
      ctx.moveTo(padding, height / 2);

      sampleTimelineData.forEach((point, index) => {
        const x = padding + index * pointSpacing;
        const normalizedValue = point.count / 100;
        const y = height - normalizedValue * (height - padding * 2) - padding;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          // Create a smooth curve
          const prevX = padding + (index - 1) * pointSpacing;
          const prevY =
            height -
            (sampleTimelineData[index - 1].count / 100) *
              (height - padding * 2) -
            padding;

          const cpX1 = prevX + (x - prevX) / 3;
          const cpX2 = prevX + (2 * (x - prevX)) / 3;

          ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
        }
      });

      ctx.strokeStyle = "rgba(205, 175, 115, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      sampleTimelineData.forEach((point, index) => {
        const x = padding + index * pointSpacing;
        const normalizedValue = point.count / 100;
        const y = height - normalizedValue * (height - padding * 2) - padding;

        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(x, height / 2);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(205, 175, 115, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(205, 175, 115, 0.8)";
        ctx.fill();
        ctx.strokeStyle = "#0a1f1c";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw year label
        ctx.font = "14px var(--font-cormorant)";
        ctx.fillStyle = "#cdaf73";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(point.year, x, height / 2 + 25);

        // Draw count label
        ctx.font = "12px var(--font-lora)";
        ctx.fillStyle = "#e9e2d0";
        ctx.fillText(point.count.toString(), x, y - 20);
      });

      // Draw title
      ctx.font = "18px var(--font-cormorant)";
      ctx.fillStyle = "#cdaf73";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("Literary Timeline", width / 2, 20);

      // Draw axis labels
      ctx.font = "12px var(--font-lora)";
      ctx.fillStyle = "#a8a090";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Number of Notable Works", 15, 20);

      // Draw decorative elements
      for (let i = 0; i < 8; i++) {
        const x = padding + (i / 7) * (width - padding * 2);
        ctx.beginPath();
        ctx.arc(x, 10, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(205, 175, 115, 0.3)";
        ctx.fill();
      }
    }
  }, [activeTab]);

  const qCalled = async (qKey) => {
    try {
      setIsLoading(true);
      setError("");

      const questionRes = await axios.get(`http://127.0.0.1:5000/question/`);
      const questionText = questionRes.data.q;

      const ansRes = await axios.post(`http://127.0.0.1:5000/questions/`, {
        q: questionText,
      });

      setQuestions((prev) => ({ ...prev, [qKey]: questionText }));
      setBookInfo(ansRes.data.data);
      setShowQuestion(questionText);
      setAnimationKey((prev) => prev + 1);
      setActiveTab("summary");
    } catch (error) {
      console.error("Error fetching question or answer:", error);
      setError("Failed to fetch question or answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!bookName.trim()) return;

    try {
      setIsLoading(true);
      setError("");
      setBookInfo("");
      setBookUrl("");

      const response = await axios.get(
        `http://127.0.0.1:5000/info/${bookName}`
      );
      const bookmeta = await axios.get(`http://127.0.0.1:5000/bookinfo`);
      setBookMeta(bookmeta.data);

      const cover_img = await axios.get(
        `https://bookcover.longitood.com/bookcover`,
        {
          params: {
            book_title: bookmeta.data.title,
            author_name: bookmeta.data.author,
          },
        }
      );

      const questionData = await axios.get(`http://127.0.0.1:5000/questions/`);

      // Summarize the full text
      const summaryRes = await axios.post(`http://127.0.0.1:5000/summarize`, {
        text: response.data.data,
      });

      setQuestions(questionData.data);
      setBookUrl(cover_img.data.url);
      setBookInfo(summaryRes.data.summary);
      setShowQuestion("");
      setAnimationKey((prev) => prev + 1);
      setActiveTab("summary");
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError(
        "Failed to fetch book information. Please check the book name and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResummarize = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await axios.post(`http://127.0.0.1:5000/summarize`, {
        text: bookInfo,
      });
      setBookInfo(res.data.summary);
      setShowQuestion("Re-summarized:");
      setAnimationKey((prev) => prev + 1);
    } catch (err) {
      console.error("Error re-summarizing:", err);
      setError("Failed to re-summarize. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHover = (id, isHovered) => {
    setHoverStates((prev) => ({
      ...prev,
      [id]: isHovered,
    }));
  };

  return (
    <div
      className="book-page"
      ref={pageRef}
      style={{
        backgroundColor: "#0a1f1c",
        minHeight: "100vh",
        color: "#e9e2d0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <div className="background-elements">
        {/* Gradient background base */}
        <div
          className="background-base"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 50%, #122a27 0%, #0a1f1c 40%, #071614 100%)",
            zIndex: -10,
          }}
        ></div>

        {/* Subtle paper texture overlay */}
        <div
          className="paper-texture"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23cdaf73' fillOpacity='0.03' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
            opacity: 0.7,
            zIndex: -9,
          }}
        ></div>

        {/* Vignette effect */}
        <div
          className="vignette"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boxShadow: "inset 0 0 150px rgba(0, 0, 0, 0.7)",
            zIndex: -8,
          }}
        ></div>

        {/* Animated dust particles */}
        <div className="dust-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="dust-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 20 + 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Decorative ink splatters */}
        <div
          className="ink-splatter splatter-1"
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: "300px",
            height: "300px",
            opacity: 0.03,
            transform: `rotate(15deg) translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -7,
          }}
        ></div>
        <div
          className="ink-splatter splatter-2"
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: "250px",
            height: "250px",
            opacity: 0.02,
            transform: `rotate(-20deg) scale(0.8) translate(${
              mousePosition.x * 20
            }px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -7,
          }}
        ></div>

        {/* Floating stars */}
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Celestial sun decoration */}
        <div
          className="celestial-decoration top-right"
          style={{
            position: "absolute",
            top: "50px",
            right: "50px",
            width: "180px",
            height: "180px",
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -6,
          }}
        >
          <div className="sun-rays"></div>
          <Sun size={180} color="#cdaf73" style={{ opacity: 0.05 }} />
        </div>

        {/* Celestial moon decoration */}
        <div
          className="celestial-decoration bottom-left"
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            width: "150px",
            height: "150px",
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -6,
          }}
        >
          <div className="moon-glow"></div>
          <Moon size={150} color="#cdaf73" style={{ opacity: 0.05 }} />
        </div>

        {/* Decorative quill */}
        <div
          className="decorative-quill"
          style={{
            position: "absolute",
            top: "20%",
            right: "8%",
            opacity: 0.05,
            transform: `rotate(-15deg) translate(${mousePosition.x * -30}px, ${
              mousePosition.y * -30
            }px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -6,
          }}
        >
          <Feather size={150} color="#cdaf73" />
        </div>

        {/* Decorative book */}
        <div
          className="decorative-book"
          style={{
            position: "absolute",
            bottom: "15%",
            left: "8%",
            opacity: 0.05,
            transform: `rotate(10deg) translate(${mousePosition.x * 30}px, ${
              mousePosition.y * 30
            }px)`,
            transition: "transform 0.3s ease-out",
            zIndex: -6,
          }}
        >
          <BookMarked size={120} color="#cdaf73" />
        </div>
      </div>

      <Container className="position-relative">
        <div
          className="text-center py-5"
          data-section="hero"
          style={{
            position: "relative",
            zIndex: 1,
            opacity: isVisible.hero ? 1 : 0,
            transform: isVisible.hero
              ? `translateY(${scrollPosition * 0.1}px)`
              : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="mb-4 position-relative d-inline-block">
            <div className="decorative-symbol"></div>
            <h1
              className="font-heading"
              style={{
                color: "#cdaf73",
                fontWeight: "300",
                letterSpacing: "0.2em",
                fontSize: "2.5rem",
                position: "relative",
                display: "inline-block",
                padding: "0 1.5rem",
              }}
            >
              Discover Literary Wisdom
            </h1>
            <div className="decorative-symbol"></div>
          </div>
          <div className="decorative-line mx-auto mb-4"></div>
          <p
            className="mx-auto"
            style={{
              maxWidth: "600px",
              color: "#a8a090",
              letterSpacing: "0.05em",
              fontSize: "1.1rem",
              fontWeight: "300",
              lineHeight: "1.8",
            }}
          >
            Explore the essence of literature through AI-powered summaries and
            insights
          </p>
        </div>

        {/* Book Search - Styled with elegant frame */}
        <Row className="justify-content-center mb-5">
          <Col md={8} lg={6}>
            <div
              className="search-container"
              data-section="search"
              style={{
                border: "1px solid rgba(205, 175, 115, 0.2)",
                borderRadius: "0",
                background: "rgba(10, 31, 28, 0.5)",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(5px)",
                opacity: isVisible.search ? 1 : 0,
                transform: isVisible.search
                  ? "translateY(0)"
                  : "translateY(20px)",
              }}
              onMouseEnter={() => handleHover("search", true)}
              onMouseLeave={() => handleHover("search", false)}
            >
              {/* Decorative corner elements */}
              <div className="corner-decoration top-left"></div>
              <div className="corner-decoration top-right"></div>
              <div className="corner-decoration bottom-left"></div>
              <div className="corner-decoration bottom-right"></div>

              <div className="p-4">
                <h3
                  className="font-heading text-center mb-3"
                  style={{
                    color: "#cdaf73",
                    fontWeight: "400",
                    letterSpacing: "0.1em",
                  }}
                >
                  Search for a Book
                </h3>
                <Form onSubmit={handleSubmit}>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      value={bookName}
                      onChange={(event) => setBookName(event.target.value)}
                      placeholder="Enter a book title..."
                      className="py-3 ps-4 pe-4 border-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.2)",
                        color: "#e9e2d0",
                        borderRadius: "0",
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                        fontFamily: "var(--font-lora)",
                        borderLeft: hoverStates["search"]
                          ? "3px solid #cdaf73"
                          : "3px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <Button
                      type="submit"
                      className="position-absolute d-flex align-items-center justify-content-center"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#cdaf73",
                      }}
                      disabled={isLoading || !bookName.trim()}
                    >
                      {isLoading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        <Search size={18} />
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>

        {error && (
          <Row className="justify-content-center mb-4">
            <Col md={10}>
              <div
                className="p-3 fade-in"
                style={{
                  backgroundColor: "rgba(169, 68, 66, 0.1)",
                  color: "#e9a79c",
                  border: "1px solid rgba(169, 68, 66, 0.2)",
                }}
              >
                {error}
              </div>
            </Col>
          </Row>
        )}

        {/* Book Summary Section - Enhanced with elegant styling */}
        {bookUrl && bookInfo && (
          <div
            className="book-summary-section mb-5"
            data-section="summary"
            style={{
              border: "1px solid rgba(205, 175, 115, 0.3)",
              background: "rgba(10, 31, 28, 0.7)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              opacity: isVisible.summary ? 1 : 0,
              transform: isVisible.summary
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Decorative elements */}
            <div className="corner-decoration top-left"></div>
            <div className="corner-decoration top-right"></div>
            <div className="corner-decoration bottom-left"></div>
            <div className="corner-decoration bottom-right"></div>

            {/* Celestial decoration */}
            <div
              className="celestial-mini-decoration"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                opacity: 0.1,
                zIndex: 1,
              }}
            >
              <Star size={24} color="#cdaf73" className="pulse" />
            </div>

            <div
              className="celestial-mini-decoration"
              style={{
                position: "absolute",
                bottom: "15px",
                left: "15px",
                opacity: 0.1,
                zIndex: 1,
              }}
            >
              <Star size={24} color="#cdaf73" className="pulse" />
            </div>

            <Row className="p-4">
              <Col md={3} lg={2} className="mb-4 mb-md-0">
                <div
                  className="book-cover-container"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    maxWidth: "180px",
                    margin: "0 auto",
                    perspective: "1000px",
                  }}
                  ref={bookCoverRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetBookAngle}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className="book-cover"
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "150%",
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : `rotateY(${bookAngle.y}deg) rotateX(${bookAngle.x}deg)`,
                      transition: "transform 0.6s ease",
                    }}
                  >
                    {/* Front Cover */}
                    <div
                      className="book-face front"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        border: "1px solid rgba(205, 175, 115, 0.3)",
                        boxShadow: hoverStates["book"]
                          ? "0 10px 30px rgba(0,0,0,0.5), 0 0 10px rgba(205, 175, 115, 0.3)"
                          : "0 5px 15px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={() => handleHover("book", true)}
                      onMouseLeave={() => handleHover("book", false)}
                    >
                      <img
                        src={bookUrl || "/placeholder.svg"}
                        alt={bookMeta.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%)",
                        }}
                      ></div>
                    </div>

                    {/* Back Cover (Book Details) */}
                    <div
                      className="book-face back"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: "#0a1f1c",
                        border: "1px solid rgba(205, 175, 115, 0.3)",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5
                        style={{
                          color: "#cdaf73",
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: "400",
                          letterSpacing: "0.1em",
                          marginBottom: "1rem",
                          textAlign: "center",
                        }}
                      >
                        Book Details
                      </h5>
                      <div
                        className="decorative-line mb-3"
                        style={{ width: "80%" }}
                      ></div>
                      <p
                        style={{
                          color: "#a8a090",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Title:</strong> {bookMeta.title}
                      </p>
                      <p
                        style={{
                          color: "#a8a090",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Author:</strong> {bookMeta.author}
                      </p>
                      <p
                        style={{
                          color: "#a8a090",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <strong>Genre:</strong> Fiction
                      </p>
                      <p style={{ color: "#a8a090", fontSize: "0.9rem" }}>
                        <strong>Published:</strong> 2023
                      </p>
                    </div>
                  </div>

                  <div
                    className="book-interaction-hint"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "0",
                      right: "0",
                      textAlign: "center",
                      color: "#cdaf73",
                      fontSize: "0.8rem",
                      opacity: hoverStates["book"] ? "1" : "0",
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    Click to flip
                  </div>
                </div>

                <div className="text-center mt-3">
                  <h4
                    className="font-heading mb-1"
                    style={{
                      color: "#cdaf73",
                      fontWeight: "400",
                      letterSpacing: "0.1em",
                      fontSize: "1.2rem",
                    }}
                  >
                    {bookMeta.title}
                  </h4>

                  {bookMeta.author && (
                    <p
                      style={{
                        color: "#a8a090",
                        letterSpacing: "0.05em",
                        fontSize: "0.9rem",
                      }}
                    >
                      by {bookMeta.author}
                    </p>
                  )}

                  <Button
                    variant="outline-light"
                    size="sm"
                    className="mt-2 px-3 py-2 book-action-btn"
                    style={{
                      fontSize: "0.8rem",
                      borderColor: "rgba(205, 175, 115, 0.3)",
                      color: "#cdaf73",
                      borderRadius: "0",
                      letterSpacing: "0.1em",
                      fontWeight: "300",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => handleHover("library-btn", true)}
                    onMouseLeave={() => handleHover("library-btn", false)}
                  >
                    <span className="btn-text">Add to Library</span>
                    <span className="btn-shine"></span>
                  </Button>
                </div>
              </Col>

              <Col md={9} lg={10}>
                <div
                  className="content-tabs mb-3"
                  style={{
                    display: "flex",
                    borderBottom: "1px solid rgba(205, 175, 115, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className={`tab-item ${
                      activeTab === "summary" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("summary")}
                    style={{
                      padding: "1rem 1.5rem",
                      cursor: "pointer",
                      color: activeTab === "summary" ? "#cdaf73" : "#a8a090",
                      borderBottom:
                        activeTab === "summary" ? "2px solid #cdaf73" : "none",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                    onMouseEnter={() => handleHover("tab-summary", true)}
                    onMouseLeave={() => handleHover("tab-summary", false)}
                  >
                    <BookOpen size={16} />
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        letterSpacing: "0.1em",
                        fontWeight: activeTab === "summary" ? "500" : "300",
                      }}
                    >
                      Summary
                    </span>
                  </div>

                  <div
                    className={`tab-item ${
                      activeTab === "trends" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("trends")}
                    style={{
                      padding: "1rem 1.5rem",
                      cursor: "pointer",
                      color: activeTab === "trends" ? "#cdaf73" : "#a8a090",
                      borderBottom:
                        activeTab === "trends" ? "2px solid #cdaf73" : "none",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                    onMouseEnter={() => handleHover("tab-trends", true)}
                    onMouseLeave={() => handleHover("tab-trends", false)}
                  >
                    <BarChart2 size={16} />
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        letterSpacing: "0.1em",
                        fontWeight: activeTab === "trends" ? "500" : "300",
                      }}
                    >
                      Genre Analysis
                    </span>
                  </div>

                  <div
                    className={`tab-item ${
                      activeTab === "timeline" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("timeline")}
                    style={{
                      padding: "1rem 1.5rem",
                      cursor: "pointer",
                      color: activeTab === "timeline" ? "#cdaf73" : "#a8a090",
                      borderBottom:
                        activeTab === "timeline" ? "2px solid #cdaf73" : "none",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                    onMouseEnter={() => handleHover("tab-timeline", true)}
                    onMouseLeave={() => handleHover("tab-timeline", false)}
                  >
                    <Clock size={16} />
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        letterSpacing: "0.1em",
                        fontWeight: activeTab === "timeline" ? "500" : "300",
                      }}
                    >
                      Literary Timeline
                    </span>
                  </div>

                  <div className="ms-auto">
                    <Button
                      variant="link"
                      className="text-decoration-none p-2 d-flex align-items-center"
                      onClick={handleResummarize}
                      disabled={isLoading}
                      style={{
                        color: "#cdaf73",
                        transition: "all 0.3s ease",
                        position: "relative",
                        zIndex: 1,
                      }}
                      onMouseEnter={() => handleHover("regenerate", true)}
                      onMouseLeave={() => handleHover("regenerate", false)}
                    >
                      <RefreshCw
                        size={16}
                        className="me-2"
                        style={{
                          transform: hoverStates["regenerate"]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.6s ease",
                        }}
                      />
                      <span
                        className="d-none d-md-inline"
                        style={{
                          letterSpacing: "0.05em",
                          fontWeight: "300",
                          borderBottom: hoverStates["regenerate"]
                            ? "1px solid #cdaf73"
                            : "none",
                        }}
                      >
                        Regenerate
                      </span>
                    </Button>
                  </div>

                  {/* Animated tab indicator */}
                  <div
                    className="tab-indicator"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      height: "2px",
                      background: "#cdaf73",
                      transition: "all 0.3s ease",
                      left:
                        activeTab === "summary"
                          ? "0"
                          : activeTab === "trends"
                          ? "120px"
                          : "240px",
                      width: "120px",
                    }}
                  ></div>
                </div>

                <div className="tab-content p-4">
                  {activeTab === "summary" && (
                    <div className="summary-content">
                      {showQuestion && (
                        <div
                          className="mb-4 p-3"
                          style={{
                            backgroundColor: "rgba(205, 175, 115, 0.1)",
                            borderLeft: "3px solid #cdaf73",
                            position: "relative",
                          }}
                        >
                          <h5
                            className="font-heading mb-0"
                            style={{ color: "#cdaf73" }}
                          >
                            {showQuestion}
                          </h5>
                          <div
                            className="corner-decoration top-right"
                            style={{ width: "10px", height: "10px" }}
                          ></div>
                          <div
                            className="corner-decoration bottom-left"
                            style={{ width: "10px", height: "10px" }}
                          ></div>
                        </div>
                      )}

                      {isLoading ? (
                        <div className="text-center py-5">
                          <div className="spinner-container">
                            <Spinner
                              animation="border"
                              style={{ color: "#cdaf73" }}
                            />
                          </div>
                          <p
                            style={{
                              color: "#a8a090",
                              marginTop: "1rem",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Generating insights...
                          </p>
                        </div>
                      ) : (
                        <div key={animationKey} className="book-summary">
                          <TypeAnimation
                            sequence={[bookInfo, 3000]}
                            speed={{ type: "keyStrokeDelayInMs", value: 10 }}
                            omitDeletionAnimation={true}
                            style={{
                              whiteSpace: "pre-line",
                              fontSize: "1.2rem",
                              display: "block",
                              minHeight: "200px",
                              lineHeight: "1.8",
                              fontFamily: "var(--font-lora)",
                              color: "#e9e2d0",
                              letterSpacing: "0.02em",
                            }}
                            cursor={false}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "trends" && (
                    <div className="trends-content">
                      <h3
                        className="font-heading mb-4 text-center"
                        style={{
                          color: "#cdaf73",
                          fontWeight: "400",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Genre Analysis
                      </h3>

                      <div className="decorative-line mb-4"></div>

                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          className="position-relative"
                          style={{ width: "350px", height: "350px" }}
                        >
                          <canvas
                            ref={chartRef}
                            width={350}
                            height={350}
                            onClick={(e) => {
                              const rect =
                                chartRef.current.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              const centerX = rect.width / 2;
                              const centerY = rect.height / 2;

                              // Calculate angle from center
                              const angle = Math.atan2(
                                y - centerY,
                                x - centerX
                              );
                              let angleInDegrees = angle * (180 / Math.PI);
                              if (angleInDegrees < 0) angleInDegrees += 360;

                              // Calculate which segment was clicked
                              let startAngle = 0;
                              let selectedIndex = null;

                              for (let i = 0; i < sampleGenreData.length; i++) {
                                const sliceAngle =
                                  (sampleGenreData[i].value / 100) * 360;
                                if (
                                  angleInDegrees >= startAngle &&
                                  angleInDegrees < startAngle + sliceAngle
                                ) {
                                  selectedIndex = i;
                                  break;
                                }
                                startAngle += sliceAngle;
                              }

                              setSelectedGenre(
                                selectedIndex === selectedGenre
                                  ? null
                                  : selectedIndex
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          />

                          {selectedGenre !== null && (
                            <div
                              className="genre-details fade-in"
                              style={{
                                position: "absolute",
                                bottom: "-80px",
                                left: "0",
                                right: "0",
                                textAlign: "center",
                                padding: "1rem",
                                border: "1px solid rgba(205, 175, 115, 0.2)",
                                backgroundColor: "rgba(10, 31, 28, 0.8)",
                              }}
                            >
                              <h5
                                style={{
                                  color: "#cdaf73",
                                  fontFamily: "var(--font-cormorant)",
                                  fontWeight: "400",
                                  letterSpacing: "0.1em",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                {sampleGenreData[selectedGenre].name}
                              </h5>
                              <p
                                style={{
                                  color: "#a8a090",
                                  fontSize: "0.9rem",
                                  marginBottom: "0",
                                }}
                              >
                                {sampleGenreData[selectedGenre].value}% of
                                literary works
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center mt-5">
                        <p
                          style={{
                            color: "#a8a090",
                            fontSize: "0.9rem",
                            fontStyle: "italic",
                          }}
                        >
                          Click on a segment to see more details about each
                          genre
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "timeline" && (
                    <div className="timeline-content">
                      <h3
                        className="font-heading mb-4 text-center"
                        style={{
                          color: "#cdaf73",
                          fontWeight: "400",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Literary Timeline
                      </h3>

                      <div className="decorative-line mb-4"></div>

                      <div className="d-flex justify-content-center align-items-center">
                        <div style={{ width: "100%", height: "300px" }}>
                          <canvas ref={chartRef} width={600} height={300} />
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <p
                          style={{
                            color: "#a8a090",
                            fontSize: "0.9rem",
                            fontStyle: "italic",
                          }}
                        >
                          Visualization of literary works published over time,
                          showing the evolution of literary output through the
                          centuries
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Questions Section - Enhanced with elegant styling */}
                <div
                  className="questions-section mt-4 p-4"
                  style={{
                    borderTop: "1px solid rgba(205, 175, 115, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="section-glow"></div>

                  <h4
                    className="font-heading mb-3"
                    style={{
                      color: "#cdaf73",
                      fontWeight: "400",
                      letterSpacing: "0.1em",
                      position: "relative",
                    }}
                  >
                    <MessageSquare size={16} className="me-2" />
                    Explore Deeper Insights
                  </h4>

                  <Row className="g-3 mb-3">
                    {questions.q1 && (
                      <Col md={4}>
                        <div
                          className="question-circle"
                          onMouseEnter={() => handleHover("q1", true)}
                          onMouseLeave={() => handleHover("q1", false)}
                        >
                          <Button
                            onClick={() => qCalled("q1")}
                            disabled={isLoading}
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid rgba(205, 175, 115, 0.3)",
                              color: "#cdaf73",
                              borderRadius: "0",
                              padding: "1rem",
                              height: "100%",
                              width: "100%",
                              textAlign: "center",
                              fontFamily: "var(--font-cormorant)",
                              letterSpacing: "0.05em",
                              fontWeight: "300",
                              fontSize: "0.9rem",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {hoverStates["q1"] && (
                              <div
                                className="question-highlight"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  background:
                                    "linear-gradient(135deg, rgba(205, 175, 115, 0.1) 0%, transparent 100%)",
                                  opacity: 0,
                                  animation: "fadeIn 0.3s forwards",
                                }}
                              ></div>
                            )}
                            {questions.q1}
                            <div
                              className="card-corner top-left"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <div
                              className="card-corner bottom-right"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                          </Button>
                        </div>
                      </Col>
                    )}

                    {questions.q2 && (
                      <Col md={4}>
                        <div
                          className="question-circle"
                          onMouseEnter={() => handleHover("q2", true)}
                          onMouseLeave={() => handleHover("q2", false)}
                        >
                          <Button
                            onClick={() => qCalled("q2")}
                            disabled={isLoading}
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid rgba(205, 175, 115, 0.3)",
                              color: "#cdaf73",
                              borderRadius: "0",
                              padding: "1rem",
                              height: "100%",
                              width: "100%",
                              textAlign: "center",
                              fontFamily: "var(--font-cormorant)",
                              letterSpacing: "0.05em",
                              fontWeight: "300",
                              fontSize: "0.9rem",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {hoverStates["q2"] && (
                              <div
                                className="question-highlight"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  background:
                                    "linear-gradient(135deg, rgba(205, 175, 115, 0.1) 0%, transparent 100%)",
                                  opacity: 0,
                                  animation: "fadeIn 0.3s forwards",
                                }}
                              ></div>
                            )}
                            {questions.q2}
                            <div
                              className="card-corner top-left"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <div
                              className="card-corner bottom-right"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                          </Button>
                        </div>
                      </Col>
                    )}

                    {questions.q3 && (
                      <Col md={4}>
                        <div
                          className="question-circle"
                          onMouseEnter={() => handleHover("q3", true)}
                          onMouseLeave={() => handleHover("q3", false)}
                        >
                          <Button
                            onClick={() => qCalled("q3")}
                            disabled={isLoading}
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid rgba(205, 175, 115, 0.3)",
                              color: "#cdaf73",
                              borderRadius: "0",
                              padding: "1rem",
                              height: "100%",
                              width: "100%",
                              textAlign: "center",
                              fontFamily: "var(--font-cormorant)",
                              letterSpacing: "0.05em",
                              fontWeight: "300",
                              fontSize: "0.9rem",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {hoverStates["q3"] && (
                              <div
                                className="question-highlight"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  background:
                                    "linear-gradient(135deg, rgba(205, 175, 115, 0.1) 0%, transparent 100%)",
                                  opacity: 0,
                                  animation: "fadeIn 0.3s forwards",
                                }}
                              ></div>
                            )}
                            {questions.q3}
                            <div
                              className="card-corner top-left"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <div
                              className="card-corner bottom-right"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>

                  <div
                    className="custom-question"
                    onMouseEnter={() => handleHover("custom-q", true)}
                    onMouseLeave={() => handleHover("custom-q", false)}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Ask your own question about this book..."
                      className="py-3 ps-4 pe-4 border-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.2)",
                        color: "#e9e2d0",
                        borderRadius: "0",
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                        fontFamily: "var(--font-lora)",
                        borderLeft: hoverStates["custom-q"]
                          ? "3px solid #cdaf73"
                          : "3px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <Button
                      className="mt-3 px-4 py-2 btn-literary"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(205, 175, 115, 0.3)",
                        color: "#cdaf73",
                        borderRadius: "0",
                        letterSpacing: "0.1em",
                        fontWeight: "300",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={() => handleHover("ask-btn", true)}
                      onMouseLeave={() => handleHover("ask-btn", false)}
                    >
                      <span className="btn-text">Ask Question</span>
                      <span className="btn-shine"></span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* Featured Books Carousel - Moved below the book summary */}
        <div
          className={`literary-treasures-section ${
            bookUrl && bookInfo ? "mt-5 pt-4" : ""
          }`}
          data-section="treasures"
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(205, 175, 115, 0.2)",
            background: "rgba(10, 31, 28, 0.5)",
            backdropFilter: "blur(10px)",
            marginBottom: "4rem",
            opacity: isVisible.treasures ? 1 : 0,
            transform: isVisible.treasures
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {/* Decorative elements */}
          <div className="corner-decoration top-left"></div>
          <div className="corner-decoration top-right"></div>
          <div className="corner-decoration bottom-left"></div>
          <div className="corner-decoration bottom-right"></div>

          {/* Background glow */}
          <div
            className="section-background-glow"
            style={{
              position: "absolute",
              top: "30%",
              right: "-10%",
              width: "40%",
              height: "40%",
              background:
                "radial-gradient(circle, rgba(205, 175, 115, 0.05) 0%, rgba(10, 31, 28, 0) 70%)",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.8,
              animation: "pulse 8s infinite ease-in-out",
            }}
          ></div>

          <div
            className="section-background-glow"
            style={{
              position: "absolute",
              bottom: "20%",
              left: "-5%",
              width: "30%",
              height: "30%",
              background:
                "radial-gradient(circle, rgba(205, 175, 115, 0.05) 0%, rgba(10, 31, 28, 0) 70%)",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.6,
              animation: "pulse 6s infinite ease-in-out",
            }}
          ></div>

          {/* Decorative quill */}
          <div
            className="decorative-element"
            style={{
              position: "absolute",
              top: "15%",
              right: "5%",
              opacity: 0.05,
              transform: `rotate(-15deg) translate(${
                mousePosition.x * -20
              }px, ${mousePosition.y * -20}px)`,
              transition: "transform 0.3s ease-out",
              zIndex: 1,
            }}
          >
            <Feather size={80} color="#cdaf73" />
          </div>

          {/* Decorative book */}
          <div
            className="decorative-element"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "5%",
              opacity: 0.05,
              transform: `rotate(10deg) translate(${mousePosition.x * 20}px, ${
                mousePosition.y * 20
              }px)`,
              transition: "transform 0.3s ease-out",
              zIndex: 1,
            }}
          >
            <BookText size={70} color="#cdaf73" />
          </div>

          <div className="section-header text-center py-4">
            <div className="mb-4 position-relative d-inline-block">
              <div className="decorative-symbol"></div>
              <h2
                className="font-heading"
                style={{
                  color: "#cdaf73",
                  fontWeight: "300",
                  letterSpacing: "0.2em",
                  fontSize: "2rem",
                  position: "relative",
                  display: "inline-block",
                  padding: "0 1.5rem",
                }}
              >
                Literary Treasures
              </h2>
              <div className="decorative-symbol"></div>
            </div>
            <div className="decorative-line mx-auto mb-4"></div>
            <p
              className="mx-auto"
              style={{
                maxWidth: "600px",
                color: "#a8a090",
                letterSpacing: "0.05em",
                fontSize: "1rem",
                fontWeight: "300",
                lineHeight: "1.8",
              }}
            >
              Discover timeless classics and contemporary masterpieces that have
              shaped the literary landscape
            </p>
          </div>

          <FeaturedBooksCarousel />
        </div>

        {/* Book Trends Visualization - Moved below the carousel */}
        <div
          className="literary-insights-section mb-5"
          data-section="insights"
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(205, 175, 115, 0.2)",
            background: "rgba(10, 31, 28, 0.5)",
            backdropFilter: "blur(10px)",
            opacity: isVisible.insights ? 1 : 0,
            transform: isVisible.insights
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          {/* Decorative elements */}
          <div className="corner-decoration top-left"></div>
          <div className="corner-decoration top-right"></div>
          <div className="corner-decoration bottom-left"></div>
          <div className="corner-decoration bottom-right"></div>

          {/* Background glow */}
          <div
            className="section-background-glow"
            style={{
              position: "absolute",
              top: "20%",
              left: "-10%",
              width: "40%",
              height: "40%",
              background:
                "radial-gradient(circle, rgba(205, 175, 115, 0.05) 0%, rgba(10, 31, 28, 0) 70%)",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.8,
              animation: "pulse 7s infinite ease-in-out",
            }}
          ></div>

          <div
            className="section-background-glow"
            style={{
              position: "absolute",
              bottom: "10%",
              right: "-5%",
              width: "30%",
              height: "30%",
              background:
                "radial-gradient(circle, rgba(205, 175, 115, 0.05) 0%, rgba(10, 31, 28, 0) 70%)",
              borderRadius: "50%",
              zIndex: 0,
              opacity: 0.6,
              animation: "pulse 5s infinite ease-in-out",
            }}
          ></div>

          {/* Decorative elements */}
          <div
            className="decorative-element"
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              opacity: 0.05,
              transform: `rotate(15deg) translate(${mousePosition.x * 20}px, ${
                mousePosition.y * 20
              }px)`,
              transition: "transform 0.3s ease-out",
              zIndex: 1,
            }}
          >
            <Award size={80} color="#cdaf73" />
          </div>

          <div
            className="decorative-element"
            style={{
              position: "absolute",
              bottom: "15%",
              right: "5%",
              opacity: 0.05,
              transform: `rotate(-10deg) translate(${
                mousePosition.x * -20
              }px, ${mousePosition.y * -20}px)`,
              transition: "transform 0.3s ease-out",
              zIndex: 1,
            }}
          >
            <Library size={70} color="#cdaf73" />
          </div>

          <div className="section-header text-center py-4">
            <div className="mb-4 position-relative d-inline-block">
              <div className="decorative-symbol"></div>
              <h2
                className="font-heading"
                style={{
                  color: "#cdaf73",
                  fontWeight: "300",
                  letterSpacing: "0.2em",
                  fontSize: "2rem",
                  position: "relative",
                  display: "inline-block",
                  padding: "0 1.5rem",
                }}
              >
                Literary Insights
              </h2>
              <div className="decorative-symbol"></div>
            </div>
            <div className="decorative-line mx-auto mb-4"></div>
            <p
              className="mx-auto"
              style={{
                maxWidth: "600px",
                color: "#a8a090",
                letterSpacing: "0.05em",
                fontSize: "1rem",
                fontWeight: "300",
                lineHeight: "1.8",
              }}
            >
              Explore trends and patterns in the world of literature through our
              curated visualizations
            </p>
          </div>

          <BookTrendsVisualization />
        </div>
      </Container>

      {/* Add CSS for animations and decorative elements */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.3;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatDust {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -30px) rotate(180deg);
            opacity: 0.1;
          }
          75% {
            opacity: 0.2;
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.1;
          }
        }

        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #cdaf73;
          border-radius: 50%;
          animation: twinkle 3s infinite ease-in-out;
        }

        .dust-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .dust-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(205, 175, 115, 0.3);
          border-radius: 50%;
          animation: floatDust linear infinite;
        }

        .ink-splatter {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='%23cdaf73' d='M139.4 21.5c5.2 8.6 4.1 19.4-1.7 28.4-5.8 9-16.3 16.2-23.3 25.3-7 9.1-10.4 20.2-17.3 27.8-6.9 7.6-17.2 11.7-25.9 7.9-8.7-3.8-15.8-15.5-15.3-26.8.5-11.3 8.7-22.1 16.3-32.6 7.6-10.5 14.8-20.7 24.5-26.2 9.7-5.5 21.9-6.3 30.4-1.2 8.5 5.1 13.3 16.1 12.3-2.6z'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        .corner-decoration {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(205, 175, 115, 0.5);
          z-index: 3;
        }

        .corner-decoration.top-left {
          top: 10px;
          left: 10px;
          border-top: 1px solid;
          border-left: 1px solid;
        }

        .corner-decoration.top-right {
          top: 10px;
          right: 10px;
          border-top: 1px solid;
          border-right: 1px solid;
        }

        .corner-decoration.bottom-left {
          bottom: 10px;
          left: 10px;
          border-bottom: 1px solid;
          border-left: 1px solid;
        }

        .corner-decoration.bottom-right {
          bottom: 10px;
          right: 10px;
          border-bottom: 1px solid;
          border-right: 1px solid;
        }

        .card-corner {
          position: absolute;
          width: 15px;
          height: 15px;
          border-color: rgba(205, 175, 115, 0.3);
        }

        .card-corner.top-left {
          top: 10px;
          left: 10px;
          border-top: 1px solid;
          border-left: 1px solid;
        }

        .card-corner.bottom-right {
          bottom: 10px;
          right: 10px;
          border-bottom: 1px solid;
          border-right: 1px solid;
        }

        .decorative-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(205, 175, 115, 0),
            rgba(205, 175, 115, 0.5),
            rgba(205, 175, 115, 0)
          );
          width: 100%;
          position: relative;
        }

        .decorative-line::before {
          content: "✦";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #cdaf73;
          background-color: #0a1f1c;
          padding: 0 10px;
          font-size: 0.8rem;
        }

        .decorative-symbol {
          display: inline-block;
          width: 30px;
          height: 1px;
          background: rgba(205, 175, 115, 0.5);
          margin: 0 15px;
          position: relative;
          top: -8px;
        }

        .btn-literary {
          position: relative;
          overflow: hidden;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shine 4s infinite;
        }

        .btn-literary:hover .btn-shine {
          animation: shine 2s infinite;
        }

        .tab-item:hover {
          background-color: rgba(205, 175, 115, 0.05);
        }

        .section-glow {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(205, 175, 115, 0.05) 0%,
            rgba(10, 31, 28, 0) 70%
          );
          border-radius: 50%;
          z-index: 0;
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        .book-action-btn:hover {
          border-color: rgba(205, 175, 115, 0.6) !important;
          color: #e9e2d0 !important;
          background-color: rgba(205, 175, 115, 0.1) !important;
        }

        .question-circle:hover {
          transform: translateY(-3px);
        }

        .question-circle button:focus {
          box-shadow: 0 0 0 3px rgba(205, 175, 115, 0.3);
          outline: none;
        }

        .spinner-container {
          position: relative;
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }

        .spinner-container::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 1px solid rgba(205, 175, 115, 0.2);
          border-radius: 50%;
        }

        .section-background-glow {
          pointer-events: none;
        }

        .decorative-element {
          pointer-events: none;
        }

        .literary-treasures-section,
        .literary-insights-section {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .literary-treasures-section:hover,
        .literary-insights-section:hover {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(205, 175, 115, 0.1);
          transform: translateY(-5px);
        }

        .book-card {
          position: relative;
          z-index: 2;
        }

        .book-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(10, 31, 28, 0) 0%,
            rgba(10, 31, 28, 0.8) 100%
          );
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
        }

        .book-info h5 {
          position: relative;
          display: inline-block;
        }

        .book-info h5::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #cdaf73;
          transition: width 0.3s ease;
        }

        .book-card:hover .book-info h5::after {
          width: 80%;
        }

        .tab-item {
          position: relative;
          overflow: hidden;
        }

        .tab-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #cdaf73;
          transition: width 0.3s ease;
        }

        .tab-item:hover::after {
          width: 80%;
        }

        .tab-item.active::after {
          width: 100%;
        }

        @keyframes floatElement {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .decorative-element {
          animation: floatElement 10s infinite ease-in-out;
        }

        .sun-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(205, 175, 115, 0.1) 0%,
            rgba(10, 31, 28, 0) 70%
          );
          border-radius: 50%;
          z-index: -1;
        }

        .moon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(205, 175, 115, 0.08) 0%,
            rgba(10, 31, 28, 0) 70%
          );
          border-radius: 50%;
          z-index: -1;
        }

        .celestial-mini-decoration {
          animation: pulse 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Book;
