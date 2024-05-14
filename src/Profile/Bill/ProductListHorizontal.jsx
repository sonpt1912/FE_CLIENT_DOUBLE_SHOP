import React, { useState, useEffect } from "react";
import { Card, Row, Col, InputNumber, Image, Popover } from "antd";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductListHorizontal = ({ products, detailBillById }) => {
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
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ProductListHorizontal;
