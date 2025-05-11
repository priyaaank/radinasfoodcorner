import React from "react";
import specialData from "../data/curated-special.json";

export default function Header({ onSpecialClick }) {
  const hasSpecial = specialData.hasSpecial;
  const whatsappUrl = 'https://wa.me/919545966155';

  return (
    <header className="header">
      <h1>Radina's Foodcorner</h1>
      <nav className="nav">
        <a 
          href={whatsappUrl}
          className="contact-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <button 
          className={`special-btn ${!hasSpecial ? 'disabled' : ''}`}
          onClick={() => hasSpecial && onSpecialClick()}
          disabled={!hasSpecial}
        >
          Curated Special
        </button>
      </nav>
    </header>
  );
}