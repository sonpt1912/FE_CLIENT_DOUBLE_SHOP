import {
  Card,
  Checkbox,
  Col,
  Image,
  InputNumber,
  Popconfirm,
  Popover,
  Row,
  Space,
} from "antd";
import "./Checkout.css";
import { useState } from "react";

Checkout.propTypes = {};
const { Meta } = Card;

function Checkout(props) {
  const [list_carts, set_list_carts] = useState([]);

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
              {list_carts.map((product, index) => (
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
                        <h6 style={{ marginTop: "5px" }}>{product.price}đ</h6>
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
                  <div>Tổng số tiền (1 sản phẩm):</div>
                </h3>
                <div class="total_card">₫135.500</div>
              </div>
            </div>
          </Card>
        </div>
        <div class="N02iLl">
          <div class="aSiS8B">
            <div class="IN_fAG">
              <div class="UPSKhT wp5W5e">Phương thức thanh toán</div>
              <div class="LhNuge">Thanh toán khi nhận hàng</div>
              <button class="btn_change_payment_by">Thay đổi</button>
            </div>
          </div>
          <div class="vhebLm"></div>{" "}
          <div class="yHG0SE" aria-live="polite">
            <h3 class="o13Lc4 hERTPn cFXdGN">Tổng tiền hàng</h3>
            <div class="o13Lc4 X9R_0O cFXdGN">₫119.000</div>
            <h3 class="o13Lc4 hERTPn fwPZIN">Phí vận chuyển</h3>
            <div class="o13Lc4 X9R_0O fwPZIN">₫16.500</div>
            <h3 class="o13Lc4 hERTPn cNgneA">Tổng thanh toán</h3>
            <div class="o13Lc4 fYeyE4 X9R_0O cNgneA">₫135.500</div>
            <div class="s7CqeD">
              <div class="sQArKu">
                <div class="xINqui">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo điều khoản của cửa hàng
                </div>
              </div>
              <button class="stardust-button stardust-button--primary stardust-button--large LtH6tW">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
