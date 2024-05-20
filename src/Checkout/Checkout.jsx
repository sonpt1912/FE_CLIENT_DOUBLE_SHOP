import {
  Button,
  Card,
  Checkbox,
  Col,
  Image,
  Input,
  InputNumber,
  Modal,
  Popover,
  Row,
  Select,
  Spin,
  Switch,
  Table,
  message,
} from "antd";
import "./Checkout.css";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import CartAPI from "../API/CartAPI";
import Payment from "./Payment";
import BillAPI from "../API/BillAPI";
import User from "../API/User";
import axios from "axios";

Checkout.propTypes = {};
const { Meta } = Card;
const { Option } = Select;

function Checkout(props) {
  const location = useLocation();
  const selectedProducts = location.state;
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherModal, setVoucherModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [visiblePaymentModal, setVisiblePaymentModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [totalVoucher, setTotalVoucher] = useState(0);
  const [totalShippingFee, setTotalShippingFee] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const [customerInfo, setCustomerInfo] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [addressCustom, setAddressCustom] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [selectedModalAddress, setSelectedModalAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recorqdSelect, setRecorqdSelect] = useState();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const token = localStorage.getItem("token");
  const [showAddressModal, setShowAddressModal] = useState(!!token);
  const [showAddressNewModal, setShowAddressNewModal] = useState(!token);

  useEffect(() => {}, [addressCustom, loadingAddress]);
  useEffect(() => {
    const calculateTotals = () => {
      const totals = selectedProducts.reduce(
        (acc, product) => {
          const { length, height, width, weight } = product.product;
          acc.totalLength += length * product.quantity;
          acc.totalHeight += height * product.quantity;
          acc.totalWidth += width * product.quantity;
          acc.totalWeight += weight * product.quantity;
          return acc;
        },
        {
          totalLength: 0,
          totalHeight: 0,
          totalWidth: 0,
          totalWeight: 0,
        }
      );

      setTotalLength(totals.totalLength);
      setTotalHeight(totals.totalHeight);
      setTotalWidth(totals.totalWidth);
      setTotalWeight(totals.totalWeight);
    };

    calculateTotals();
  }, [selectedProducts]);

  const fetchProvinces = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            Token: "81e2108c-e9c6-11ee-b1d4-92b443b7a897",
          },
        }
      );
      setProvinces(response.data.data);
      // setSelectedDistrict(response.data.data.DistrictID);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDistricts = async (province) => {
    if (province) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province}`,
          {
            headers: {
              Token: "81e2108c-e9c6-11ee-b1d4-92b443b7a897",
            },
          }
        );
        setDistricts(response.data.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const fetchWards = async (districtId) => {
    if (districtId) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
          {
            headers: {
              Token: "81e2108c-e9c6-11ee-b1d4-92b443b7a897",
            },
          }
        );
        setWards(response.data.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    Promise.all([]);
  }, [selectedDistrict]);

  const addressFull = useMemo(() => {
    if (!recorqdSelect) return;
    const province = provinces.find(
      (p) => p.ProvinceID === parseInt(recorqdSelect.city, 10)
    );
    const provinceName = province ? province.ProvinceName : "";
    const districtId = parseInt(recorqdSelect.district, 10);

    const district = districts.find((p) => p.DistrictID === districtId);
    const districtName = district ? district.DistrictName : "";

    const ward = wards.find((p) => p.WardCode === recorqdSelect.province);
    const wardName = ward ? ward.WardName : "";

    return `${recorqdSelect.description}, ${wardName}, ${districtName}, ${provinceName}`;
  }, [wards, districts, provinces, recorqdSelect]);

  const handleShowAddressModal = () => {
    if (token) {
      setSelectedModalAddress(null);
      setShowAddressModal(true);
      setShowAddressNewModal(false);
    } else {
      setShowAddressModal(false);
      setShowAddressNewModal(true);
    }
  };
  const fetchAllAddresses = async () => {
    setLoadingAddress(true);
    try {
      const addressResponse = await BillAPI.Get_Address_Bill();
      const addressesWithSelection = addressResponse.map((address, index) => ({
        ...address,
        isSelected: address.defaul === 0,
      }));
      setSelectedAddress(addressesWithSelection);
      selectDefaultAddress(addressesWithSelection);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  useEffect(() => {
    fetchAllAddresses();
  }, []);

  const selectDefaultAddress = async (addressList) => {
    setLoadingAddress(true);

    const address =
      selectedModalAddress ||
      addressList.find((address) => address.defaul === 0);
    if (!address) return;
    await fetchProvinces();
    await fetchDistricts(address.city);
    await fetchWards(address.district);
    const districtId = parseInt(address.district, 10);
    setSelectedDistrict(districtId);
    setSelectedWard(address.province)

    const province = provinces.find(
      (p) => p.ProvinceID === parseInt(address.city, 10)
    );
    const provinceName = province ? province.ProvinceName : "";

    const district = districts.find((p) => p.DistrictID === districtId);
    const districtName = district ? district.DistrictName : "";

    const ward = wards.find((p) => p.WardCode === address.province);
    const wardName = ward ? ward.WardName : "";

    const addressFull = `${address.description}, ${wardName}, ${districtName}, ${provinceName}`;
    setAddressCustom(addressFull);
    setLoadingAddress(false);
  };

  useEffect(() => {
    fetchProvinces();
    fetchDistricts(selectedProvince);
    fetchWards(selectedDistrict);
  }, [addressCustom]);

  const handleSelectAddress = (record) => {
    console.log("recoer", record);
    setRecorqdSelect(record);
    const updatedAddresses = selectedAddress.map((address) => ({
      ...address,
      isSelected: address === record,
    }));
    setSelectedAddress(updatedAddresses);
    setSelectedModalAddress(record);
  };

  useEffect(() => {
    const defaultAddress = selectedAddress.find(
      (address) => address.defaul === 0
    );
    if (defaultAddress) {
      handleSelectAddress(defaultAddress);
    }
  }, []);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
    fetchDistricts(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard(null);
    setWards([]);
    fetchWards(value);
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };

  useEffect(() => {
    setTotalPayment(totalPrice + totalShippingFee);
    setQuantity(selectedProducts.length);
  }, [selectedProducts.length, totalPrice, totalShippingFee]);

  useEffect(() => {
    const handleShipping = async () => {
      const payload = {
        toDistrictId: selectedDistrict,
        toWardCode: selectedWard,
        height: totalHeight,
        length: totalLength,
        weight: totalWeight,
        width: totalWidth,
        insurance_value: 0,
        coupon: null,
        items: [
          {
            name: "TEST1",
            quantity: 1,
            height: 1,
            weight: 1,
            length: 1,
            width: 1,
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
  }, [totalShippingFee, showAddressModal]);

  useEffect(() => {
    let sum = 0;
    selectedProducts?.forEach((product) => {
      const discountedPrice = product.price - product.discountAmount;
      sum += discountedPrice * product.quantity;
    });
    setTotalPrice(sum);
  }, [selectedProducts]);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await User.Get_User();
        setCustomerInfo(response);
      } catch (error) {
        console.log("Fetching user information", error);
      }
    };
    fetchDataUser();
  }, []);

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
    setPaymentMethod(checked ? 1 : 0);
  };

  const Create_Bill = async (value, idProduct) => {
    try {
      const listCart = selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        discountAmout: product.discountAmount,
      }));
      const params = {
        idVoucher: "",
        totalAmout: totalPrice,
        discoutAmout: "",
        address: addressCustom,
        payment: paymentMethod,
        note: "",
        phone: customerInfo.phone,
        receiver: customerInfo.name,
        listCart: listCart,
      };
      const listDetailProduct = selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        discountAmout: product.discountAmount,
        price: product.price - product.discountAmount,
      }));
      const params_public = {
        idVoucher: "",
        totalAmout: totalPrice,
        discoutAmout: "",
        address: addressCustom,
        payment: paymentMethod,
        note: "",
        phone: customerInfo.phone,
        receiver: customerInfo.name,
        listDetailProduct: listDetailProduct,
      };
      if (token) {
        const reponse = await CartAPI.Create_Bill(params);
        if (!reponse) {
          message.error("Thanh toán thất bại!");
        } else {
          message.success("Đặt hàng thành công");
          localStorage.setItem(
            "edit_status_checkout",
            JSON.stringify("lich_su")
          );
          window.location.href = "/profile";
        }
      } else {
        const reponse = await CartAPI.Create_Bill_Public(params_public);
        if (!reponse) {
          message.error("Thanh toán thất bại!");
        } else {
          message.success("Đặt hàng thành công");

          window.location.href = "/";
        }
      }
    } catch (error) {
      message.error("Thanh toán thất bại!");
    }
  };

  const columns = [
    {
      title: "Địa chỉ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
      key: "district",
    },

    {
      title: "Phường/Xã",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Chọn",
      key: "action",
      render: (text, record) => (
        <Button
          className={record.isSelected ? "selected-button" : ""}
          onClick={() => handleSelectAddress(record)}
          disabled={loadingAddress}
          style={{ width: "7rem" }}
        >
          {record.isSelected ? "Đã chọn" : "Chọn"}
        </Button>
      ),
    },
  ];

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
                  <div class="name_customer">
                    {customerInfo.name} <br /> {customerInfo.phone}
                  </div>
                  <div class="address_customer">
                    {isLoading ? <Spin /> : addressFull}
                  </div>
                </div>
              </div>
              <button
                className="change_address"
                onClick={handleShowAddressModal}
              >
                Thay đổi
              </button>{" "}
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
                        <InputNumber value={product.quantity} disabled />
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
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
            <div class="vhebLm"></div>{" "}
            <div class="IyTouc">
              <div class="TSU9pp">
                <h3 class="o13Lc4 hERTPn ZAZB4U">
                  <div>Tổng số tiền ({quantity} Sản Phẩm):</div>
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
                      onChange={(checked) => handlePaymentMethodChange(checked)}
                    />
                  </div>
                  {paymentMethod === 1 ? (
                    <span style={{ marginLeft: "1rem" }}>
                      Thanh toán trực tuyến
                    </span>
                  ) : (
                    <span style={{ marginLeft: "1rem" }}>
                      Thanh toán khi nhận hàng
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 class="o13Lc4 hERTPn cFXdGN">Tổng tiền hàng </h3>
              <h3 class="o13Lc4 hERTPn cFXdGN">Giảm giá Voucher </h3>
            </div>
            <div>
              <div class="o13Lc4 X9R_0O cFXdGN">
                {" "}
                {totalPrice.toLocaleString("en-US")} VNĐ
              </div>{" "}
              <div class="o13Lc4 X9R_0O cFXdGN">
                {" "}
                {totalVoucher.toLocaleString("en-US")} VNĐ
              </div>
            </div>

            <h3 class="o13Lc4 hERTPn fwPZIN">Phí vận chuyển</h3>
            <div class="o13Lc4 X9R_0O fwPZIN">
              {totalShippingFee.toLocaleString("en-US")} VNĐ
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  >
                    Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                    điều khoản của cửa hàng
                  </Checkbox>
                </div>
              </div>
              <button
                className="stardust-button stardust-button--primary stardust-button--large LtH6tW"
                onClick={() => {
                  if (paymentMethod && agreeTerms) {
                    setVisiblePaymentModal(true);
                  } else if (!agreeTerms) {
                    message.error(
                      "Vui lòng đồng ý với điều khoản của cửa hàng"
                    );
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
        total={totalPayment}
        onPayment={Create_Bill}
      />
      <Modal
        title="Danh sách địa chỉ"
        open={showAddressModal}
        onCancel={() => setShowAddressModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddressModal(false)}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            disabled={loadingAddress}
            loading={loadingAddress}
            onClick={() => {
              selectDefaultAddress(selectedAddress);
              setShowAddressModal(false);
            }}
          >
            Xác nhận
          </Button>,
        ]}
        width={650}
      >
        <Table key="id" columns={columns} dataSource={selectedAddress} />
      </Modal>
      <Modal
        title="Nhập địa chỉ"
        open={showAddressNewModal}
        onCancel={() => setShowAddressNewModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddressNewModal(false)}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => {
              const selectedProvinceName = provinces.find(
                (p) => p.ProvinceID === selectedProvince
              )?.ProvinceName;
              const selectedDistrictName = districts.find(
                (d) => d.DistrictID === selectedDistrict
              )?.DistrictName;
              const selectedWardName = wards.find(
                (w) => w.WardCode === selectedWard
              )?.WardName;

              const newAddress = {
                receiver: customerInfo.name,
                phone: customerInfo.phone,
                city: selectedProvince,
                district: selectedDistrict,
                province: selectedWard,
                description: recorqdSelect.description,
                isSelected: true,
              };

              const fullAddress = `${newAddress.description}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;
              setShowAddressNewModal(false);
              setRecorqdSelect(newAddress);
              setAddressCustom(fullAddress);
            }}
          >
            Xác nhận
          </Button>,
        ]}
        width={650}
      >
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <Input
              placeholder="Họ và tên"
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  name: e.target.value,
                })
              }
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Số điện thoại"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  phone: e.target.value,
                })
              }
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Input
              placeholder="Mô tả địa chỉ"
              value={recorqdSelect ? recorqdSelect.description : ""}
              onChange={(e) => {
                const newAddress = {
                  ...recorqdSelect,
                  description: e.target.value,
                };
                setRecorqdSelect(newAddress);
              }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={8}>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Chọn tỉnh/thành phố"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleProvinceChange}
            >
              {provinces.map((province) => (
                <Option key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Chọn quận/huyện"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleDistrictChange}
              value={selectedDistrict}
            >
              {districts.map((district) => (
                <Option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Chọn phường/xã"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleWardChange}
              value={selectedWard}
            >
              {wards.map((ward) => (
                <Option key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default Checkout;
