"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BookOpen, Feather, Compass, Sparkles, Quote } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    journey: false,
    philosophy: false,
    cards: false,
    cta: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // Track mouse position for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0a1f1c",
        color: "#e9e2d0",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <>
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
            zIndex: 0,
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
            zIndex: 0,
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
            zIndex: 0,
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
            transform: "rotate(15deg)",
            zIndex: 0,
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
            transform: "rotate(-20deg) scale(0.8)",
            zIndex: 0,
          }}
        ></div>
      </>

      {/* Floating stars background */}
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

      {/* Hero Section */}
      <div
        className="py-5 position-relative"
        data-section="hero"
        style={{
          opacity: isVisible.hero ? 1 : 0,
          transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Celestial sun decoration with parallax effect */}
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
          }}
        >
          <div className="sun-rays"></div>
          <img
            src="/celestial-sun.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.15,
              animation: "pulse 8s infinite ease-in-out",
            }}
          />
        </div>

        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
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
                  About Our Vision
                </h1>
                <div className="decorative-symbol"></div>
              </div>
              <div className="decorative-line mx-auto mb-4"></div>
              <p
                className="mx-auto mb-5"
                style={{
                  maxWidth: "600px",
                  color: "#a8a090",
                  letterSpacing: "0.05em",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  fontWeight: "300",
                }}
              >
                Discover the essence of literature through our AI-powered book
                summaries and insights
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row
          className="mb-5 align-items-center"
          data-section="journey"
          style={{
            opacity: isVisible.journey ? 1 : 0,
            transform: isVisible.journey ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <Col lg={5} className="mb-5 mb-lg-0">
            <div
              className="decorative-book-display"
              style={{
                position: "relative",
                height: "400px",
                border: "1px solid rgba(205, 175, 115, 0.3)",
                padding: "10px",
                background: "rgba(10, 31, 28, 0.4)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                transition:
                  "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(205, 175, 115, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.2)";
              }}
            >
              <div className="book-stack">
                <div className="book book-1"></div>
                <div className="book book-2"></div>
                <div className="book book-3"></div>
              </div>

              <div className="quill-decoration">
                <Feather size={40} color="#cdaf73" style={{ opacity: 0.6 }} />
              </div>

              <div className="decorative-scroll"></div>

              {/* Decorative corner elements */}
              <div className="corner-decoration top-left"></div>
              <div className="corner-decoration top-right"></div>
              <div className="corner-decoration bottom-left"></div>
              <div className="corner-decoration bottom-right"></div>
            </div>
          </Col>
          <Col lg={7}>
            <div
              className="content-box"
              style={{
                position: "relative",
                padding: "2.5rem",
                background: "rgba(10, 31, 28, 0.3)",
                border: "1px solid rgba(205, 175, 115, 0.1)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2
                className="font-heading mb-4"
                style={{
                  color: "#cdaf73",
                  fontWeight: "300",
                  letterSpacing: "0.15em",
                  fontSize: "2rem",
                }}
              >
                Our Literary Journey
              </h2>
              <div className="decorative-line mb-4"></div>
              <div
                style={{
                  fontFamily: "var(--font-lora)",
                  color: "#e9e2d0",
                  letterSpacing: "0.02em",
                  lineHeight: "1.8",
                }}
              >
                <p>
                  Welcome to our AI book summary app, designed to empower book
                  lovers, book clubs, researchers, and literature enthusiasts.
                  Our mission is to provide a valuable resource for discovering
                  and exploring new titles across a wide range of genres and
                  topics.
                </p>

                <div className="quote-block">
                  <Quote size={20} className="quote-icon" />
                  <p
                    style={{
                      color: "#cdaf73",
                      fontWeight: "500",
                      fontStyle: "italic",
                    }}
                  >
                    One of the standout features of our app is the Q&A section,
                    where users can ask questions about the books and receive
                    answers from our AI assistant. This feature is designed to
                    provide additional insights, clarification, and in-depth
                    exploration of the literary works, further enhancing the
                    user's understanding and engagement.
                  </p>
                </div>

                <p>
                  Join us on this exciting journey as we redefine the way you
                  discover and engage with books. Welcome to our book summary
                  app – your gateway to a world of literary exploration,
                  discovery, and knowledge-sharing.
                </p>
              </div>

              {/* Decorative quill icon */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  opacity: 0.1,
                }}
              >
                <Feather size={80} color="#cdaf73" />
              </div>
            </div>
          </Col>
        </Row>

        <div
          className="decorative-line my-5"
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "3rem auto",
          }}
        ></div>

        <Row
          className="justify-content-center text-center mb-5"
          data-section="philosophy"
          style={{
            opacity: isVisible.philosophy ? 1 : 0,
            transform: isVisible.philosophy
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          <Col lg={8}>
            <div className="mb-4 position-relative d-inline-block">
              <div className="decorative-symbol"></div>
              <h2
                className="font-heading"
                style={{
                  color: "#cdaf73",
                  fontWeight: "300",
                  letterSpacing: "0.15em",
                  fontSize: "2rem",
                  position: "relative",
                  display: "inline-block",
                  padding: "0 1.5rem",
                }}
              >
                Our Philosophy
              </h2>
              <div className="decorative-symbol"></div>
            </div>
            <p
              className="mx-auto"
              style={{
                maxWidth: "700px",
                color: "#a8a090",
                letterSpacing: "0.05em",
                fontSize: "1.1rem",
                lineHeight: "1.8",
                fontWeight: "300",
              }}
            >
              We believe that literature is a gateway to understanding the human
              experience. Our AI-powered platform is designed to make the wisdom
              of books more accessible, allowing readers to explore new ideas
              and perspectives with ease and depth.
            </p>
          </Col>
        </Row>

        <Row
          className="g-4"
          data-section="cards"
          style={{
            opacity: isVisible.cards ? 1 : 0,
            transform: isVisible.cards ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          {[
            {
              title: "Energy Healing",
              description:
                "Our summaries capture the essence and energy of each book, distilling complex ideas into accessible insights that resonate with readers.",
              icon: <Sparkles size={24} />,
              color: "rgba(205, 175, 115, 0.1)",
            },
            {
              title: "Spiritual Activation",
              description:
                "Books have the power to awaken new perspectives and transform thinking. Our platform helps activate these insights through thoughtful analysis.",
              icon: <BookOpen size={24} />,
              color: "rgba(205, 175, 115, 0.15)",
            },
            {
              title: "Intuitive Guidance",
              description:
                "Our AI assistant provides intuitive guidance through books, helping you discover connections and meanings that might otherwise remain hidden.",
              icon: <Compass size={24} />,
              color: "rgba(205, 175, 115, 0.1)",
            },
          ].map((card, index) => (
            <Col md={4} key={index}>
              <div
                className="feature-card"
                style={{
                  padding: "2rem",
                  height: "100%",
                  border: "1px solid rgba(205, 175, 115, 0.2)",
                  background: "rgba(10, 31, 28, 0.5)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.2), 0 0 15px rgba(205, 175, 115, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="card-glow"
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "150px",
                    height: "150px",
                    background: `radial-gradient(circle, ${card.color} 0%, rgba(10, 31, 28, 0) 70%)`,
                    borderRadius: "50%",
                    opacity: 0.8,
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    color: "#cdaf73",
                  }}
                >
                  <div
                    className="icon-container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(205, 175, 115, 0.1)",
                      marginRight: "1rem",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="font-heading mb-0"
                    style={{
                      color: "#cdaf73",
                      fontWeight: "300",
                      letterSpacing: "0.1em",
                      fontSize: "1.5rem",
                    }}
                  >
                    {card.title}
                  </h3>
                </div>

                <div className="decorative-line mb-3"></div>
                <p
                  style={{
                    color: "#e9e2d0",
                    letterSpacing: "0.02em",
                    lineHeight: "1.8",
                  }}
                >
                  {card.description}
                </p>

                {/* Decorative corner elements */}
                <div className="card-corner top-left"></div>
                <div className="card-corner bottom-right"></div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div
        className="py-5 position-relative"
        data-section="cta"
        style={{
          opacity: isVisible.cta ? 1 : 0,
          transform: isVisible.cta ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          marginTop: "2rem",
        }}
      >
        {/* Celestial moon decoration with parallax effect */}
        <div
          className="celestial-decoration bottom-left"
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            width: "180px",
            height: "180px",
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="moon-glow"></div>
          <img
            src="/celestial-moon.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.15,
              animation: "pulse 8s infinite ease-in-out",
            }}
          />
        </div>

        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <div className="mb-4 position-relative d-inline-block">
                <div className="decorative-symbol"></div>
                <h2
                  className="font-heading"
                  style={{
                    color: "#cdaf73",
                    fontWeight: "300",
                    letterSpacing: "0.15em",
                    fontSize: "2rem",
                    position: "relative",
                    display: "inline-block",
                    padding: "0 1.5rem",
                  }}
                >
                  Begin Your Literary Journey
                </h2>
                <div className="decorative-symbol"></div>
              </div>
              <div className="decorative-line mx-auto mb-4"></div>
              <p
                className="mx-auto mb-5"
                style={{
                  maxWidth: "600px",
                  color: "#a8a090",
                  letterSpacing: "0.05em",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  fontWeight: "300",
                }}
              >
                Explore the depths of literature with our AI-powered insights
                and discover new dimensions in your favorite books
              </p>
              <a
                href="/"
                className="btn-literary px-5 py-3"
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
                  display: "inline-block",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(205, 175, 115, 0.1)";
                  e.currentTarget.style.borderColor =
                    "rgba(205, 175, 115, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "rgba(205, 175, 115, 0.3)";
                }}
              >
                <span className="btn-text">Explore Books</span>
                <span className="btn-shine"></span>
              </a>
            </Col>
          </Row>
        </Container>
      </div>

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

        .arch-frame {
          border: 1px solid rgba(205, 175, 115, 0.3);
          padding: 10px;
        }

        .arch-frame::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid rgba(205, 175, 115, 0.3);
          z-index: 1;
          pointer-events: none;
        }

        .arch-frame::after {
          content: "";
          position: absolute;
          top: -10%;
          left: -10%;
          right: -10%;
          bottom: -10%;
          background: radial-gradient(
            ellipse at center,
            rgba(10, 31, 28, 0) 0%,
            rgba(10, 31, 28, 0.8) 100%
          );
          pointer-events: none;
          z-index: 2;
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

        .quote-block {
          position: relative;
          padding: 1.5rem 2rem;
          margin: 1.5rem 0;
          background: rgba(205, 175, 115, 0.05);
          border-left: 3px solid rgba(205, 175, 115, 0.3);
        }

        .quote-icon {
          position: absolute;
          top: 10px;
          left: 10px;
          color: rgba(205, 175, 115, 0.3);
        }

        .content-box {
          position: relative;
          z-index: 2;
        }

        .feature-card {
          backdrop-filter: blur(5px);
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

        .decorative-book-display {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .book-stack {
          position: relative;
          width: 180px;
          height: 250px;
          transform: perspective(800px) rotateY(15deg);
          transition: transform 0.5s ease;
        }

        .decorative-book-display:hover .book-stack {
          transform: perspective(800px) rotateY(25deg);
        }

        .book {
          position: absolute;
          border-radius: 2px;
          background: linear-gradient(
            to right,
            rgba(10, 31, 28, 0.8),
            rgba(10, 31, 28, 0.6)
          );
          box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .book::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 100%;
          background: rgba(205, 175, 115, 0.3);
          transform: skewY(45deg) translateX(-20px);
          transform-origin: top left;
        }

        .book::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 20px;
          background: rgba(205, 175, 115, 0.2);
          transform: skewX(45deg) translateY(-20px);
          transform-origin: top right;
        }

        .book-1 {
          width: 150px;
          height: 220px;
          background: linear-gradient(to right, #1a3634, #0f2422);
          border-left: 4px solid rgba(205, 175, 115, 0.6);
          z-index: 3;
        }

        .book-2 {
          width: 160px;
          height: 200px;
          background: linear-gradient(to right, #122a27, #0a1f1c);
          border-left: 4px solid rgba(205, 175, 115, 0.4);
          top: 30px;
          left: 20px;
          z-index: 2;
        }

        .book-3 {
          width: 140px;
          height: 210px;
          background: linear-gradient(to right, #0f2422, #071614);
          border-left: 4px solid rgba(205, 175, 115, 0.5);
          top: 15px;
          left: 40px;
          z-index: 1;
        }

        .decorative-book-display:hover .book-1 {
          transform: translateX(-10px) translateY(-5px);
        }

        .decorative-book-display:hover .book-2 {
          transform: translateX(5px) translateY(5px);
        }

        .decorative-book-display:hover .book-3 {
          transform: translateX(15px) translateY(-3px);
        }

        .quill-decoration {
          position: absolute;
          bottom: 40px;
          right: 40px;
          transform: rotate(-15deg);
          filter: drop-shadow(0 0 5px rgba(205, 175, 115, 0.3));
        }

        .decorative-scroll {
          position: absolute;
          bottom: 60px;
          left: 60px;
          width: 80px;
          height: 60px;
          background: rgba(233, 226, 208, 0.1);
          border: 1px solid rgba(205, 175, 115, 0.2);
          border-radius: 5px;
          transform: rotate(-5deg);
        }

        .decorative-scroll::before {
          content: "";
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          height: 1px;
          background: rgba(205, 175, 115, 0.3);
          box-shadow: 0 10px 0 rgba(205, 175, 115, 0.3),
            0 20px 0 rgba(205, 175, 115, 0.3), 0 30px 0 rgba(205, 175, 115, 0.3);
        }
      `}</style>
    </div>
  );
};

export default About;
