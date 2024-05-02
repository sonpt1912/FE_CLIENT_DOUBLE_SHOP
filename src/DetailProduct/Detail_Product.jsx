import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../API/Product";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SaleAPI from "../API/SaleAPI";

Detail_Product.propTypes = {};

function Detail_Product(props) {
  const { id } = useParams();

//   const [product, set_product] = useState({});
  const fakeProduct = {
    id: 1,
    name_product: "Áo khoác form rộng oversize",
    price_product: 500000, // Giá sản phẩm
    image: "https://example.com/image.jpg", // Link ảnh sản phẩm
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel harum tenetur delectus nam quam assumenda? Soluta vitae tempora ratione excepturi doloremque, repudiandae ullam, eum corporis, itaque dolor aperiam enim aspernatur.", // Mô tả sản phẩm
    sizes: ["S", "M", "L","XL"], // Các size có sẵn
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
                <div className="product-info">
                  <h2>{product.name_product}</h2>
                  <div className="price-box pt-20">
                    {sale ? (
                      <del
                        className="new-price new-price-2"
                        style={{ color: "#525252" }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "decimal",
                          decimal: "VND",
                        }).format(product.price_product) + " VNĐ"}
                      </del>
                    ) : (
                      <span className="new-price new-price-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "decimal",
                          decimal: "VND",
                        }).format(product.price_product) + " VNĐ"}
                      </span>
                    )}
                    <br />
                    {sale && (
                      <span className="new-price new-price-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "decimal",
                          decimal: "VND",
                        }).format(
                          parseInt(sale.id_product.price_product) -
                            (parseInt(sale.id_product.price_product) *
                              parseInt(sale.promotion)) /
                              100
                        ) + " VNĐ"}
                      </span>
                    )}
                  </div>
                  <div className="product-desc">
                    <p>
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel harum tenetur delectus nam quam assumenda? Soluta
                        vitae tempora ratione excepturi doloremque, repudiandae
                        ullam, eum corporis, itaque dolor aperiam enim
                        aspernatur.
                      </span>
                    </p>
                  </div>
                  <div className="product-variants">
                    <div className="produt-variants-size">
                      <label>Size</label>
                      <select
                        className="nice-select"
                        onChange={(e) => set_size(e.target.value)}
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  </div>
                  <div className="single-add-to-cart">
                    <form action="#" className="cart-quantity">
                      <div className="quantity">
                        <label>Quantity</label>
                        <div className="cart-plus-minus">
                          <input
                            className="cart-plus-minus-box"
                            value={count}
                            type="text"
                            onChange={(e) => set_count(e.target.value)}
                          />
                          <div className="dec qtybutton" onClick={downCount}>
                            <i className="fa fa-angle-down"></i>
                          </div>
                          <div className="inc qtybutton" onClick={upCount}>
                            <i className="fa fa-angle-up"></i>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="add-to-cart"
                        type="submit"
                        onClick={handler_addcart}
                      >
                        Add to cart
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="product-area pt-35">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="li-product-tab">
                <ul className="nav li-product-menu">
                  <li>
                    <a className="active" data-toggle="tab" href="#description">
                      <span>Description</span>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#reviews">
                      <span>Reviews</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div
              id="description"
              className="tab-pane active show"
              role="tabpanel"
            >
              <div className="product-description">
                <span>
                  The best is yet to come! Give your walls a voice with a framed
                  poster. This aesthethic, optimistic poster will look great in
                  your desk or in an open-space office. Painted wooden frame
                  with passe-partout for more depth.
                </span>
              </div>
            </div>
           
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Detail_Product;
