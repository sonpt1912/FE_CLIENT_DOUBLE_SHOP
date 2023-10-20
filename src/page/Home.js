import React from "react";
import HeroSection from "../component/HeroSection"; // Đường dẫn tới HeroSection.js
import ProductSection from "../component/ProductItem";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}></h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <HeroSection />
      <br></br>
      <ProductSection />
    </div>
  );
};

export default Home;
