import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  InputNumber,
  Button,
  Space,
  Popconfirm,
  message,
  Image,
  Popover,
  Checkbox,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CartAPI from "../API/CartAPI";
import { Link, useHistory } from "react-router-dom";

const { Meta } = Card;

function Cart(props) {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isloadData, setLoadData] = useState(false);
  const [list_carts, set_list_carts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    history.push({
      pathname: "/checkout",
      state: selectedProducts,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchDataCarts = async () => {
        try {
          setLoading(true);
          const reponse = await CartAPI.Get_Cart({});
          console.log("Cart response: ", reponse);
          set_list_carts(reponse);
          setLoadData(false);
        } catch (error) {
          console.log("Error", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDataCarts();
    } else {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        set_list_carts(cartItems);
        setLoadData(false);
      } catch (error) {
        message.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [isloadData]);

  const handleQuantityChange = async (value, productId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const params = {
          id: productId,
          quantity: value,
        };
        const response = await CartAPI.Update_Quantity_Product(params);
        if (response) {
          setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.map((product) =>
              product.id === productId
                ? { ...product, quantity: value }
                : product
            )
          );
          setLoadData(true);
        } else {
          message.error("Cập nhật số lượng thất bại");
        }
      } else {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCartItems = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: value } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        setSelectedProducts((prevSelectedProducts) =>
          prevSelectedProducts.map((product) =>
            product.id === productId ? { ...product, quantity: value } : product
          )
        );
        setLoadData(true);
      }
    } catch (error) {
      message.error("Cập nhật số lượng thất bại");
    }
  };
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((selectedProduct) => {
      const product = list_carts.find((p) => p.id === selectedProduct.id);
      if (product) {
        const discountedPrice = product.price - product.discountAmount;
        total += discountedPrice * product.quantity;
      }
    });
    return total;
  };
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedProducts, list_carts]);

  const handleProductSelect = (product, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    }
  };

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    if (token) {
      CartAPI.Delete_Cart({ id: productId })
        .then((response) => {
          if (response) {
            message.success("Xóa sản phẩm thành công");
            setLoadData(true);
          } else {
            message.error("Xóa thất bại! Vui lòng thử lại");
          }
        })
        .catch((error) => {
          console.log("Error deleting product", error);
        });
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setLoadData(true);
      message.success("Xóa sản phẩm thành công");
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18} style={{ padding: "3rem" }}>
          <Card
            style={{
              width: "100%",
              border: " 1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          >
            <h4 class="card-title mb-4">Giỏ hàng của bạn</h4>
            {loading && (
              <Row
                justify="center"
                align="middle"
                style={{ minHeight: "300px" }}
              >
                <Spin size="large" />
              </Row>
            )}
            {!loading && (
              <Row gutter={[16, 16]}>
                {list_carts.map((product, index) => (
                  <Col span={24} key={index}>
                    <Card hoverable style={{ width: "100%" }}>
                      <Row gutter={[16, 16]} align="middle">
                        <Col span={2}>
                          <Checkbox
                            checked={selectedProducts.some(
                              (p) => p.id === product.id
                            )}
                            onChange={(e) =>
                              handleProductSelect(product, e.target.checked)
                            }
                          />
                        </Col>
                        <Col span={5}>
                          <Col span={5}>
                            <Popover
                              placement="right"
                              title={null}
                              content={
                                <div
                                  style={{ display: "flex", flexWrap: "wrap" }}
                                >
                                  {product.listImages?.resources.map(
                                    (image, index) => (
                                      <div key={index}>
                                        <Image
                                          width={70}
                                          src={image.url}
                                          alt={`Ảnh ${index + 1}`}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              }
                            >
                              <Image
                                width={110}
                                src={
                                  product.listImages?.resources[0]?.url || ""
                                }
                                alt={`Ảnh 1`}
                                preview={false}
                              />
                            </Popover>
                          </Col>
                        </Col>
                        <Col span={7}>
                          <Meta
                            title={product.product.name}
                            description={`Kích cỡ: ${product.size.name} - Màu: ${product.color.name}`}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            value={product.quantity}
                            onChange={(value) =>
                              handleQuantityChange(value, product.id)
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <div>
                            {product.discountAmount > 0 ? (
                              <>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    color: "red",
                                  }}
                                >
                                  {product.price.toLocaleString("en-US")}đ
                                </span>
                                <span style={{ marginLeft: "8px" }}>
                                  {(
                                    product.price - product.discountAmount
                                  ).toLocaleString("en-US")}
                                  đ
                                </span>
                              </>
                            ) : (
                              <span>
                                {product.price.toLocaleString("en-US")}đ
                              </span>
                            )}
                          </div>
                        </Col>
                        <Col span={2}>
                          <Space>
                            <Popconfirm
                              title="Are you sure to delete this product?"
                              onConfirm={() => handleDelete(product.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Popconfirm>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
        <Col span={5} style={{ padding: " 3rem 0" }}>
          <Card
            style={{
              width: "100%",
              border: " 1px solid #d9d9d9",
              borderRadius: "8px",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <h6>Tổng tiền :</h6>
              </Col>
              <Col span={10}>
                <h6>{calculateTotalPrice().toLocaleString("en-US")} VNĐ</h6>
              </Col>
            </Row>
            <hr />
            <Col span={24}>
              <Button
                disabled={selectedProducts.length === 0}
                type="primary"
                style={{
                  width: "100%",
                  fontSize: "1.2rem",
                  height: "3rem",
                  backgroundColor: "#198754",
                }}
                onClick={handleCheckout}
              >
                Thanh Toán
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Cart;
