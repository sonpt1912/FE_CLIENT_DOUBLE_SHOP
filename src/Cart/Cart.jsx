import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CartAPI from "../API/CartAPI";

const { Meta } = Card;

function Cart(props) {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isloadData, setLoadData] = useState(false);
  const [list_carts, set_list_carts] = useState([]);

  useEffect(() => {
    const fetchDataCarts = async () => {
      try {
        const reponse = await CartAPI.Get_Cart({});
        set_list_carts(reponse);
        setLoadData(false);
        console.log("Cart", reponse);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchDataCarts();
  }, [isloadData]);

  const handleQuantityChange = async (value, idProduct) => {
    try {
      const params = {
        id: idProduct,
        quantity: value,
      };
      const reponse = await CartAPI.Update_Quantity_Product(params);
      setLoadData(true);
      if (!reponse) {
        message.error("Cập nhật số lượng thất bại");
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
        total += product.price * product.quantity;
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

  const handleDelete = async (idProduct) => {
    try {
      const response = await CartAPI.Delete_Cart({ id: idProduct });
      if (response) {
        message.success("Xóa sản phẩm thành công");
        setLoadData(true);
      } else {
        message.error("Xóa thất bại! Vui lòng thử lại");
      }
    } catch (error) {
      console.log("Error deleting product", error);
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
                              src={product.listImages?.resources[0]?.url || ""}
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
                      <Col span={3}>
                        <h6 style={{ marginTop: "5px" }}>{product.price}đ</h6>
                      </Col>
                      {/* <Col span={3}><p>{totalPrices[index]}</p></Col> */}
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
                <h6>{calculateTotalPrice()} VNĐ</h6>
              </Col>
              <Col span={14}>
                <h6>Giảm giá :</h6>
              </Col>
              <Col span={10}>
                <h6>0 VNĐ</h6>
              </Col>
            </Row>
            <hr />
            <Col span={24}>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  height: "3rem",
                  backgroundColor: "#198754",
                }}
                onClick={() => window.location.replace("/checkout")}
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
