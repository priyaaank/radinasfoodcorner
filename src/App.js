import React from "react";
import "./App.css";
import menu from "./data/menu.json";
import Header from "./components/Header";
import MenuSection from "./components/MenuSection";
import Review from "./components/Review";
import OrderingModel from "./components/OrderingModel";
import Location from "./components/Location";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <div className="main-content" style={{ display: "flex", gap: 32, padding: 32 }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 350 }}>
          <div className="card">
            <img src={menu.otherImages.main} alt="Restaurant Interior" />
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
            <img src={menu.otherImages.dabeli} alt="Choco Chunk Cookie" style={{ width: "24%" }} />
            <img src={menu.otherImages.oatmealCookie} alt="Biscotti" style={{ width: "24%" }} />
            <img src={menu.otherImages.springRolls} alt="Restaurant Ambiance" style={{ width: "24%" }} />
            <img src={menu.otherImages.pavBhaji} alt="Choco Chunk Cookie" style={{ width: "23%" }} />
          </div>
        </div>
        {/* Right Column */}
        <div style={{ flex: 1.2, minWidth: 350 }}>
          <h2 style={{ color: "var(--text-light)", fontWeight: 500, fontSize: "2rem", marginBottom: 24 }}>
            Crafting Love-Filled Plates with Premium, Healthy, Sustainable Ingredients
          </h2>
          <MenuSection category={menu.categories.snacks} />
          <div style={{ display: "flex", gap: 16, margin: "24px 0" }}>
            <img src={menu.otherImages.strawberryCheesecake} alt="Choco Chunk Cookie" style={{ width: "33%" }} />
            <img src={menu.otherImages.darkChocolateBrownie} alt="Biscotti" style={{ width: "33%" }} />
            <img src={menu.otherImages.biscotti} alt="Restaurant Ambiance" style={{ width: "33%" }} />
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