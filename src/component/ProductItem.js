import React from "react";
import "../styles/ProductItem.scss";
import HeartIcon from "../img/icon/heart.png";
import compareIcon from "../img/icon/compare.png";
import searchIcon from "../img/icon/search.png";
import productImage1 from "../img/product/product-1.jpg";
import { Card } from "antd";
const { Meta } = Card;

const ProductItem = (props) => {
  const { imageUrl, label, name, price } = props;

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
      <Card className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {label && <span className="label">{label}</span>}
          <ul className="product__hover">
            <li>
              <a href="#">
                <img src={HeartIcon} alt="Heart Icon" />{" "}
              </a>
            </li>
            {/* <li>
              <a href="#">
                <img src={compareIcon} alt="Compare Icon" />
                <span>Compare</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={searchIcon} alt="Search Icon" />
              </a>
            </li> */}
          </ul>
        </div>
        <div className="product__item__text">
          <h6>{name}</h6>
          {/* <a href="#" className="add-cart">
            + Add To Cart
          </a> */}
          <div className="rating">
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <h5>{price}</h5>
          {/* <div className="product__color__select">
            <label htmlFor="pc-1">
              <input type="radio" id="pc-1" />
            </label>
            <label className="active black" htmlFor="pc-2">
              <input type="radio" id="pc-2" />
            </label>
            <label className="grey" htmlFor="pc-3">
              <input type="radio" id="pc-3" />
            </label> */}
          {/* </div> */}
        </div>
      </Card>
    </div>
  );
};

const ProductSection = () => {
  return (
    <section className="product spad">
      <div className="col-lg-12">
        <ul className="filter__controls">
          <li className="active" data-filter="*">
            Best Sellers
          </li>
          <li data-filter=".new-arrivals">New Arrivals</li>
          <li data-filter=".hot-sales">Hot Sales</li>
        </ul>
      </div>
      <div className="row product__filter">
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
        <ProductItem
          imageUrl={productImage1}
          label="New"
          name="Piqué Biker Jacket"
          price="$67.24"
        />
      </div>
    </section>
  );
};

export default ProductSection;
