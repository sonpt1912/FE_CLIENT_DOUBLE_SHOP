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
const { Timeline } = require("@mailtop/horizontal-timeline");

const TimeLine = (props) => {
  const dispatch = useDispatch();
  const { orderTimeLine, selectedRowIdBill, selectedStatus, updatedData } =
    props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCancel, setIsModalVisibleCancel] = useState(false);
  const [isModalVisibleReturn, setIsModalVisibleReturn] = useState(false);
  const [isModalVisibleRevert, setIsModalVisibleRevert] = useState(false);
  const [isModalVisibleLost, setIsModalVisibleLost] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionLost, setDescriptionLost] = useState("");
  const [descriptionCancel, setDescriptionCancel] = useState("");
  const [descriptionRevert, setDescriptionRevert] = useState("");
  const [descriptionReturn, setDescriptionReturn] = useState("");
  const [disableCancelButton, setDisableCancelButton] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(selectedStatus);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [shippingCost, setShippingCost] = useState("");
  const [form] = Form.useForm();
  const [billType, setBillType] = useState(0);

  useEffect(() => {
    if (orderTimeLine.length > 0) {
      const lastType = orderTimeLine[orderTimeLine.length - 1]?.bill?.type;
      setBillType(lastType || 0);
    }
  }, [orderTimeLine]);

  const getStatusOfPreviousElement = () => {
    if (orderTimeLine.length < 2) {
      setUpdatedStatus(0);
    }

    const previousElement = orderTimeLine[orderTimeLine.length - 2];
    return previousElement.status;
  };

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalCancel = () => {
    setIsModalVisibleCancel(true);
  };

  const showModalRevert = () => {
    setIsModalVisibleRevert(true);
  };
  const showModalReturn = () => {
    setIsModalVisibleReturn(true);
  };
  const showModalLost = () => {
    setIsModalVisibleLost(true);
  };

  const handleOk = () => {
    if (description.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (description.trim().length < 50) {
      message.error("Mô tả phải có ít nhất 50 ký tự!");
      return;
    }
    form
      .validateFields()
      .then((values) => {
        dispatch()
        // updateBill({
        //   id: selectedRowIdBill,
        //   status: updatedStatus + 1,
        //   description: description,
        //   moneyShip: updatedStatus === 1 ? shippingCost : null,
        // })
          .then((response) => {
            setIsModalVisible(false);
            // dispatch(getHistoryBill({ id: selectedRowIdBill }));
            setUpdatedStatus((prevStatus) => prevStatus + 1);
            updatedData();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
            setIsModalVisible(false);
          });
      })
      .catch((error) => {
        console.error("Vui lòng không để trống và nhập đúng định dạng", error);
      });
  };

  const handleRevert = () => {
    if (descriptionRevert.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (descriptionRevert.trim().length < 50) {
      message.error("Mô tả phải có ít nhất 50 ký tự!");
      return;
    }

    const previousStatus = getStatusOfPreviousElement();
    if (previousStatus === null) {
      message.error("Không thể quay lại trạng thái trước đó!");
      return;
    }

    form
      .validateFields()
      .then(() => {
        dispatch()
        // updateBill({
        //   id: selectedRowIdBill,
        //   status: previousStatus,
        //   description: descriptionRevert,
        // })
          .then((response) => {
            setIsModalVisibleRevert(false);
            // dispatch(getHistoryBill({ id: selectedRowIdBill }));
            setUpdatedStatus(previousStatus);
            updatedData();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
            setIsModalVisibleRevert(false);
          });
      })
      .catch((error) => {
        console.error("Vui lòng không để trống và nhập đúng định dạng", error);
      });
  };
  const handleLost = () => {
    if (descriptionLost.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (descriptionLost.trim().length < 50) {
      message.error("Mô tả phải có ít nhất 50 ký tự!");
      return;
    }

    form
      .validateFields()
      .then(() => {
        dispatch()
        // updateBill({
        //   id: selectedRowIdBill,
        //   status: 8,
        //   description: descriptionLost,
        // })
          .then((response) => {
            setIsModalVisibleLost(false);
            // dispatch(getHistoryBill({ id: selectedRowIdBill }));
            setUpdatedStatus(8);
            updatedData();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
            setIsModalVisibleLost(false);
          });
      })
      .catch((error) => {
        console.error("Vui lòng không để trống và nhập đúng định dạng", error);
      });
  };
  const handleOkCancel = () => {
    if (descriptionCancel.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (descriptionCancel.trim().length < 50) {
      message.error("Mô tả phải có ít nhất 50 ký tự!");
      return;
    }

    form
      .validateFields()
      .then(() => {
        dispatch()
        // updateBill({
        //   id: selectedRowIdBill,
        //   status: 5,
        //   description: descriptionCancel,
        // })
          .then((response) => {
            console.log("Đã Hủy đơn hàng thành công!", response);
            setIsModalVisibleCancel(false);
            // dispatch(getHistoryBill({ id: selectedRowIdBill }));
            setUpdatedStatus(5);
            updatedData();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Lỗi khi hủy đơn hàng:", error);
            setIsModalVisibleCancel(false);
          });
      })
      .catch((error) => {
        console.error("Vui lòng không để trống và nhập đúng định dạng", error);
      });
  };

  const handleOkReturn = () => {
    if (descriptionReturn.trim() === "") {
      message.error("Vui lòng nhập mô tả!");
      return;
    }
    if (descriptionReturn.trim().length < 50) {
      message.error("Mô tả phải có ít nhất 50 ký tự!");
      return;
    }

    form
      .validateFields()
      .then(() => {
        dispatch()
        // updateBill({
        //   id: selectedRowIdBill,
        //   status: 6,
        //   description: descriptionReturn,
        // })
          .then((response) => {
            console.log("Đã trả đơn hàng thành công!", response);
            setIsModalVisibleReturn(false);
            // dispatch(getHistoryBill({ id: selectedRowIdBill }));
            setUpdatedStatus(5);
            updatedData();
            form.resetFields();
          })
          .catch((error) => {
            console.error("Lỗi khi trả đơn hàng:", error);
            setIsModalVisibleReturn(false);
          });
      })
      .catch((error) => {
        console.error("Vui lòng không để trống và nhập đúng định dạng", error);
      });
  };

  const handleCancelCancel = () => {
    setIsModalVisibleCancel(false);
    setDescriptionCancel("");
  };
  const handleCancelReturn = () => {
    setIsModalVisibleReturn(false);
    setDescriptionReturn("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeDescriptionReturn = (e) => {
    setDescriptionReturn(e.target.value);
  };

  const onChangeDescriptionCancel = (e) => {
    setDescriptionCancel(e.target.value);
  };

  const onChangeDescriptionRevert = (e) => {
    setDescriptionRevert(e.target.value);
  };
  const onChangeDescriptionLost = (e) => {
    setDescriptionLost(e.target.value);
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
              {updatedStatus === 4 && (
                <Button
                  className="return-button"
                  type="primary"
                  onClick={showModalReturn}
                >
                  Trả hàng
                </Button>
              )}
              {updatedStatus === 3 && (
                <Button
                  className="confirm-button"
                  type="default"
                  onClick={showModalLost}
                >
                  Thất Lạc
                </Button>
              )}
              {updatedStatus !== 0 && updatedStatus !== 5 && (
                <Button className="print-button" type="primary" ghost>
                  In Hóa Đơn
                </Button>
              )}
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
        title="Xác nhận đơn hàng :"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
              {
                min: 50,
                message: "Mô tả phải có ít nhất 50 kí tự!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả"
              value={description}
              onChange={onChangeDescription}
            />
          </Form.Item>
          {updatedStatus === 1 && (
            <Form.Item
              name="shippingCost"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiền ship!",
                },
              ]}
            >
              <Input
                placeholder="Tiền ship"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>

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
                min: 50,
                message: "Mô tả phải có ít nhất 50 kí tự!",
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

      <Modal
        title="Xác nhận trả đơn hàng :"
        visible={isModalVisibleReturn}
        onOk={handleOkReturn}
        onCancel={handleCancelReturn}
      >
        <Form form={form}>
          <Form.Item
            name="descriptionReturn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả để trả đơn hàng!",
              },
              {
                min: 50,
                message: "Mô tả phải có ít nhất 50 kí tự!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả"
              value={descriptionReturn}
              onChange={onChangeDescriptionReturn}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận quay lại trạng thái đơn hàng :"
        visible={isModalVisibleRevert}
        onOk={handleRevert}
        onCancel={() => setIsModalVisibleRevert(false)}
      >
        <Form form={form}>
          <Form.Item
            name="descriptionRevert"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả để quay lại đơn hàng!",
              },
              {
                min: 50,
                message: "Mô tả phải có ít nhất 50 kí tự!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả"
              value={descriptionRevert}
              onChange={onChangeDescriptionRevert}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận trạng thái đơn hàng thất lạc:"
        visible={isModalVisibleLost}
        onOk={handleLost}
        onCancel={() => setIsModalVisibleLost(false)}
      >
        <Form>
          <Form.Item
            name="descriptionLost"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
              {
                min: 50,
                message: "Mô tả phải có ít nhất 50 ký tự!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả"
              value={descriptionLost}
              onChange={onChangeDescriptionLost}
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
