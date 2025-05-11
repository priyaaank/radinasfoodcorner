import React from "react";

export default function MenuSection({ category }) {
  return (
    <div className="card menu-section">
      <img 
        src={category.image} 
        alt={category.displayName}
        className="menu-category-image"
      />
      <h2>{category.displayName}</h2>
      <p className="menu-description">{category.description}</p>
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