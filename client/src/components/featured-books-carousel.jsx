"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "react-bootstrap";

// Sample book data with placeholder images
const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://placehold.co/250x400?text=The+Great+Gatsby",
    year: "1925",
    genre: "Classic Fiction",
    description:
      "A tale of wealth, love, and the American Dream set in the Roaring Twenties, following the mysterious millionaire Jay Gatsby.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://placehold.co/250x400?text=To+Kill+a+Mockingbird",
    year: "1960",
    genre: "Southern Gothic",
    description:
      "A story of racial injustice and moral growth in the American South during the Great Depression, seen through the eyes of a young girl.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://placehold.co/250x400?text=1984",
    year: "1949",
    genre: "Dystopian Fiction",
    description:
      "A chilling portrayal of a totalitarian future where critical thought is suppressed under a surveillance state.",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://placehold.co/250x400?text=Pride+and+Prejudice",
    year: "1813",
    genre: "Romance",
    description:
      "A romantic novel of manners that follows the character development of Elizabeth Bennet in Georgian England.",
  },
  {
    id: 5,
    title: "The Odyssey",
    author: "Homer",
    coverUrl: "https://placehold.co/250x400?text=The+Odyssey",
    year: "8th Century BCE",
    genre: "Epic Poetry",
    description:
      "An ancient Greek epic poem that follows the hero Odysseus on his journey home after the Trojan War.",
  },
];

const FeaturedBooksCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 576) setVisibleItems(1);
      else if (width < 768) setVisibleItems(2);
      else setVisibleItems(3);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuredBooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? featuredBooks.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredBooks.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const getVisibleBooks = () => {
    const books = [];
    for (let i = 0; i < visibleItems; i++) {
      books.push(featuredBooks[(activeIndex + i) % featuredBooks.length]);
    }
    return books;
  };

  return (
    <div className="featured-books-carousel position-relative">
      <div className="carousel-inner d-flex">
        {getVisibleBooks().map((book) => (
          <div
            key={book.id}
            className="carousel-item"
            style={{ flex: `0 0 ${100 / visibleItems}%`, padding: "0 10px" }}
          >
            <div className="book-card position-relative">
              <div className="book-cover-wrapper">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/250x400?text=Image+Not+Found";
                  }}
                />
                <div
                  className="book-info-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    color: "#fff",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 40%, transparent 80%)",
                  }}
                >
                  <h5 className="mb-1" style={{ fontWeight: "bold" }}>
                    {book.title}
                  </h5>
                  <small style={{ opacity: 0.8 }}>
                    {book.author} &middot; {book.year}
                  </small>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                      opacity: 0.7,
                    }}
                  >
                    {book.genre}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="dark"
        className="carousel-control-prev"
        style={{
          position: "absolute",
          top: "50%",
          left: "0.5rem",
          transform: "translateY(-50%)",
          zIndex: 20,
          backgroundColor: "rgba(0,0,0,0.4)",
          border: "none",
        }}
        onClick={() => {
          prevSlide();
          setIsPlaying(false);
        }}
      >
        <ChevronLeft size={24} />
      </Button>

      <Button
        variant="dark"
        className="carousel-control-next"
        style={{
          position: "absolute",
          top: "50%",
          right: "0.5rem",
          transform: "translateY(-50%)",
          zIndex: 20,
          backgroundColor: "rgba(0,0,0,0.4)",
          border: "none",
        }}
        onClick={() => {
          nextSlide();
          setIsPlaying(false);
        }}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Carousel Dots */}
      <div className="carousel-dots text-center mt-3">
        {featuredBooks.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: index === activeIndex ? "#cdaf73" : "#ccc",
              margin: "0 5px",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooksCarousel;
