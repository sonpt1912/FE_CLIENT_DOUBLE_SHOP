import { Button, Card, Col, Modal, Row, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const InformationBill = ({ order, updatedData }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card hoverable style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
            }}
          >
            <div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Thông tin đơn hàng
              </h3>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={9}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <strong style={{ fontSize: "18px" }}>Khách Hàng:</strong>{" "}
                  <span style={{ fontSize: "18px" }}>
                    {order.customer?.name ? order.customer?.name : "Khách lẻ"}
                  </span>
                </li>
                {order.employee && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Nhân Viên:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>
                      {order.employee.username}
                    </span>
                  </li>
                )}

                <li>
                  <strong style={{ fontSize: "18px" }}>Trạng Thái:</strong>{" "}
                  <span style={{ fontSize: "18px" }}>
                    {order.status === 0
                      ? "Chờ xác nhận"
                      : order.status === 1
                      ? "Đã xác nhận"
                      : order.status === 2
                      ? "Chờ lấy hàng"
                      : order.status === 3
                      ? "Giao hàng"
                      : order.status === 4
                      ? "Hoàn thành"
                      : order.status === 5
                      ? "Đã hủy"
                      : order.status === 6
                      ? "Trả hàng"
                      : order.status === 7
                      ? "Chỉnh sửa"
                      : order.status === 8
                      ? "Hàng thất lạc"
                      : "Không xác định"}
                  </span>
                </li>
              </ul>
            </Col>
            <Col span={7}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {order.type !== null && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Loại:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>
                      {order.type === 0 ? "Bán tại quầy" : "Bán giao"}
                    </span>
                  </li>
                )}
                {order.note && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Ghi Chú:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>{order.note}</span>
                  </li>
                )}
              </ul>
            </Col>
            <Col span={8}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {order.phone && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Số Điện Thoại:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>{order.phone}</span>
                  </li>
                )}
                {order.address && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Địa Chỉ:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>{order.address}</span>
                  </li>
                )}
                {order.moneyShip && (
                  <li>
                    <strong style={{ fontSize: "18px" }}>Tiền Ship:</strong>{" "}
                    <span style={{ fontSize: "18px" }}>{order.moneyShip}</span>
                  </li>
                )}
              </ul>
            </Col>
          </Row>
        </Card>
      </Col>

      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            form="updateForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Lưu
          </Button>,
        ]}
      >
        <Form
          id="updateForm"
          layout="vertical"
          initialValues={{
            phone: order.phone,
            address: order.address,
            note: order.note,
            moneyShip: order.moneyShip,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item name="phone" label="Số điện thoại">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Địa chỉ">
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea placeholder="Nhập ghi chú" rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="moneyShip" label="Phí vận chuyển">
                <Input placeholder="Nhập phí vận chuyển" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
  );
};

export default InformationBill;
