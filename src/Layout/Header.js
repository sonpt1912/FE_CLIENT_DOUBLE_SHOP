import React from "react";
import "../styles/Header.scss";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, Dropdown, Button, Affix } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
  const menu = (
    <Menu>
      <Menu.Item key="about">
        <Link to="/about">About Us</Link>
      </Menu.Item>
      <Menu.Item key="shop-details">
        <Link to="/shop-details">Shop Details</Link>
      </Menu.Item>
      <Menu.Item key="shopping-cart">
        <Link to="/shopping-cart">Shopping Cart</Link>
      </Menu.Item>
      <Menu.Item key="checkout">
        <Link to="/checkout">Check Out</Link>
      </Menu.Item>
      <Menu.Item key="blog-details">
        <Link to="/blog-details">Blog Details</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Affix offsetTop={0}>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
                <Link to="/home">
                  <img src={require("../assets/Untitled.png")} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/shop">
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Contacts
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <Link className="nav-link" to="/userProfile">
                  <FaHeart />
                </Link>
                <Link className="nav-link" to="/userProfile">
                  <FaUser />
                </Link>
                <a href="#">
                  <FaShoppingCart />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </header>
    </Affix>
  );
};

export default Header;
