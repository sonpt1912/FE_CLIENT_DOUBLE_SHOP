import React, { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import QRCode from "qrcode.react";
import CartAPI from "../API/CartAPI";

const Payment = ({ visible, onCancel, total, onPayment }) => {
  const [customerPaid, setCustomerPaid] = useState(0);
  const [description, setDescription] = useState("description");
  const [hasCalledApi, setHasCalledApi] = useState(false);
  const [prevTotal, setPrevTotal] = useState(total);
  const [qrCode, setQrCode] = useState("");
  const [paymentLinkData, SetPaymentLinkData] = useState([]);

  function generateOrderCode() {
    const characters = "0123456789";
    let orderCode = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderCode += characters[randomIndex];
    }

    return orderCode;
  }
  const getQRCodeImage = (qrCodeValue) => {
    if (!qrCodeValue) return null;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <QRCode
          value={qrCodeValue}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="L"
          includeMargin={false}
          renderAs="svg"
          width={"80%"}
        />
      </div>
    );
  };
  useEffect(() => {
    const createBill = async () => {
      if (total !== prevTotal || !hasCalledApi) {
        const payload = {
          orderCode: generateOrderCode(),
          amount: total,
          description: "VQRIO123",
          cancelUrl: "https://your-cancel-url.com",
          returnUrl: "https://your-success-url.com",
        };
        try {
          const reponse = await CartAPI.Create_Payment_Link(payload);
          SetPaymentLinkData(reponse.data);
          setHasCalledApi(true);
        } catch (error) {
          console.error("Error creating payment link:", error);
        }
      } else {
        setHasCalledApi(false);
      }
      setPrevTotal(total);
    };
    createBill();
  }, [total, prevTotal]);

  useEffect(() => {
    setDescription(paymentLinkData?.description);
    setQrCode(paymentLinkData?.qrCode);
  }, [paymentLinkData]);

  const handlePayment = async () => {
    const payload = {
      orderCode: paymentLinkData.orderCode,
    };
    const reponse = await CartAPI.Check_Payment_Link(payload);
    if (reponse.data.status === "PENDING") {
      message.error("Vui lòng kiểm tra lại trạng thái thanh toán");
    } else if (reponse.data.status === "PAID") {
      const change = customerPaid - total;
      onPayment({
        customerPaid: customerPaid,
        changeAmount: change,
      });
      setCustomerPaid(0);
      onCancel();
    } else {
      message.error("Vui lòng kiểm tra lại trạng thái thanh toán");
    }
  };

  return (
    <Modal
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      top: "10rem",
      margin: "auto",
    }}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setCustomerPaid(0);
            onCancel();
          }}
        >
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handlePayment}>
          Đã thanh toán
        </Button>,
      ]}
    >
      <>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Tổng tiền cần thanh toán: {total} VND
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            ></div>
            <div style={{ marginBottom: "10px" }}>
              <span>Chủ Tài Khoản:</span> <br />
              <b>PHAM THANH SON</b>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span>Số Tài Khoản:</span> <br /> <b>1556919122003</b>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span>Số tiền:</span> <br /> <b>{total} VND</b>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span>Nội dung:</span> <br />
              <b>{description}</b>
            </div>
          </div>
          <di>{getQRCodeImage(qrCode)}</di>
        </div>
      </>
    </Modal>
  );
};

export default Payment;
