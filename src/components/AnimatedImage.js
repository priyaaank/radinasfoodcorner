import React, { useState } from 'react';
import './AnimatedImage.css';

const AnimatedImage = ({ src, alt, text, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`animated-image-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`animated-image ${isHovered ? 'hovered' : ''}`}
      />
      {text && (
        <div className={`image-overlay ${isHovered ? 'visible' : ''}`}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedImage; 