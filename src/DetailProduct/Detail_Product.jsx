import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../API/Product";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SaleAPI from "../API/SaleAPI";
import { InputNumber } from "antd";

Detail_Product.propTypes = {};

function Detail_Product(props) {
  const { id } = useParams();

  //   const [product, set_product] = useState({});
  const fakeProduct = {
    updatedTime: null,
    product: {
      id: 14,
      code: "81005688",
      name: "Áo Phông 3",
      weight: 1,
      height: null,
      width: null,
      length: null,
      status: 0,
      brand: {
        id: 1,
        code: "BRAND1",
        name: "Tuấn",
        description: "tuấn",
        status: 0,
        createdBy: "sonpt",
        updatedBy: null,
        createdTime: "2024-04-27 22:51:36",
        updatedTime: null,
      },
      collar: {
        id: 1,
        code: "COLLAR1",
        name: "Cổ dài",
        description: "dài",
        status: 0,
        createdBy: "sonpt",
        updatedBy: null,
        createdTime: "2024-04-27 22:51:08",
        updatedTime: null,
      },
      category: {
        id: 1,
        code: "CATEGORY1",
        name: "Tốt",
        description: "tốt",
        status: 0,
        createdBy: "sonpt",
        updatedBy: null,
        createdTime: "2024-04-27 22:51:27",
        updatedTime: null,
      },
      material: {
        id: 1,
        code: "MATERIAL1",
        name: "sắt",
        description: "cứng",
        status: 0,
        createdBy: "TranTung",
        updatedBy: null,
        createdTime: "2024-04-27T22:51:15.701073500",
        updatedTime: null,
      },
      createdBy: "sonpt",
      createdTime: "2024-05-01 00:44:59",
      updatedTime: null,
      updatedBy: null,
      listImages: null,
      listDetailProduct: null,
    },
    collar: {
      id: 1,
      code: "COLLAR1",
      name: "Cổ dài",
      description: "dài",
      status: 0,
      createdBy: "sonpt",
      updatedBy: null,
      createdTime: "2024-04-27 22:51:08",
      updatedTime: null,
    },
    quantity: 111,
    updatedBy: null,
    color: [
      {
        id: 2,
        code: "#ff0000",
        name: "XSM",
        description: "ha",
        status: 0,
        createdBy: "1",
        updatedBy: null,
        createdTime: "2024-04-29 13:24:09",
        updatedTime: null,
      },
      {
        id: 3,
        code: "#000000",
        name: "XSMX",
        description: "haX",
        status: 0,
        createdBy: "1",
        updatedBy: null,
        createdTime: "2024-04-29 13:24:09",
        updatedTime: null,
      },
    ],
    discountAmount: 0,
    listImages: {
      resources: [],
      total_count: 0,
      time: 2,
    },
    size: [
      {
        id: 1,
        code: "SIZE1",
        name: "XL",
        description: "To",
        status: 0,
        createdBy: "sonpt",
        updatedBy: null,
        createdTime: "2024-04-27 22:50:58",
        updatedTime: null,
      },
      {
        id: 2,
        code: "SIZE2",
        name: "XLX",
        description: "ToX",
        status: 0,
        createdBy: "sonpt",
        updatedBy: null,
        createdTime: "2024-04-27 22:50:58",
        updatedTime: null,
      },
    ],
    material: {
      id: 1,
      code: "MATERIAL1",
      name: "sắt",
      description: "cứng",
      status: 0,
      createdBy: "TranTung",
      updatedBy: null,
      createdTime: "2024-04-27T22:51:15.701073500",
      updatedTime: null,
    },
    createdBy: "sonpt",
    price: 2000,
    createdTime: "2024-05-01 00:44:59",
    id: 15,
    category: {
      id: 1,
      code: "CATEGORY1",
      name: "Tốt",
      description: "tốt",
      status: 0,
      createdBy: "sonpt",
      updatedBy: null,
      createdTime: "2024-04-27 22:51:27",
      updatedTime: null,
    },
    brand: {
      id: 1,
      code: "BRAND1",
      name: "Tuấn",
      description: "tuấn",
      status: 0,
      createdBy: "sonpt",
      updatedBy: null,
      createdTime: "2024-04-27 22:51:36",
      updatedTime: null,
    },
    status: 0,
  };

  const fakeSale = {
    id_product: fakeProduct,
    promotion: 10, // Phần trăm giảm giá
  };

  // Sử dụng dữ liệu giả mạo trong component
  const [product, set_product] = useState(fakeProduct);
  const [sale, setSale] = useState(fakeSale);

  const dispatch = useDispatch();

  //id_user được lấy từ redux
  const id_user = useSelector((state) => state.Cart.id_user);

  // Get count từ redux khi user chưa đăng nhập
  const count_change = useSelector((state) => state.Count.isLoad);

  //   const [sale, setSale] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await Product.Get_Detail_Product(id);

      set_product(response);

      const resDetail = await SaleAPI.checkSale(id);

      if (resDetail.msg === "Thanh Cong") {
        setSale(resDetail.sale);
      }
    };

    fetchData();
  }, [id]);

  const [count, set_count] = useState(1);

  const [show_success, set_show_success] = useState(false);

  const [size, set_size] = useState("S");

  // Hàm này dùng để thêm vào giỏ hàng
  const handler_addcart = (e) => {
    e.preventDefault();
  };

  // Hàm này dùng để giảm số lượng
  const downCount = () => {
    if (count === 1) {
      return;
    }

    set_count(count - 1);
  };

  const upCount = () => {
    set_count(count + 1);
  };

  // State dùng để mở modal
  const [modal, set_modal] = useState(false);

  // State thông báo lỗi comment
  const [error_comment, set_error_comment] = useState(false);

  const [star, set_star] = useState(1);

  const [comment, set_comment] = useState("");

  const [validation_comment, set_validation_comment] = useState(false);

  // state load comment
  const [load_comment, set_load_comment] = useState(true);

  // State list_comment
  const [list_comment, set_list_comment] = useState([]);

  const handleSizeChange = (newSize) => {
    // Cập nhật product.size trong state của component
    set_product((prevProduct) => ({
      ...prevProduct,
      size: newSize,
    }));
  };
  const handleColorChange = (newColor) => {
    // Cập nhật product.color trong state của component
    set_product((prevProduct) => ({
      ...prevProduct,
      color: newColor,
    }));
  };
  return (
    <div>
      {show_success && (
        <div className="modal_success">
          <div className="group_model_success pt-3">
            <div className="text-center p-2">
              <i
                className="fa fa-bell fix_icon_bell"
                style={{ fontSize: "40px", color: "#fff" }}
              ></i>
            </div>
            <h4 className="text-center p-3" style={{ color: "#fff" }}>
              Bạn Đã Thêm Hàng Thành Công!
            </h4>
          </div>
        </div>
      )}

      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">Detail</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-wraper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6">
              <div className="product-details-left">
                <div className="product-details-images slider-navigation-1">
                  <div className="lg-image">
                    <img
                      src={
                        "https://zizoou.com/cdn/shop/products/Ao-khoac-jacket-form-rong-oversize-7-5-Ao-khoac-xanh-ZiZoou-Store_aa4b7624-3dd2-4db3-926b-d49c5e80e293.jpg?v=1677891081"
                      }
                      alt="product image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content pt-60">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h4 className="title text-dark">
                      {fakeProduct.product.name}
                    </h4>
                    <div className="mb-3">
                      <span className="h5 text-danger">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "decimal",
                          decimal: "VND",
                        }).format(fakeProduct.price) + ".00đ"}
                      </span>
                    </div>
                    <div className="row">
                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">
                        {fakeProduct.product.brand.name}
                      </dd>
                      <dt className="col-3">Category</dt>
                      <dd className="col-9">
                        {fakeProduct.product.category.name}
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <dt className="mb-2">Size</dt>
                    <div className="d-flex flex-wrap">
                      {fakeProduct.size.map((size) => (
                        <div
                          key={size.id}
                          className={`size-swatch ${
                            size === fakeProduct.size ? "active" : ""
                          }`}
                          style={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSizeChange(size)}
                        >
                          {size.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <dt className="mb-2">Color</dt>
                    <div className="d-flex flex-wrap">
                      {fakeProduct.color.map((color) => (
                        <div
                          key={color.id}
                          className={`color-swatch ${
                            color === fakeProduct.color ? "active" : ""
                          }`}
                          style={{
                            backgroundColor: color.code,
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                          }}
                          onClick={() => handleColorChange(color)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4 col-6">
                    <dt className="mb-2 d-block">Quantity</dt>
                    <div
                      className="input-group mb-3"
                      style={{ width: "170px" }}
                    >
                      <InputNumber
                        min="1"
                        value={fakeProduct.quantity}
                        onChange={(e) => set_count(e.target.value)}
                        type="number"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-to-cart" type="submit">
                Add to cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail_Product;
