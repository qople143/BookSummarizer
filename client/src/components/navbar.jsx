import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbars() {
  return (
    <Navbar
      expand="lg"
      className="navbar-dark py-3"
      style={{
        backgroundColor: "#0a1f1c",
        borderBottom: "1px solid rgba(205, 175, 115, 0.15)",
      }}
    >
      <Container>
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/logo192.png"
            alt="Literary Insights Logo"
            className="me-2"
            style={{
              height: "32px",
              width: "auto",
            }}
          />
          <h3
            className="mb-0 font-heading tracking-wide"
            style={{
              color: "#cdaf73",
              fontWeight: "300",
              letterSpacing: "0.1em",
            }}
          >
            Literary Insights
          </h3>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Link
              to="/"
              className="nav-link mx-3"
              style={{
                color: "#cdaf73",
                letterSpacing: "0.1em",
                fontSize: "0.9rem",
                fontWeight: "300",
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link mx-3"
              style={{
                color: "#cdaf73",
                letterSpacing: "0.1em",
                fontSize: "0.9rem",
                fontWeight: "300",
              }}
            >
              About
            </Link>
            {/* <Link
              to="/summaries"
              className="nav-link mx-3"
              style={{
                color: "#cdaf73",
                letterSpacing: "0.1em",
                fontSize: "0.9rem",
                fontWeight: "300",
              }}
            >
              Summaries
            </Link>
            <Link
              to="/account"
              className="nav-link mx-3"
              style={{
                color: "#cdaf73",
                letterSpacing: "0.1em",
                fontSize: "0.9rem",
                fontWeight: "300",
              }}
            >
              Account
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
