import React from "react";
import "./App.css";
import menu from "./data/menu.json";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import Review from "./components/Review";
import OrderingModel from "./components/OrderingModel";
import Location from "./components/Location";
import Footer from "./components/Footer";
import AnimatedImage from "./components/AnimatedImage";

function App() {
  return (
    <div>
      <Header />
      <div className="main-content" style={{ display: "flex", gap: 32, padding: 32 }}>
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
          <div style={{ display: "flex", gap: 16, margin: "24px 0" }}>
            <AnimatedImage src={menu.otherImages.dabeli} alt="Dabeli" text="Dabeli" style={{ width: "24%" }} />
            <AnimatedImage src={menu.otherImages.oatmealCookie} alt="Oatmeal Cookie" text="Oatmeal Cookie" style={{ width: "24%" }} />
            <AnimatedImage src={menu.otherImages.springRolls} alt="Spring Rolls" text="Spring Rolls" style={{ width: "24%" }} />
            <AnimatedImage src={menu.otherImages.pavBhaji} alt="Pav Bhaji" text="Pav Bhaji" style={{ width: "23%" }} />
          </div>
        </div>
        {/* Right Column */}
        <div style={{ flex: 1.2, minWidth: 350 }}>
          <h2 style={{ color: "var(--text-light)", fontWeight: 500, fontSize: "2rem", marginBottom: 24 }}>
            Crafting Love-Filled Plates with Premium, Healthy, Sustainable Ingredients
          </h2>
          <MenuSection category={menu.categories.snacks} />
          <div style={{ display: "flex", gap: 16, margin: "24px 0" }}>
            <AnimatedImage src={menu.otherImages.strawberryCheesecake} alt="Strawberry Cheesecake" text="Strawberry Cheesecake" style={{ width: "33%" }} />
            <AnimatedImage src={menu.otherImages.darkChocolateBrownie} alt="Dark Chocolate Brownie" text="Dark Chocolate Brownie" style={{ width: "33%" }} />
            <AnimatedImage src={menu.otherImages.biscotti} alt="Biscotti" text="Biscotti" style={{ width: "33%" }} />
          </div>
          <MenuSection category={menu.categories.beverages} />
          <Location />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;