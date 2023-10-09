import React from "react";
import HeroSection from "../Component/HeroSection"; // Đường dẫn tới HeroSection.js
import ProductSection from "../Component/ProductItem";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <br></br>
      <ProductSection />
      <div>Content of Home</div>
    </div>
  );
};

export default Home;
