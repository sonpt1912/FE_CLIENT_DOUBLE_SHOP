import { Card, Col, Row, Button } from "antd";
import React from "react";

const BillPayment = ({ order }) => {  const totalAfterDiscount = order.totalAmount - order.discountAmount;
  const paymentValid = order.moneyPaid >= totalAfterDiscount;

  return (
    <Row justify="end" gutter={[16, 16]}>
      <Col span={24}>
        <Card hoverable style={{ width: "100%" }}>
          <div style={{ textAlign: "right" }}>
            {order.totalAmount !== null && (
              <div>
                <strong>Tiền Hàng:</strong> {order.totalAmount}
              </div>
            )}
            {order.discountAmount !== null && (
              <div>
                <strong>Tiền giảm :</strong> {order.discountAmount}
              </div>
            )}
           
            {order.payment !== null && (
              <div>
                <strong>Phương thức thanh toán :</strong>{" "}
                {order.payment === 0 ? "Tiền mặt" : "Chuyển khoản"}
              </div>
            )}
            {order.moneyShip && (
              <div>
                <strong>Tiền vận chuyển :</strong> {order.moneyShip}
              </div>
            )}
            {paymentValid && (
              <Button type="primary" style={{ marginTop: "16px" }}>
                Thanh toán
              </Button>
            )}
             {order.totalAmount !== null && (
              <div>
                <strong>Tổng tiền:</strong> {totalAfterDiscount}
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default BillPayment;
