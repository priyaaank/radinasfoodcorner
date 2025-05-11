import React, { useState } from "react";
import specialData from "../data/todays-special.json";
import SpecialModal from "./SpecialModal";

export default function Header() {
  const [showSpecial, setShowSpecial] = useState(false);
  const hasSpecial = specialData.hasSpecial;

  const handleContact = () => {
    window.open('https://wa.me/919545966155', '_blank');
  };

  return (
    <header className="header">
      <h1>Radina's Foodcorner</h1>
      <nav className="nav">
        <button 
          className={`special-btn ${!hasSpecial ? 'disabled' : ''}`}
          onClick={() => hasSpecial && setShowSpecial(true)}
          disabled={!hasSpecial}
        >
          Today's Special
        </button>
        <button className="order-btn" onClick={handleContact}>Contact</button>
      </nav>

      {showSpecial && (
        <SpecialModal 
          special={specialData.special} 
          onClose={() => setShowSpecial(false)} 
        />
      )}
    </header>
  );
}