/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Product from "../API/Product";
import { Link, useHistory } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Button, Col, InputNumber, Radio, Row, Space, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CartAPI from "../API/CartAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Detail_Product.propTypes = {};
function Detail_Product(props) {
  const { id } = useParams();
  const sliderRef = useRef(null);
  const history = useHistory();

  const [product, setProduct] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState(size[0]?.id);
  const [selectedColor, setSelectedColor] = useState(color[0]?.id);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [collar, setCollar] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Product.Get_Detail_Product(id);
      console.log("Product", response);
      setProduct(response);
      setBrand(response.brand.name);
      setCategory(response.category.name);
      setCollar(response.category.name);
      setMaterial(response.material.name);
    };
    fetchData();
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const checkInputValue = (value) => {
    if (value < 1) {
      setQuantity(1);
    }
  };

  useEffect(() => {
    const params = {
      idProduct: product.id,
    };

    const fetchDataSize = async () => {
      try {
        const response = await Product.Get_Detail_Product_Size(params);
        if (response.length > 0) {
          setSelectedSize(response[0].id);
        }
        setSize(response);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchDataSize();
  }, [id, product.id]);

  useEffect(() => {
    const params = {
      idProduct: product.id,
      idSize: selectedSize,
    };

    const fetchDataColor = async () => {
      try {
        const response = await Product.Get_Detail_Product_Color(params);
        if (response.length > 0) {
          setSelectedColor(response[0].id);
        }
        setColor(response);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchDataColor();
  }, [product.id, selectedSize]);

  useEffect(() => {
    const params = {
      idProduct: product.id,
      idSize: selectedSize,
      idColor: selectedColor,
    };

    const fetchDataDetail = async () => {
      try {
        const response = await Product.Get_Detail_Product_Detail(params);
        setDetailProduct(response);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchDataDetail();
  }, [product.id, selectedColor, selectedSize]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        idDetailProduct: detailProduct.id,
        quantity: quantity,
      };
      let payloadLocal = {
        quantity: quantity,
        color: detailProduct.color,
        discountAmount: detailProduct.discountAmount || 0,
        product: product,
        listImages: product.listImages,
        price: detailProduct.price,
        size: detailProduct.size,
        id: detailProduct.id,
      };

      const token = localStorage.getItem("token");

      if (token) {
        const response = await CartAPI.Add_Product_To_Cart(payload);

        if (response) {
          message.success("Bạn Đã Thêm Hàng Thành Công!");
        } else {
          message.error("Thêm thất bại");
        }
      } else {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cartItems.findIndex(
          (item) => item.id === payloadLocal.id
        );
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += payloadLocal.quantity;
        } else {
          cartItems.push(payloadLocal);
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));

        message.success("Sản phẩm đã được thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };
  const handleFavoriteToggle = async () => {
    if (!isFavorite) {
      try {
        const reponse = await Product.Add_Favorite_Product({
          idProduct: detailProduct.id,
        });
        if (reponse) {
          message.success("Đã thêm sản phẩm vào danh sách yêu thích");
          setIsFavorite(!isFavorite);
        } else {
          message.error("Đã xảy ra lỗi! Vui lòng thử lại");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      try {
        const reponse = await Product.Delete_Favorite_Product({
          idProduct: detailProduct.id,
        });
        if (reponse) {
          message.success("Đã xóa sản phẩm vào danh sách yêu thích");
          setIsFavorite(!isFavorite);
        } else {
          message.error("Đã xảy ra lỗi! Vui lòng thử lại");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  const handleBuyNow = () => {

    let payloadLocal = {
      quantity: quantity,
      color: detailProduct.color,
      discountAmount: detailProduct.discountAmount || 0,
      product: product,
      listImages: product.listImages,
      price: detailProduct.price,
      size: detailProduct.size,
      id: detailProduct.id,
    };
    console.log("Buy Now: ",payloadLocal );

    history.push({
      pathname: "/checkout",
      state: [payloadLocal],
    });
  };

  return (
    <div>
      {showSuccess && (
        <div className="modal_success">
          <div className="group_model_success pt-3">
            <div className="text-center p-2">
              <i
                className="fa fa-bell fix_icon_bell"
                style={{ fontSize: "40px", color: "#fff" }}
              ></i>
            </div>
            <h4 className="text-center p-3" style={{ color: "#fff" }}>
              Bạn Đã Thêm Hàng Thành Công!
            </h4>
          </div>
        </div>
      )}

      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/shop/product">Sản Phẩm</Link>
              </li>
              <Link className="active">{product.name}</Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-wraper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6">
              <div className="product-details-left">
                <Slider
                  {...settings}
                  asNavFor={sliderRef.current}
                  ref={(slider) => (sliderRef.current = slider)}
                >
                  {product.listImages?.resources.map((image, index) => (
                    <div key={index}>
                      <img
                        style={{ width: "90%", height: "auto" }}
                        src={image.url}
                        alt={`Product Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-lg-6 col-md-6" style={{ marginLeft: "3rem" }}>
              <div className="product-details-view-content">
                <h4 className="title text-dark">{product.name}</h4>
                <div className="mb-3">
                  <span className="h5 text-danger">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "decimal",
                      decimal: "VND",
                    }).format(detailProduct.price) + " VNĐ"}
                  </span>
                </div>
                <div className="mb-4">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ display: "flex", gap: "1.4rem" }}>
                        <h6 className="font-semibold mr-2">Hãng:</h6>
                        <span>{brand}</span>
                      </div>
                      <div style={{ display: "flex", gap: "2rem" }}>
                        <h6 className="font-semibold mr-2">Loại:</h6>
                        <span>{category}</span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ display: "flex", gap: "3.5rem" }}>
                        <h6 className="font-semibold mr-2">Cổ áo:</h6>
                        <span>{collar}</span>
                      </div>
                      <div style={{ display: "flex", gap: "2rem" }}>
                        <h6 className="font-semibold mr-2">Chất Liệu:</h6>
                        <span>{material}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="mb-2 text-lg font-semibold">Size</h4>
                    <Radio.Group
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(e.target.value)}
                      buttonStyle="solid"
                    >
                      <Space className="bg-gray-100 ">
                        {size.map((size) => (
                          <Radio.Button
                            key={size.id}
                            value={size.id}
                            style={{
                              width: "40px",
                              height: "40px",
                              fontWeight: "bold",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className="shadow-md transition-colors duration-300 hover:bg-gray-300"
                          >
                            {size.name}
                          </Radio.Button>
                        ))}
                      </Space>
                    </Radio.Group>
                  </div>

                  {selectedSize && (
                    <div className="mb-4">
                      <h4 className="mb-2">Color</h4>
                      <Radio.Group
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                      >
                        <Space>
                          {color.map((color) => (
                            <Radio.Button
                              key={color.id}
                              value={color.id}
                              className="shadow-md transition-colors duration-300 hover:bg-gray-300"
                              style={{
                                backgroundColor: color.code,
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  )}
                </div>

                <div
                  className="quantity-input-container"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h4 className="mb-2">Số Lượng</h4>
                  <div
                    className="quantity-btn-group"
                    style={{ display: "flex", gap: 4 }}
                  >
                    <Button
                      className="quantity-btn"
                      style={{ height: "3rem" }}
                      onClick={decreaseQuantity}
                    >
                      <MinusOutlined />
                    </Button>
                    <InputNumber
                      id="form1"
                      min={1}
                      value={quantity}
                      onChange={setQuantity}
                      className="quantity-input"
                      onBlur={(e) => checkInputValue(e.target.value)}
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    />
                    <Button
                      className="quantity-btn"
                      onClick={increaseQuantity}
                      style={{ height: "3rem" }}
                    >
                      <PlusOutlined />
                    </Button>
                    {detailProduct.quantity && (
                      <div
                        style={{
                          color: "#757575",
                          fontSize: "larger",
                          marginTop: "0.7rem",
                        }}
                      >
                        Còn {detailProduct.quantity} sản phẩm
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div className="btn-add-to-cart" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </div>
                    <div
                      onClick={handleFavoriteToggle}
                      style={{ cursor: "pointer" }}
                    >
                      {isFavorite ? (
                        <AiFillHeart
                          size={43}
                          weight="bold"
                          style={{
                            color: "red",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        />
                      ) : (
                        <AiOutlineHeart
                          size={43}
                          weight="bold"
                          style={{
                            color: "black",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="add-to-cart" onClick={handleBuyNow}>
                    Mua ngay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail_Product;
