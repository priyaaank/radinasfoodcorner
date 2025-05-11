import React from "react";
import AnimatedImage from "./AnimatedImage";

export default function MenuSection({ category }) {
  return (
    <div className="card menu-section">
      <AnimatedImage 
        src={category.image} 
        alt={category.displayName}
        text={category.description}
        className="menu-category-image"
      />
      <h2>{category.displayName}</h2>
      <ul className="menu-list">
        {category.items.map((item, idx) => (
          <li key={idx}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}