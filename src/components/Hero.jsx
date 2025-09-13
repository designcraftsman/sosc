import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import heroData from '../data/hero.json';


// Import images dynamically and optimize for SEO
const importImage = (imagePath) => {
  return import(`../assets/${imagePath}`).then(module => module.default);
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState([]);

  // Load images and set up slides with SEO optimization
  useEffect(() => {
    const loadSlides = async () => {
      const loadedSlides = await Promise.all(
        heroData.slides.map(async (slide) => ({
          ...slide,
          image: await importImage(slide.image),
          altText: slide.altText, // Assuming altText is available in heroData for SEO
        }))
      );
      setSlides(loadedSlides);
    };
    loadSlides();
  }, []);

  // Handle slide selection
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused && slides.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  // Render component only when slides are loaded
  if (slides.length === 0) return null;

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
        fade={true}
      >
        {slides.map((slide, i) => (
          <Carousel.Item
            key={i}
            className={`hero-carousel__item image${i + 1}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <img src={slide.image} alt={slide.altText} className="d-none" /> {/* For SEO purposes */}
            <div className="hero-carousel__item__caption staggered-animations">
              <div className="icon-underline slide-up mb-5"></div>
              <h1 className="display-4 fw-bold slide-up">{slide.title}</h1>
              <h2 className="fs-4 mb-3 fw-light slide-up">{slide.text}</h2>
              <a href="/portfolio-v1" className="btn btn-secondary text-white rounded-pill px-4 hover-filled-slide-down slide-up fw-bold">
                <span>{slide.buttonText}</span>
              </a>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* Custom navigation dots */}
      <div className="hero-carousel__nav">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={index === i ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
