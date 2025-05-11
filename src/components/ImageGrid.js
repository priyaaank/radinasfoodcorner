import React from 'react';
import AnimatedImage from './AnimatedImage';
import './ImageGrid.css';

const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-grid-item">
          <AnimatedImage
            src={image.src}
            alt={image.alt}
            text={image.text}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid; 