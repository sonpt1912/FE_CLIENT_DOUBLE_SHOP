import {
  Button,
  Card,
  Checkbox,
  Col,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Switch,
  message,
} from "antd";
import "./Checkout.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CartAPI from "../API/CartAPI";
import Payment from "./Payment";

Checkout.propTypes = {};
const { Meta } = Card;

function Checkout(props) {
  const location = useLocation();
  const selectedProducts = location.state;
  console.log("Checkout", selectedProducts);
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherModal, setVoucherModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [totalShippingFee, setTotalShippingFee] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    setTotalPayment(totalPrice + totalShippingFee);
  }, [totalPrice, totalShippingFee]);

  useEffect(() => {
    const handleShipping = async () => {
      const payload = {
        toDistrictId: 202,
        toWardCode: 510113,
        height: 2,
        length: 1,
        weight: 3,
        width: 2,
        insurance_value: 0,
        coupon: null,
        items: [
          {
            name: "TEST1",
            quantity: 1,
            height: 202,
            weight: 1002,
            length: 202,
            width: 202,
          },
        ],
      };
      try {
        const response = await CartAPI.Get_Shipping_Fee(payload);
        setTotalShippingFee(response.data.total);
      } catch (error) {
        console.log("Error", error);
      }
    };

    handleShipping();
  }, [totalShippingFee]);

  useEffect(() => {
    let sum = 0;
    selectedProducts?.forEach((product) => {
      sum += product.price * product.quantity;
    });
    setTotalPrice(sum);
  }, [selectedProducts, totalPrice]);

  const handleClosePaymentModal = () => {
    setVisiblePaymentModal(false);
  };

  const handleVoucherCodeChange = (e) => {
    setVoucherCode(e.target.value);
  };

  const openVoucherModal = async () => {
    setVoucherModal(true);
    try {
      const reponse = await CartAPI.Get_Voucher();
      console.log("1 vocher", reponse);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const closeVoucherModal = () => {
    setVoucherModal(false);
  };

  const handlePaymentMethodChange = (checked) => {
    setPaymentMethod(checked);
  };

  const Create_Bill = async (value, idProduct) => {
    try {
      const listCart = selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
      const params = {
        idVoucher: "",
        totalAmout: totalPrice,
        discoutAmout: "",
        address: "",
        payment: "",
        note: "",
        receiver: "",
        listCart: listCart,
      };
      const reponse = await CartAPI.Create_Bill(params);
      if (!reponse) {
        message.error("Cập nhật số lượng thất bại");
      } else {
        message.success("Đặt hàng thành công");
      }
    } catch (error) {
      message.error("Cập nhật số lượng thất bại");
    }
  };
  return (
    <>
      <div className="container_payment">
        <div class="address_container">
          <div class="top_line_address"></div>
          <div class="content_address">
            <div class="title_address">
              <div class="text_title_address">
                <div class="icon_address">
                  <svg
                    height="16"
                    viewBox="0 0 12 16"
                    width="12"
                    class="shopee-svg-icon icon-location-marker"
                  >
                    <path
                      d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h2>Địa chỉ nhận hàng</h2>
              </div>
            </div>
            <div class="address_detail">
              <div>
                <div class="y0jyrJ">
                  <div class="name_customer">Bùi Công Tuấn (+84) 354178673</div>
                  <div class="address_customer">
                    Tầng 7, tòa nhà Golden Park, số 2 Phạm Văn Bạch, Yên Hòa,
                    Cầu Giấy, Hà Nội., Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
                  </div>
                  <div class="checked_address">Mặc định</div>
                </div>
              </div>
              <button class="change_address">Thay đổi</button>
            </div>
            <div></div>
          </div>
        </div>
        <div className="cart_customer">
          <Card
            style={{
              width: "100%",
              background: "#ebebeb",
              border: " 1px solid #d9d9d9",
            }}
          >
            <h2 class="card-title">Giỏ hàng của bạn</h2>
            <Row gutter={[16, 16]}>
              {selectedProducts?.map((product, index) => (
                <Col span={24} key={index}>
                  <Card hoverable style={{ width: "100%" }}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col span={2}>
                        {/* <Checkbox
                          checked={selectedProducts.some(
                            (p) => p.id === product.id
                          )}
                          onChange={(e) =>
                            handleProductSelect(product, e.target.checked)
                          }
                        /> */}
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
                                        alt={`Image ${index + 1}`}
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
                              alt={`Image 1`}
                              preview={false}
                            />
                          </Popover>
                        </Col>
                      </Col>
                      <Col span={7}>
                        <Meta
                          title={product.product.name}
                          description={`Size: ${product.size.name} - Color: ${product.color.name}`}
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber value={product.quantity} />
                      </Col>
                      <Col span={3}>
                        <h6 style={{ marginTop: "5px" }}>
                          {product.price.toLocaleString("en-US")}đ
                        </h6>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
            <div class="vhebLm"></div>{" "}
            <div class="IyTouc">
              <div class="TSU9pp">
                <h3 class="o13Lc4 hERTPn ZAZB4U">
                  <div>Tổng số tiền (1 Sản Phẩm):</div>
                </h3>
                <div class="total_card">
                  {totalPrice.toLocaleString("en-US")} VNĐ
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div class="N02iLl">
          <div class="aSiS8B">
            <div class="IN_fAG">
              <div class="UPSKhT wp5W5e">Phương thức thanh toán</div>
            </div>
          </div>
          <div class="vhebLm"></div>{" "}
          <div class="yHG0SE" aria-live="polite">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div>
                <Switch
                  checked={paymentMethod}
                  onChange={handlePaymentMethodChange}
                />
              </div>
              {paymentMethod ? (
                <span style={{ marginLeft: "1rem" }}>
                  Thanh toán trực tuyến
                </span>
              ) : (
                <span style={{ marginLeft: "1rem" }}>
                  Thanh toán khi nhận hàng
                </span>
              )}
            </div>

            <h3 class="o13Lc4 hERTPn cFXdGN">Tổng tiền hàng</h3>
            <div class="o13Lc4 X9R_0O cFXdGN">
              {" "}
              {totalPrice.toLocaleString("en-US")} VNĐ
            </div>

            <h3 class="o13Lc4 hERTPn fwPZIN">Phí vận chuyển</h3>
            <div class="o13Lc4 X9R_0O fwPZIN">
              {totalShippingFee.toLocaleString("en-US")} VNĐ
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Input
                placeholder="Nhập mã voucher"
                value={voucherCode}
                onChange={handleVoucherCodeChange}
                style={{ marginRight: "1rem", width: "30%" }}
              />
              <Button type="primary" onClick={openVoucherModal}>
                Chọn Voucher
              </Button>
              <Modal
                title="Chọn Voucher"
                visible={voucherModal}
                onCancel={closeVoucherModal}
                footer={[
                  <Button key="back" onClick={closeVoucherModal}>
                    Hủy
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={closeVoucherModal}
                  >
                    Xác nhận
                  </Button>,
                ]}
              ></Modal>
            </div>
            <h3 class="o13Lc4 hERTPn cNgneA">Tổng thanh toán</h3>
            <div class="o13Lc4 fYeyE4 X9R_0O cNgneA">
              {totalPayment.toLocaleString("en-US")} VNĐ
            </div>
            <div class="s7CqeD">
              <div class="sQArKu">
                <div class="xINqui">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo điều
                  khoản của cửa hàng
                </div>
              </div>
              <button
                class="stardust-button stardust-button--primary stardust-button--large LtH6tW"
                onClick={() => {
                  if (paymentMethod) {
                    setVisiblePaymentModal(true);
                  } else {
                    Create_Bill();
                  }
                }}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <Payment
        visible={visiblePaymentModal}
        onCancel={handleClosePaymentModal}
        total={totalPrice}
        onPayment={Create_Bill}
      />
    </>
  );
}

export default Checkout;
