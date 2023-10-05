import React from "react";
import "../styles/Header.css";
import { BsSearch, BsHeart, BsCart } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="header__logo">
              <a href="./index.html">
                <img src={require("../assets/Untitled.png")} alt="Logo" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="./index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./shop.html">
                    Shop
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="pagesDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="pagesDropdown"
                  >
                    <a className="dropdown-item" href="./about.html">
                      About Us
                    </a>
                    <a className="dropdown-item" href="./shop-details.html">
                      Shop Details
                    </a>
                    <a className="dropdown-item" href="./shopping-cart.html">
                      Shopping Cart
                    </a>
                    <a className="dropdown-item" href="./checkout.html">
                      Check Out
                    </a>
                    <a className="dropdown-item" href="./blog-details.html">
                      Blog Details
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./blog.html">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./contact.html">
                    Contacts
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <a href="#" className="search-switch">
                <BsSearch />
              </a>
              <a href="#">
                <BsHeart />
              </a>
              <a href="#">
                <BsCart />
              </a>
              <div className="price">$0.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="canvas__open">
        <i className="fa fa-bars"></i>
      </div>
    </header>
  );
};

export default Header;
