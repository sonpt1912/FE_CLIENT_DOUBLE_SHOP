import React from "react";
import "../styles/Header.css";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, Dropdown, Button } from "antd";
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
    <header className="header">
      <div className="container">
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
                <li className="nav-item ">
                  <Dropdown overlay={menu}>
                    <Link
                      className="nav-link "
                      id="pagesDropdown"
                      role="button"
                    >
                      Pages <DownOutlined />
                    </Link>
                  </Dropdown>
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
              <a href="#" className="search-switch">
                <FaSearch />
              </a>
              <a href="#">
                <FaHeart />
              </a>
              <a href="#">
                <FaUser />
              </a>
              <a href="#">
                <FaShoppingCart />{" "}
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
