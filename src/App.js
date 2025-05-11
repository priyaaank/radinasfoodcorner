import React, { useState, useEffect } from "react";
import "./App.css";
import menu from "./data/menu.json";
import specialData from "./data/curated-special.json";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import Review from "./components/Review";
import OrderingModel from "./components/OrderingModel";
import Location from "./components/Location";
import Footer from "./components/Footer";
import AnimatedImage from "./components/AnimatedImage";
import SpecialModal from "./components/SpecialModal";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [showSpecial, setShowSpecial] = useState(false);
  
  const foodImages = [
    { src: menu.otherImages.dabeli, alt: "Dabeli", text: "Dabeli" },
    { src: menu.otherImages.oatmealCookie, alt: "Oatmeal Cookie", text: "Oatmeal Cookie" },
    { src: menu.otherImages.springRolls, alt: "Spring Rolls", text: "Spring Rolls" },
    { src: menu.otherImages.pavBhaji, alt: "Pav Bhaji", text: "Pav Bhaji" }
  ];

  const dessertImages = [
    { src: menu.otherImages.strawberryCheesecake, alt: "Strawberry Cheesecake", text: "Strawberry Cheesecake" },
    { src: menu.otherImages.darkChocolateBrownie, alt: "Dark Chocolate Brownie", text: "Dark Chocolate Brownie" },
    { src: menu.otherImages.biscotti, alt: "Biscotti", text: "Biscotti" },
    { src: menu.otherImages.cupcakes, alt: "Choco Chunk Cupcakes", text: "Choco Chunk Cupcakes" }
  ];
  
  useEffect(() => {
    // Check URL parameters when component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const hasSpecialParam = urlParams.get('special') === 'true';
    
    // Only show special if it exists and URL parameter is present
    if (hasSpecialParam && specialData.hasSpecial) {
      setShowSpecial(true);
      
      // Update URL without the parameter but maintain history
      const newUrl = window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Header onSpecialClick={() => setShowSpecial(true)} />
      <div className="main-content">
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 350 }}>
          <div className="card">
            <AnimatedImage 
              src={menu.otherImages.generic} 
              alt="Restaurant Interior"
              text="Welcome to Radina's Foodcorner"
            />
            <h4>OUR FOOD</h4>
            <p>
              At Radina's Foodcorner, every dish begins with a simple promise: cook as if we're feeding the people we love most. That means hand-picking premium, locally sourced produce, then weaving them into time-honored recipes that nourish without compromise.
            </p>
            <OrderingModel />
          </div>
          <MenuSection category={menu.categories.bakes} />
          <Review />
          <MenuSection category={menu.categories.streetfood} />
          <ImageGrid images={foodImages} />
        </div>
        {/* Right Column */}
        <div style={{ flex: 1.2, minWidth: 350 }}>
          <h2 style={{ color: "var(--text-light)", fontWeight: 500, fontSize: "2rem", marginBottom: 24 }}>
            Crafting Love-Filled Plates with Premium, Healthy, Sustainable Ingredients
          </h2>
          <MenuSection category={menu.categories.snacks} />
          <ImageGrid images={dessertImages} />
          <MenuSection category={menu.categories.beverages} />
          <Location />
        </div>
      </div>
      <Footer />
      
      {showSpecial && specialData.hasSpecial && (
        <SpecialModal 
          special={specialData.special} 
          onClose={() => setShowSpecial(false)} 
        />
      )}
    </div>
  );
}

export default App;
