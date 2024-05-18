import TimelineEvent from "@mailtop/horizontal-timeline/dist/TimelineEvent";
import { FaRegFileAlt, FaBan, FaTruck } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { IoCloudDoneSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { MdPaid } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import dayjs from "dayjs";
import { Button, Card, Col, Form, Input, Modal, Row, message } from "antd";
import "./Bill.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HistoryModal from "./HistoryModal";
import BillAPI from "../../API/BillAPI";
const { Timeline } = require("@mailtop/horizontal-timeline");

const TimeLine = (props) => {
  const dispatch = useDispatch();
  const { orderTimeLine, selectedRowIdBill, selectedStatus, updatedData } =
    props;
  const [isModalVisibleCancel, setIsModalVisibleCancel] = useState(false);

  const [descriptionCancel, setDescriptionCancel] = useState("");
  const [disableCancelButton, setDisableCancelButton] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(selectedStatus);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [billType, setBillType] = useState(0);

  useEffect(() => {
    if (orderTimeLine.length > 0) {
      const lastType = orderTimeLine[orderTimeLine.length - 1]?.bill?.type;
      setBillType(lastType || 0);
    }
  }, [orderTimeLine]);

  const showHistoryModal = () => {
    setHistoryModalVisible(true);
  };

  const closeHistoryModal = () => {
    setHistoryModalVisible(false);
  };

  const filteredTimeLine = orderTimeLine.filter(
    (item) => item.status !== null && item.status !== 10
  );

  useEffect(() => {
    if (filteredTimeLine.length > 0) {
      const lastStatus = filteredTimeLine[filteredTimeLine.length - 1].status;
      if (
        lastStatus !== 0 &&
        lastStatus !== 1 &&
        lastStatus !== 2 &&
        lastStatus !== 3
      ) {
        setDisableCancelButton(true);
      } else {
        setDisableCancelButton(false);
      }
    }
  }, [filteredTimeLine]);

  const showModalCancel = () => {
    setIsModalVisibleCancel(true);
  };

  const handleOkCancel = () => {
    if (descriptionCancel.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (descriptionCancel.trim().length < 20) {
      message.error("Mô tả phải có ít nhất 20 ký tự!");
      return;
    }

    const data = {
      id: selectedRowIdBill,
      status: 5,
      description: descriptionCancel,
    };
    try {
      const response = BillAPI.Update_Bill(data);
      if (response) {
        setIsModalVisibleCancel(false);
        BillAPI.Get_History_Bill({ id: selectedRowIdBill });
        setUpdatedStatus(5);
        message.success("Hủy đơn thành công!")
        updatedData();
        form.resetFields();
      }else{
        message.error("Hủy đơn thất bại!")
      }
    } catch (error) {
      console.error("Vui lòng không để trống và nhập đúng định dạng", error);
    }
  };
  const handleCancelCancel = () => {
    setIsModalVisibleCancel(false);
    setDescriptionCancel("");
  };

  const onChangeDescriptionCancel = (e) => {
    setDescriptionCancel(e.target.value);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card hoverable style={{ width: "100%" }}>
          <Timeline style={{}}>
            {filteredTimeLine.map((item, index) => {
              let color;
              let icon;
              let title;

              switch (item.status) {
                case 0:
                  color = "#00CC00";
                  icon = FaRegFileAlt;
                  title = "Chờ Xác Nhận";
                  break;
                case 1:
                  color = "#00CC00";
                  icon = GiConfirmed;
                  title = "Xác Nhận";
                  break;
                case 2:
                  color = "#00CC00";
                  icon = FaTruck;
                  title = "Chờ lấy hàng";
                  break;
                case 3:
                  color = "#00CC00";
                  icon = AiOutlineDeliveredProcedure;
                  title = "Giao Hàng";
                  break;
                case 4:
                  color = "#FFC733";
                  icon = MdPaid;
                  title = "Hoàn Thành";
                  break;
                case 5:
                  color = "#FF5733";
                  icon = FaRegFileAlt;
                  title = "Đã Hủy";
                  break;
                case 6:
                  color = "#FF5733";
                  icon = IoCloudDoneSharp;
                  title = "Trả hàng";
                  break;
                case 7:
                  color = "#FFD700";
                  icon = AiFillEdit;
                  title = "Chỉnh sửa";
                  break;
                case 8:
                  color = "#FF5733";
                  icon = FaBan;
                  title = "Thất lạc";
                  break;
                case 11:
                  color = "#FF9933";
                  icon = IoCloudDoneSharp;
                  break;
                case 12:
                  color = "#FF9933";
                  icon = IoCloudDoneSharp;
                  break;
                default:
                  color = "#000000";
                  icon = FaRegFileAlt;
                  break;
              }

              return (
                <TimelineEvent
                  key={index}
                  color={color}
                  icon={icon}
                  title={title}
                  subtitle={dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                />
              );
            })}
          </Timeline>{" "}
          <div className="button-row">
            <div className="button-group">
              <Button
                className="cancel-button"
                type="primary"
                danger
                disabled={
                  disableCancelButton ||
                  updatedStatus === 5 ||
                  updatedStatus === 4
                }
                onClick={showModalCancel}
              >
                Hủy đơn
              </Button>
            </div>
            <div>
              {" "}
              <Button
                className="print-button"
                type="primary"
                ghost
                onClick={showHistoryModal}
              >
                Lịch sử
              </Button>
            </div>
          </div>
        </Card>
      </Col>

      <Modal
        title="Xác nhận hủy đơn hàng :"
        visible={isModalVisibleCancel}
        onOk={handleOkCancel}
        onCancel={handleCancelCancel}
        htmlType="submit"
      >
        <Form form={form}>
          <Form.Item
            name="descriptionCancel"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả để hủy đơn hàng!",
              },
              {
                min: 20,
                message: "Mô tả phải có ít nhất 20 kí tự!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả"
              value={descriptionCancel}
              onChange={onChangeDescriptionCancel}
            />
          </Form.Item>
        </Form>
      </Modal>

      <HistoryModal
        visible={historyModalVisible}
        onCancel={closeHistoryModal}
        billHistory={orderTimeLine}
      />
    </Row>
  );
};

export default TimeLine;
