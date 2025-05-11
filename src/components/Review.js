import React, { useState, useEffect } from "react";
import reviews from "../data/reviews.json";

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const currentReview = reviews.reviews[currentIndex];

  return (
    <div className="review">
      <div className="review-carousel">
        <div className="review-stars">★★★★★</div>
        <div className="review-text">
          <strong>{currentReview.text}</strong>
        </div>
        <div className="review-author">{currentReview.author}</div>
        <div className="review-dots">
          {reviews.reviews.map((_, index) => (
            <span 
              key={index}
              className={`review-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}