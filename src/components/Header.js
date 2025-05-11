import React from "react";
import specialData from "../data/todays-special.json";

export default function Header({ onSpecialClick }) {
  const hasSpecial = specialData.hasSpecial;

  const handleContact = () => {
    window.open('https://wa.me/919545966155', '_blank');
  };

  return (
    <header className="header">
      <h1>Radina's Foodcorner</h1>
      <nav className="nav">
        <a href="#" className="contact-link" onClick={(e) => {
          e.preventDefault();
          handleContact();
        }}>
          Contact
        </a>
        <button 
          className={`special-btn ${!hasSpecial ? 'disabled' : ''}`}
          onClick={() => hasSpecial && onSpecialClick()}
          disabled={!hasSpecial}
        >
          Today's Special
        </button>
      </nav>
    </header>
  );
}