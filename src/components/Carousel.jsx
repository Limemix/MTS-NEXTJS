"use client";
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import '@/styles/Carousel.css';

const Carousel = ({ children, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId;
    
    if (duration) {
      intervalId = setInterval(goToNextSlide, duration);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, duration]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextSlide(),
    onSwipedRight: () => goToPrevSlide(),
  });

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % children.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + children.length) % children.length;
    setCurrentIndex(prevIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel" {...handlers}>
      <div className="slides-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((slide, index) => (
          <div key={index} className="slide">
            {slide}
          </div>
        ))}
      </div>
      <button className="prev" onClick={goToPrevSlide}>&lt;</button>
      <button className="next" onClick={goToNextSlide}>&gt;</button>
      <div className="navigation">
        <div className="dots">
          {children.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? "dot active" : "dot"}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
