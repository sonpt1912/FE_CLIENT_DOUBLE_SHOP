import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import BillAPI from "../../API/BillAPI";
import "./Bill.css";
import ModalDetailBill from "./ModalDetailBill";

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("0");
  const [pagination, setPagination] = useState(0);
  const [modalBillVisible, setModalBillVisible] = useState(false);
  const [activeButton, setActiveButton] = useState("0");
  const [selectedRowIdBill, setSelectedRowIdBill] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusFilter = async (value) => {
    setStatusFilter(value);
    setActiveButton(value);

    try {
      const response = await BillAPI.Get_Bill_All({
        page: current - 1,
        pageSize: pageSize,
        status: value,
      });
      console.log("Response", response);
      if (response && response.listData.length > 0) {
        console.log(2);
        setBills(response.listData);
      } else {
        console.log(1);
        setBills([]);
      }
      //   if (response && response.error) {
      //     if (response.error.message === "Request failed with status code 403") {
      //       navigate("/login");
      //       message.error(response.error.message);
      //     }
      //   }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Error fetching data. Please try again later.");
    }
  };

  const openModal = (recordId, status) => {
    setSelectedRowIdBill(recordId);
    setSelectedStatus(status);
    setModalBillVisible(true);
  };
  const closeModal = () => {
    setModalBillVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BillAPI.Get_Bill_All({
          page: current - 1,
          pageSize: pageSize,
          status: statusFilter,
        });
        if (response && response.listData.length > 0) {
          setBills(response.listData);
          setPagination(response.totalPages);
        } else {
          setBills([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [current, pageSize, statusFilter, modalBillVisible]);
  const getTitle = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 4 }}>
        {" "}
        <Button
          className={`statusButton ${activeButton === "0" ? "active" : ""}`}
          onClick={() => handleStatusFilter("0")}
        >
          Chờ xác nhận
        </Button>
        <Button
          className={`statusButton ${activeButton === "1" ? "active" : ""}`}
          onClick={() => handleStatusFilter("1")}
        >
          Xác Nhận
        </Button>
        <Button
          className={`statusButton ${activeButton === "2" ? "active" : ""}`}
          onClick={() => handleStatusFilter("2")}
        >
          Chờ lấy hàng
        </Button>
        <Button
          className={`statusButton ${activeButton === "3" ? "active" : ""}`}
          onClick={() => handleStatusFilter("3")}
        >
          Giao Hàng
        </Button>
        <Button
          className={`statusButton ${activeButton === "4" ? "active" : ""}`}
          onClick={() => handleStatusFilter("4")}
        >
          Hoàn Thành
        </Button>
        <Button
          className={`statusButton ${activeButton === "5" ? "active" : ""}`}
          onClick={() => handleStatusFilter("5")}
        >
          Đã Hủy
        </Button>
        <Button
          className={`statusButton ${activeButton === "6" ? "active" : ""}`}
          onClick={() => handleStatusFilter("6")}
        >
          Trả Hàng
        </Button>
        <Button
          className={`statusButton ${activeButton === "8" ? "active" : ""}`}
          onClick={() => handleStatusFilter("8")}
        >
          Hàng Thất Lạc
        </Button>
      </div>
    </div>
  );
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 75,
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.index - b.index,
    },
    {
      title: "Mã Hóa Đơn",
      dataIndex: "code",
      key: "code",
      width: 200,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdTime",
      key: "createdTime",
      width: 200,
    },
    {
      title: "Loại đơn",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusText =
          status === 0
            ? "Chờ xác nhận"
            : status === 1
            ? "Đã xác nhận"
            : status === 2
            ? "Chờ lấy hàng"
            : status === 3
            ? "Giao hàng"
            : status === 4
            ? "Hoàn thành"
            : status === 5
            ? "Đã hủy"
            : status === 6
            ? "Trả hàng"
            : status === 7
            ? "Chỉnh sửa"
            : status === 8
            ? "Hàng thất lạc"
            : status;

        return <span>{statusText}</span>;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Button
          type="default"
          shape="round"
          onClick={() => openModal(record.id, record.status)}
        >
          Chi Tiết
        </Button>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setActiveButton(statusFilter);
    setCurrent(current);
  };

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={bills}
        pagination={{
          pageSize: pageSize,
          total: pagination,
          current: current,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (totalPages) => `Total ${totalPages} items`,
        }}
        // scroll={{
        //   x: 1000,
        //   y: 300,
        // }}
        loading={loading}
        title={getTitle}
        onChange={handleTableChange}
      />
      <ModalDetailBill
        open={modalBillVisible}
        closeModal={closeModal}
        selectedRowIdBill={selectedRowIdBill}
        selectedStatus={selectedStatus}
      />
    </>
  );
};

export default Bill;
