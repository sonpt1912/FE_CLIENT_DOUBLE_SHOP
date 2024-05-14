import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Table } from "antd";
import TimeLine from "./Timeline";
import BillAPI from "../../API/BillAPI";

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
  // const detailBillById = useSelector((state) => state.billData.billDetailById);
  const [billHistory, setBillHistory] = useState([]);
  // const loading = useSelector((state) => state.billData.loading);
  // const [updatedBillHistory, setUpdatedBillHistory] = useState(billHistory);
  const [isUpdated, setIsUpdated] = useState(true);

  const handleUpdate = () => {
    setIsUpdated(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await dispatch(
        //   getDetailBill({ id: selectedRowIdBill })
        // );
        setIsUpdated(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    const fetchDataId = async () => {
      try {
        // const response = await dispatch(getBillById({ id: selectedRowIdBill }));
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    const fetchDataHistory = async () => {
      try {
        const response = await BillAPI.Get_History_Bill({ id: selectedRowIdBill })
        setBillHistory(response)
        console.log("responseHistory", response);
        ;
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
    fetchDataId();
    fetchDataHistory();
    if (isUpdated) {
      fetchData();
      fetchDataId();
      fetchDataHistory();
      setIsUpdated(false);
    }
  }, [ selectedRowIdBill, isUpdated]);

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
        {/* <InformationBill order={detailBillById} updatedData={handleUpdate} /> */}
        {/* <ProductListHorizontal
          products={detailBill}
          detailBillById={detailBillById}
          billHistory={updatedBillHistory}
          setBillHistory={setUpdatedBillHistory}
          updatedData={handleUpdate}
        />
        <BillPayment order={detailBillById} /> */}
      </div>
    </Modal>
  );
};

export default ModalDetailBill;
