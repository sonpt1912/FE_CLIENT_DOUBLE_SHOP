import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  InputNumber,
  Button,
  Space,
  Popconfirm,
  message,
  Image,
  Popover,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteDetailBill } from "../../../config/BillApi";

const { Meta } = Card;

const ProductListHorizontal = ({
  products,
  detailBillById,
  billHistory,
  setBillHistory,
  updatedData,
}) => {
  const dispatch = useDispatch();

  const [productList, setProductList] = useState(products);
  const [totalPrices, setTotalPrices] = useState(
    products.map((product) => product.price * product.quantity)
  );

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleQuantityChange = (value, index) => {
    const newTotalPrices = [...totalPrices];
    newTotalPrices[index] = value * productList[index].price;
    setTotalPrices(newTotalPrices);

    const updatedProducts = [...productList];
    updatedProducts[index].quantity = value;
    setProductList(updatedProducts);
  };

  const handleDelete = (index) => {
    const productId = productList[index].id;
    const productName = productList[index].name;

    const payload = {
      id: detailBillById.id,
      idDetailBill: productId,
      productName: productName,
    };

    dispatch(deleteDetailBill(payload))
      .unwrap()
      .then(() => {
        message.success("Product deleted successfully!");
        const updatedProducts = [...productList];
        updatedProducts.splice(index, 1);
        setProductList(updatedProducts);

        const updatedBillHistory = billHistory.map((bill) => {
          if (bill.id === detailBillById.id) {
            return {
              ...bill,
              products: updatedProducts,
            };
          }
          return bill;
        });

        setBillHistory(updatedBillHistory);
        updatedData();
      })
      .catch((error) => {
        message.error("Failed to delete product: " + error.message);
      });
  };

  return (
    <Card hoverable style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        {productList.map((product, index) => (
          <Col span={24} key={index}>
            <Card hoverable style={{ width: "100%" }}>
              <Row gutter={[16, 16]} align="middle">
                <Col span={2}>
                  <p>{index + 1}</p>
                </Col>
                <Col span={5}>
                  <Col span={5}>
                    <Popover
                      placement="right"
                      title={null}
                      content={
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {product.listImages.resources.map((image, index) => (
                            <div key={index}>
                              <Image
                                width={100}
                                src={image.url}
                                alt={`Image ${index + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      }
                    >
                      <Image
                        width={200}
                        src={product.listImages.resources[0]?.url || ""}
                        alt={`Image 1`}
                        preview={false}
                      />
                    </Popover>
                  </Col>
                </Col>
                <Col span={6}>
                  <Meta
                    title={product.name}
                    description={`Size: ${product.size.name} - Color: ${product.color.name}`}
                  />
                </Col>
                <Col span={3}>
                  <InputNumber
                    value={product.quantity}
                    onChange={(value) => handleQuantityChange(value, index)}
                    disabled={
                      (detailBillById.status !== 0 &&
                        detailBillById.status !== 1 &&
                        detailBillById.status !== 1) ||
                      productList.length === 1
                    }
                  />
                </Col>
                <Col span={3}>
                  <p>{product.price}</p>
                </Col>
                <Col span={3}>
                  <p>{totalPrices[index]}</p>
                </Col>
                <Col span={2}>
                  <Space>
                    <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => handleDelete(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        disabled={
                          (detailBillById.status !== 0 &&
                            detailBillById.status !== 1 &&
                            detailBillById.status !== 1) ||
                          productList.length === 1
                        }
                      />
                    </Popconfirm>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ProductListHorizontal;
