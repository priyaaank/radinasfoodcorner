import React from "react";

export default function Header() {
  return (
    <header className="header">
      <h1>Radina's Foodcorner</h1>
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Menu</a>
        <button className="order-btn">Contact</button>
      </nav>
    </header>
  );
}