import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Table } from "antd";
import TimeLine from "./Timeline";
import BillAPI from "../../API/BillAPI";
import InformationBill from "./InformationBill";
import ProductListHorizontal from "./ProductListHorizontal";
import BillPayment from "./BillPayment";

// import ProductListHorizontal from "./ProductListHorizontal";
// import InformationBill from "./InformationBill";
// import BillPayment from "./BillPayment";

const { TextArea } = Input;

const ModalDetailBill = ({
  open,
  closeModal,
  selectedRowIdBill,
  selectedStatus,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  // const detailBill = useSelector((state) => state.billData.billDetail);
  const [detailBill, setDetailBill] = useState([]);
  // const detailBillById = useSelector((state) => state.billData.billDetailById);
  const [detailBillById, setDetailBillById] = useState([]);
  const [billHistory, setBillHistory] = useState([]);
  // const loading = useSelector((state) => state.billData.loading);
  // const [updatedBillHistory, setUpdatedBillHistory] = useState(billHistory);
  const [isUpdated, setIsUpdated] = useState(true);

  const handleUpdate = () => {
    setIsUpdated(true);
  };

  useEffect(() => {
    if (selectedRowIdBill) {
      const fetchData = async () => {
        try {
          const response = await BillAPI.Get_Detail_Bill({
            id: selectedRowIdBill,
          });
          setDetailBill(response)
          setIsUpdated(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Error fetching data. Please try again later.");
        }
      };
      fetchData();
    }

    if (selectedRowIdBill) {
      const fetchDataId = async () => {
        try {
          const response = await BillAPI.Get_Bill_By_Id({
            id: selectedRowIdBill,
          });
          setDetailBillById(response);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Error fetching data. Please try again later.");
        }
      };
      fetchDataId();
    }
    if (selectedRowIdBill) {
      const fetchDataHistory = async () => {
        try {
          const response = await BillAPI.Get_History_Bill({
            id: selectedRowIdBill,
          });
          setBillHistory(response);
          console.log("responseHistory", response);
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Error fetching data. Please try again later.");
        }
      };
      fetchDataHistory();
    }
  }, [selectedRowIdBill, isUpdated]);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      closeModal();
      form.resetFields();
      // dispatch(getHistoryBill({ id: selectedRowIdBill })).then((response) => {
      //   setUpdatedBillHistory(response);
      // });
    } catch (error) {
      message.error("Failed to add size");
    } finally {
      closeModal();
      form.resetFields();
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <Modal
      title="Chi tiết Hóa Đơn"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1400}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TimeLine
          orderTimeLine={billHistory}
          selectedRowIdBill={selectedRowIdBill}
          selectedStatus={selectedStatus}
          updatedData={handleUpdate}
        />
        <InformationBill order={detailBillById} updatedData={handleUpdate} />
        <ProductListHorizontal
          products={detailBill}
          detailBillById={detailBillById}
        />
        <BillPayment order={detailBillById} />
      </div>
    </Modal>
  );
};

export default ModalDetailBill;
