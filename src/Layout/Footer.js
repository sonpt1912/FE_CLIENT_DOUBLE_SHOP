import React from "react";
import "../styles/footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__logo">
                <Link to="/home">
                  <img src={require("../assets/Untitled.png")} alt="Logo" />
                </Link>
              </div>
              <p>
                The customer is at the heart of our unique business model, which
                includes design.
              </p>
              <a href="#">
                <img src="img/payment.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Shopping</h6>
              <ul>
                <li>
                  <a href="#">Clothing Store</a>
                </li>
                <li>
                  <a href="#">Trending Shoes</a>
                </li>
                <li>
                  <a href="#">Accessories</a>
                </li>
                <li>
                  <a href="#">Sale</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Shopping</h6>
              <ul>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Payment Methods</a>
                </li>
                <li>
                  <a href="#">Delivary</a>
                </li>
                <li>
                  <a href="#">Return & Exchanges</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
            <div className="footer__widget">
              <h6>NewLetter</h6>
              <div className="footer__newslatter">
                <p>
                  Be the first to know about new arrivals, look books, sales &
                  promos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
