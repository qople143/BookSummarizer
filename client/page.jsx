"use client";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {
  Search,
  Sparkles,
  BookText,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container fluid className="p-0">
      {/* Hero Section with Gradient */}
      <div
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          borderRadius: "0 0 25% 25% / 10%",
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-3">
                Discover Books in a Whole New Way
              </h1>
              <p className="lead mb-4">
                Get AI-powered summaries, insights, and interactive Q&A for any
                book. Expand your reading horizons with our intelligent book
                companion.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="px-4 py-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Get Started
                </Button>
                <Link href="/about" passHref>
                  <Button
                    variant="light"
                    size="lg"
                    className="px-4 py-2 text-primary"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div
                className="p-4 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <img
                  src="/placeholder.svg?height=350&width=400"
                  alt="Book Summary App"
                  className="img-fluid rounded-3"
                  style={{ maxHeight: "350px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search Section */}
      <Container
        className="py-5 position-relative"
        style={{ marginTop: "-80px" }}
      >
        <Card
          className="shadow-lg border-0 rounded-4 p-4"
          style={{
            background: "linear-gradient(to right, #ffffff, #f8f9fa)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col lg={7} className="mb-4 mb-lg-0">
                <h2 className="fw-bold mb-3">Find Your Next Book Summary</h2>
                <p className="text-muted mb-0">
                  Enter any book title to get an AI-generated summary and
                  insights
                </p>
              </Col>
              <Col lg={5}>
                <Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="e.g., To Kill a Mockingbird"
                    className="me-2 py-2 shadow-sm"
                    style={{ borderRadius: "10px 0 0 10px" }}
                  />
                  <Button
                    className="px-4"
                    style={{
                      borderRadius: "0 10px 10px 0",
                      background: "linear-gradient(to right, #4158D0, #C850C0)",
                      border: "none",
                    }}
                  >
                    <Search size={20} />
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="fw-bold mb-3">Powerful Features</h2>
            <p className="lead text-muted">
              Explore books like never before with our AI-powered tools
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {[
            {
              icon: <BookText size={24} />,
              title: "Concise Summaries",
              description:
                "Get the essence of any book in minutes with our AI-generated summaries",
              gradient: "linear-gradient(135deg, #13f1fc 0%, #0470dc 100%)",
            },
            {
              icon: <MessageSquare size={24} />,
              title: "Interactive Q&A",
              description:
                "Ask questions about the book and get intelligent, contextual answers",
              gradient: "linear-gradient(135deg, #f83600 0%, #f9d423 100%)",
            },
            {
              icon: <Sparkles size={24} />,
              title: "Key Insights",
              description:
                "Discover themes, character analyses, and important takeaways",
              gradient: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            },
            {
              icon: <TrendingUp size={24} />,
              title: "Personalized Recommendations",
              description:
                "Get book recommendations based on your reading preferences",
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
          ].map((feature, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <Card.Body className="p-4">
                  <div
                    className="rounded-circle p-3 d-inline-flex mb-3 text-white"
                    style={{ background: feature.gradient }}
                  >
                    {feature.icon}
                  </div>
                  <Card.Title className="fw-bold">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* How It Works Section */}
      <div
        className="py-5 my-5"
        style={{
          background: "linear-gradient(to right, #f8f9fa, #ffffff, #f8f9fa)",
        }}
      >
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-3">How It Works</h2>
              <p className="lead text-muted">
                Get started in three simple steps
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {[
              {
                step: "01",
                title: "Enter a Book Title",
                description:
                  "Type in the name of any book you're interested in",
                icon: <Search size={32} />,
              },
              {
                step: "02",
                title: "Get AI Summary",
                description:
                  "Our AI generates a comprehensive summary and analysis",
                icon: <Sparkles size={32} />,
              },
              {
                step: "03",
                title: "Explore & Interact",
                description:
                  "Ask questions and dive deeper into the book's content",
                icon: <MessageSquare size={32} />,
              },
            ].map((step, index) => (
              <Col md={4} key={index}>
                <Card
                  className="h-100 border-0 shadow-sm position-relative overflow-hidden"
                  style={{ borderRadius: "16px" }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      top: 0,
                      right: 0,
                      width: "120px",
                      height: "120px",
                      background:
                        "linear-gradient(135deg, rgba(200, 80, 192, 0.1) 0%, rgba(65, 88, 208, 0.1) 100%)",
                      borderRadius: "0 0 0 120px",
                    }}
                  ></div>
                  <Card.Body className="p-4 position-relative">
                    <div
                      className="rounded-circle mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        background:
                          "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
                        color: "white",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="position-absolute text-black-50"
                      style={{
                        top: "20px",
                        right: "20px",
                        fontSize: "3rem",
                        fontWeight: "800",
                        opacity: "0.1",
                      }}
                    >
                      {step.step}
                    </div>
                    <Card.Title className="fw-bold mb-3">
                      {step.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {step.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Example Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0">
            <h2 className="fw-bold mb-4">See It In Action</h2>
            <p className="mb-4">
              Our AI doesn't just summarize books—it understands them. Get
              insights, analysis, and answers to your specific questions about
              any book.
            </p>
            <div className="mb-4">
              {[
                "Fiction",
                "Non-Fiction",
                "Self-Help",
                "Business",
                "Science",
              ].map((category, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  size="sm"
                  className="me-2 mb-2 rounded-pill px-3"
                >
                  {category}
                </Button>
              ))}
            </div>
            <Button
              className="px-4 py-2"
              style={{
                background: "linear-gradient(to right, #4158D0, #C850C0)",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Try With Your Book
            </Button>
          </Col>
          <Col lg={7}>
            <Card
              className="border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: "16px" }}
            >
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col
                    md={4}
                    className="bg-light d-flex align-items-center justify-content-center p-4"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=200"
                      alt="Book Cover"
                      className="img-fluid rounded-3 shadow"
                      style={{ maxHeight: "300px" }}
                    />
                  </Col>
                  <Col md={8}>
                    <div className="p-4">
                      <h4 className="fw-bold mb-2">1984 by George Orwell</h4>
                      <p className="text-muted small mb-3">
                        Dystopian Fiction • 328 pages
                      </p>
                      <div
                        className="mb-3 p-3 rounded-3"
                        style={{
                          background:
                            "linear-gradient(to right, #f8f9fa, #ffffff)",
                          border: "1px solid #f0f0f0",
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        <p className="mb-0">
                          "1984 depicts a dystopian society where citizens are
                          under constant surveillance by 'Big Brother.' The
                          protagonist, Winston Smith, works at the Ministry of
                          Truth rewriting history to match Party doctrine..."
                        </p>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="rounded-circle p-2 me-2 d-flex align-items-center justify-content-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #4158D0 0%, #C850C0 100%)",
                            width: "36px",
                            height: "36px",
                          }}
                        >
                          <MessageSquare size={18} className="text-white" />
                        </div>
                        <div className="flex-grow-1">
                          <Form.Control
                            type="text"
                            placeholder="Ask a question about this book..."
                            className="border-0 bg-light"
                            style={{ borderRadius: "20px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div
        className="py-5 mt-5 text-white"
        style={{
          background: "linear-gradient(135deg, #C850C0 0%, #4158D0 100%)",
          borderRadius: "25% 25% 0 0 / 10%",
        }}
      >
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-5 fw-bold mb-4">
                Ready to Explore Books Deeper?
              </h2>
              <p className="lead mb-4">
                Join thousands of readers who use our AI book summary app to
                discover new books and gain deeper insights.
              </p>
              <Button
                variant="light"
                size="lg"
                className="px-5 py-3 fw-bold text-primary"
              >
                Get Started Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Custom CSS for hover effects */}
      <style jsx global>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </Container>
  );
}
