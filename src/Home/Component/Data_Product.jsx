import React, { useState } from "react";

const FakeProductData = [
  {
    id: 1,
    name: "Áo Sơ mi dài tay Café-DriS",
    price: 299000,
    image:
      "http://res.cloudinary.com/dm256lpnu/image/upload/v1714838976/double_shop/product/55665125/lhyalm59q1zjwbhhymem.jpg",
    description:
      "Áo sơ mi nam tay ngắn, chất liệu vải cotton thoáng mát, thiết kế đơn giản, phù hợp mặc đi làm hoặc dạo phố.",
    hot: true,
    new: false,
    sale: false,
  },
  {
    id: 2,
    name: "Áo khoác gió nam KBP Sport",
    price: 450000,
    image:
      "http://res.cloudinary.com/dm256lpnu/image/upload/v1714824494/double_shop/product/1278995/rnzb201h8giautrjprkn.jpg",
    description:
      "Quần tây nam ôm vải kaki co giãn, kiểu dáng lịch sự, phù hợp đi làm hoặc đi chơi.",
    hot: false,
    new: true,
    sale: false,
  },
  {
    id: 3,
    name: "Áo gió nam AJDSB19-4",
    price: 799000,
    image:
      "http://res.cloudinary.com/dm256lpnu/image/upload/v1714824809/double_shop/product/85857501/jvosnmijal2npngzzylg.webp",
    description:
      "Giày thể thao nam chất liệu cao cấp, đế êm ái, thoáng khí, phù hợp tập luyện hoặc đi chơi.",
    hot: false,
    new: false,
    sale: true,
  },
  {
    id: 4,
    name: "Áo polo comfort Double Bold Fox Head Polo",
    price: 199000,
    image:
      "http://res.cloudinary.com/dm256lpnu/image/upload/v1714836603/double_shop/product/55978794/xkfdprnu0p9mnsuifn2f.webp",
    description:
      "Áo thun nam cổ tròn chất liệu cotton mềm mại, thoáng mát, phù hợp mặc đi chơi hoặc làm việc nhà.",
    hot: false,
    new: true,
    sale: true,
  },
  {
    id: 5,
    name: "Hoodie ",
    price: 500000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714819044/double_shop/product/8835871/ssyxdydtc9a1qtdxgwto.jpg",
    description: "Mô tả sản phẩm 1",
    hot: true,
    new: false,
    sale: false,
  },
  {
    id: 6,
    name: "Sweater Old Sailor",
    price: 550000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714819202/double_shop/product/89798547/dpkjmjuoltfxj0dm9l81.jpg",
    description: "Mô tả sản phẩm 2",
    hot: false,
    new: false,
    sale: true,
  },
  {
    id: 7,
    name: "Áo thun nam trung niên Pixi",
    price: 600000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714821410/double_shop/product/27453808/ombvopopfx64ithziipt.jpg",
    description: "Mô tả sản phẩm 3",
    hot: false,
    new: true,
    sale: false,
  },
  {
    id: 8,
    name: "Sweater Old Sailor",
    price: 650000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714819200/double_shop/product/89798547/hxk8ihxdh2u8s0gazvdv.jpg",
    description: "Mô tả sản phẩm 4",
    hot: false,
    new: true,
    sale: true,
  },
  {
    id: 9,
    name: "Áo thun polo cotton pha cotton có họa tiết",
    price: 700000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714838191/double_shop/product/44496916/exfmzx686j1tiefyhrhj.webp",
    description: "Mô tả sản phẩm 5",
    hot: false,
    new: false,
    sale: true,
  },
  {
    id: 10,
    name: "Áo hoodie trùm đầu cỡ lớn KENZO Target",
    price: 750000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714838330/double_shop/product/58806284/budknzvx4185vqy36qxh.webp",
    description: "Mô tả sản phẩm 6",
    hot: false,
    new: true,
    sale: false,
  },
  {
    id: 11,
    name: "Áo Hoodie Nam Puma X-Playstation",
    price: 800000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714839671/double_shop/product/84892955/ukaaze245e5sptusinvx.webp",
    description: "Mô tả sản phẩm 7",
    hot: false,
    new: false,
    sale: true,
  },
  {
    id: 12,
    name: "Áo Khoác Nam Columbia Titan Pass™ Lightweight",
    price: 850000,
    image: "http://res.cloudinary.com/dm256lpnu/image/upload/v1714839927/double_shop/product/68218205/jb1ifosb9g7y592y0kxr.webp",
    description: "Mô tả sản phẩm 8",
    hot: true,
    new: true,
    sale: false,
  },
];

const DataProduct = () => {
  // Tách dữ liệu thành 3 nhóm tương ứng với 3 hàng
  const firstRowProducts = FakeProductData.filter((product, index) => index < 4);
  const secondRowProducts = FakeProductData.filter((product, index) => index >= 4 && index < 8);
  const thirdRowProducts = FakeProductData.filter((product, index) => index >= 8);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <h3 className="text-center" style={{marginBottom:"20px"}}>Sản phẩm bán chạy</h3>
          <div className="row">
            {firstRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ width: "100%", height: "300px" }} // Thiết lập kích thước của hình ảnh
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-center" style={{marginBottom:"20px"}}>Sản phẩm mới</h3>
          <div className="row">
            {secondRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ width: "100%", height: "300px" }} // Thiết lập kích thước của hình ảnh
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-center" style={{marginBottom:"20px"}}>Sản phẩm giảm giá</h3>
          <div className="row">
            {thirdRowProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ width: "100%", height: "300px" }} // Thiết lập kích thước của hình ảnh
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
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
