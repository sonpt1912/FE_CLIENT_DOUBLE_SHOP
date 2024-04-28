import React, { useState } from "react";

const FakeProductData = [
  {
    id: 1,
    name: "Áo Sơ Mi Nam Tay Ngắn",
    price: 299000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU",
    description:
      "Áo sơ mi nam tay ngắn, chất liệu vải cotton thoáng mát, thiết kế đơn giản, phù hợp mặc đi làm hoặc dạo phố.",
    hot: true,
    new: false,
    sale: false,
  },
  {
    id: 2,
    name: "Quần Tây Nam Ôm",
    price: 450000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU",
    description:
      "Quần tây nam ôm vải kaki co giãn, kiểu dáng lịch sự, phù hợp đi làm hoặc đi chơi.",
    hot: false,
    new: true,
    sale: false,
  },
  {
    id: 3,
    name: "Giày Thể Thao Nam",
    price: 799000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU",
    description:
      "Giày thể thao nam chất liệu cao cấp, đế êm ái, thoáng khí, phù hợp tập luyện hoặc đi chơi.",
    hot: false,
    new: false,
    sale: true,
  },
  {
    id: 4,
    name: "Áo Thun Nam Cổ Tròn",
    price: 199000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU",
    description:
      "Áo thun nam cổ tròn chất liệu cotton mềm mại, thoáng mát, phù hợp mặc đi chơi hoặc làm việc nhà.",
    hot: false,
    new: true,
    sale: true,
  },
];

const DataProduct = () => {
 
  // Chia dữ liệu thành 3 nhóm tương ứng với 3 hàng
  const firstRowProducts = FakeProductData;
  const secondRowProducts = FakeProductData;
  const thirdRowProducts = FakeProductData;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h3 className="text-center">Sản phẩm bán chạy</h3>
          <div className="row">
            {firstRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      Giá:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <h3 className="text-center">Sản phẩm mới</h3>

          <div className="row">
            {secondRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      Giá:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <h3 className="text-center">Sản phẩm giảm giá</h3>

          <div className="row">
            {thirdRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      Giá:{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProduct;
