import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import Cart from "../API/CartAPI";
import User from "../API/User";
import logo from "../Image/1.jpg";
import { addUser, deleteCart } from "../Redux/Action/ActionCart";
import { changeCount } from "../Redux/Action/ActionCount";
import { addSession, deleteSession } from "../Redux/Action/ActionSession";
import queryString from "query-string";
import Product from "../API/Product";
import { addSearch } from "../Redux/Action/ActionSearch";
import CartsLocal from "./CartsLocal";
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Row, Col, Pagination, Spin } from 'antd';
import axios from 'axios';


function Header(props) {
  // State count of cart
  const { pathname } = useLocation();

  const [count_cart, set_count_cart] = useState(0);

  const [total_price, set_total_price] = useState(0);

  const [carts_mini, set_carts_mini] = useState([]);

  // Hàm này để khởi tạo localStorage dùng để lưu trữ giỏ hàng
  // Và nó sẽ chạy lần đầu
  // useEffect(() => {
  //   if (localStorage.getItem("carts") !== null) {
  //     set_carts_mini(JSON.parse(localStorage.getItem("carts")));
  //   } else {
  //     localStorage.setItem("carts", JSON.stringify([]));
  //   }
  // }, []);

  // Xử lý thanh navigation
  const [header_navbar, set_header_navbar] = useState(
    "header-bottom header-sticky"
  );

  window.addEventListener("scroll", () => {
    if (window.pageYOffset < 200) {
      set_header_navbar("header-bottom header-sticky");
    } else {
      set_header_navbar(
        "header-bottom header-sticky offset_navigation animate__animated animate__fadeInUp"
      );
    }
  });

  const dispatch = useDispatch();

  //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
  // đưa dữ liệu vào Redux
  // if (sessionStorage.getItem("id_user")) {
  //   const action = addSession(sessionStorage.getItem("id_user"));
  //   dispatch(action);
  // }

  //Get IdUser từ redux khi user đã đăng nhập
  var id_user = useSelector((state) => state.Session.idUser);

  // Get carts từ redux khi user chưa đăng nhập
  // const carts = useSelector(state => state.Cart.listCart)
  const [active_user, set_active_user] = useState(false);
  // Trong bất kỳ thành phần nào của ứng dụng, bạn có thể lấy accessToken từ localStorage như sau:
  const accessToken = localStorage.getItem('token');

  const [user, set_user] = useState({});

  // Hàm này dùng để hiện thị
  // useEffect(() => {
  //   if (!id_user) {


  //     set_active_user(false);
  //   } else {


  //     const fetchData = async () => {
  //       const response = await User.Get_User(sessionStorage.getItem("id_user"));
  //       set_user(response);
  //     };

  //     fetchData();

  //     set_active_user(true);
  //   }
  // }, [id_user]);

  // Hàm này dùng để xử lý phần log out
  const handler_logout = () => {
    const action = deleteSession("");
    dispatch(action);

    sessionStorage.clear();
  };

  // Get trạng thái từ redux khi user chưa đăng nhập
  const count = useSelector((state) => state.Count.isLoad);

  // Hàm này dùng để load lại dữ liệu giỏ hàng ở phần header khi có bất kì thay đổi nào
  // Phụ thuộc vào thằng redux count
  useEffect(() => {
    if (count) {
      // showData(JSON.parse(localStorage.getItem("carts")), 0, 0);

      const action = changeCount(count);
      dispatch(action);
    }
  }, [count]);

  // Hàm này là hàm con chia ra để xử lý
  // function showData(carts, sum, price) {
  //   carts.map((value) => {
  //     sum += value.count;
  //     price += parseInt(value.price_product) * parseInt(value.count);
  //   });

  //   set_count_cart(sum);

  //   set_total_price(price);

  //   set_carts_mini(carts);
  // }

  // Hàm này dùng để xóa carts_mini
  const handler_delete_mini = (id_cart) => {
    CartsLocal.deleteProduct(id_cart);

    const action_change_count = changeCount(count);
    dispatch(action_change_count);
  };

  const [male, set_male] = useState([]);
  const [female, set_female] = useState([]);

  // Gọi API theo phương thức GET để load category
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params_male = {
  //       gender: "male",
  //     };

  //     const query_male = "?" + queryString.stringify(params_male);

  //     const response_male = await Product.Get_Category_Gender(query_male);

  //     set_male(response_male);

  //     const params_female = {
  //       gender: "female",
  //     };

  //     const query_female = "?" + queryString.stringify(params_female);

  //     const response_female = await Product.Get_Category_Gender(query_female);

  //     set_female(response_female);
  //   };

  //   fetchData();
  // }, []);

  // state keyword search
  const [keyword_search, set_keyword_search] = useState("");

  const [products, set_products] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await Product.Get_All_Product();
        set_products(response);
        // Đặt loading thành false khi fetch hoàn thành
      } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi ở đây
      }
    };

    fetchData();
  }, []);



  // Hàm này trả ra list product mà khách hàng tìm kiếm
  // sử dụng useMemo để performance hơn vì nếu mà dữ liệu mới giống với dữ liệu cũ thì nó sẽ lấy cái
  // Không cần gọi API để tạo mới data
  const search_header = useMemo(() => {
    const new_data = products.filter((value) => {
      return (
        value.name_product
          .toUpperCase()
          .indexOf(keyword_search.toUpperCase()) !== -1
      );
    });

    return new_data;
  }, [keyword_search]);
  const [idCustomer, setIdCustomer] = useState('')
  const handler_search = (e) => {
    e.preventDefault();

    // Đưa vào redux để qua bên trang search lấy query tìm kiếm
    const action = addSearch(keyword_search);
    dispatch(action);

    // set cho nó cái session
    sessionStorage.setItem("search", keyword_search);

    window.location.replace("/search");
  };
  const history = useHistory();
  // const [showModal, setShowModal] = useState(false);

  // Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFavoriteClick = () => {
    if (accessToken) {
      // Hiển thị modal nếu đã đăng nhập
      setIsModalVisible(true);
      fetchData(); // Gọi API ở đây
    } else {
      // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      history.push('/signin');
    }
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8071/customer/user-info");
        // Lưu idCustomer từ dữ liệu nhận được vào state
        console.log(response);
        setIdCustomer(response.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const profileRegex = /^\/profile\/[a-zA-Z0-9-_]+$/;

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8071/favorite/get-all-by-id-customer'); // Replace with your API endpoint
      console.log(response);
      console.log(response.data);
      setData(response.data);

      setLoading(false) // Set the data state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false); // Đặt loading thành false dù có lỗi xảy ra hay không
    }

  };


  useEffect(() => {
    fetchData(); // Call fetchData function when component mounts
  }, []);
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
  const [pageSize, setPageSize] = useState(4); // State cho kích thước của trang

  // Số lượng item trên mỗi trang
  const itemsPerPage = pageSize;

  // Tính toán tổng số trang dựa trên số lượng item và số lượng item trên mỗi trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Cắt danh sách voucher thành các trang tương ứng
  const slicedVouchers = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Xử lý sự kiện thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý sự kiện thay đổi kích thước của trang
  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi kích thước của trang
    setPageSize(size);
  };


  return (
    <header >
      <div >
        <div className={header_navbar}>
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div className="hb-menu">
                  <nav>
                    <ul className="navbar-ul"
                      style={{ backgroundColor: "white", borderBottom: "1px solid red", borderTop: "1px solid red" }}
                    >
                      <li>
                        <Link to="/">
                          <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "14rem", margin: "1rem" }}
                          />
                        </Link>
                      </li>
                      <ul style={{ display: 'flex', listStyleType: 'none', marginLeft: "-5px" }}>
                        <li style={{ marginRight: '10px' }}>
                          <Link to="/" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>TRANG CHỦ</Link>
                        </li>
                        <li style={{ marginRight: '10px' }}>
                          <Link to="/shop/product" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>BỘ SƯU TẬP</Link>
                        </li>
                        <li>
                          <Link to="/contact" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>LIÊN HỆ</Link>
                        </li>
                        <li>
                          <Link to="/about" style={{ fontSize: '18px', color: 'black', textDecoration: 'none' }}>VỀ CHÚNG TÔI</Link>
                        </li>
                      </ul>

                      <li style={{ display: "flex", alignItems: "center" }}>
                        <Link to={accessToken ? `/profile` : "/signin"} style={{ margin: "0 15px", fontSize: "25px" }} >
                          <AiOutlineUser style={{ color: "black" }} /> {/* Biểu tượng user */}


                        </Link>
                        <div style={{ marginTop: "10px", marginLeft: "20px", marginRight: "20px", fontSize: "25px", cursor: "pointer" }} onClick={handleFavoriteClick}>
                          <AiOutlineHeart style={{ color: "black" }} />
                        </div>
                        {isModalVisible && ( // Kiểm tra nếu isModalVisible là true thì mới hiển thị modal
                          <Modal visible={isModalVisible} width={1000} onCancel={handleCancel}
                            footer={[
                              <Button key="cancel" onClick={handleCancel}>
                                Đóng
                              </Button>
                            ]}
                          >
                            {/* Nội dung của modal */}
                            <div className="modal-content">
                              {/* Nút đóng modal */}
                              <span className="close" onClick={() => setIsModalVisible(false)}>&times;</span>
                              <h2 style={{ textAlign: "center" }}>Danh sách sản phẩm</h2>
                              <Spin spinning={loading} size="large" style={{ margin: '0 auto' }}>

                                <Row style={{ border: '1px solid white', padding: '15px', height: "280px", overflow: "auto" }}>
                                  {slicedVouchers.map(i => (
                                    <Col span={12} key={i.id}>
                                      <div style={{
                                        margin: '10px',
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: '',
                                        borderRadius: '5px',
                                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                                        position: 'relative',
                                        height: "100px"
                                      }}>
                                        <Row>
                                          <Col span={8}>
                                            {/* Kiểm tra xem có ảnh không */}
                                            {i.listImage ? (
                                              // Nếu có ảnh, hiển thị ảnh
                                              <img src={i.listImage.resource[0].url} alt={i.name} style={{ width: "150px", height: "75px" }} />
                                            ) : (
                                              // Nếu không có ảnh, hiển thị div
                                              <div style={{ width: "150px", backgroundColor: '#f0f0f0', height: "75px" }} />
                                            )}
                                          </Col>
                                          <Col span={16} style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: 40, right: 0, transform: 'translateY(-50%)' }}>
                                              Tên sản phẩm: {i.name} {/* Product name */}
                                            </div>
                                          </Col>
                                        </Row>
                                        <div style={{
                                          position: 'absolute', // Sử dụng absolute position để đặt endDate
                                          bottom: '5px',
                                          right: '10px',
                                          fontStyle: 'italic'
                                        }}>
                                          {/* HSD: <br></br>{i.product.code} */}
                                        </div>
                                      </div>
                                    </Col>
                                  ))}

                                </Row>
                              </Spin>

                              <Pagination
                                style={{ textAlign: 'center', marginTop: '10px' }}
                                current={currentPage}
                                total={data.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                onShowSizeChange={handlePageSizeChange}
                                showSizeChanger
                                pageSizeOptions={['4', '8', '16', '32']}
                                showTotal={(record) => `Tổng ${record} sản phẩm`}
                              />
                            </div>
                          </Modal>
                        )}

                        <Link to="/cart" style={{ margin: "0 15px", fontSize: "25px" }}>
                          <AiOutlineShoppingCart style={{ color: "black" }} /> {/* Biểu tượng shopping cart */}
                          <span className="cart-item-count">
                            {/* {count_cart} */}
                          </span>
                        </Link>
                      </li>




                      {/* <li style={{ float: "right" }}>
                        <div className="ht-setting-trigger" style={{ marginLeft: "-50px" }}>
                          {active_user ? (
                            <span
                              data-toggle="collapse"
                              data-target="#collapseExample"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            >
                              {user.fullname}
                            </span>
                          ) : (
                            <Link
                              to="/signin"
                              style={{
                                display: "flex",
                                color: "#242424",
                                fontSize: "18px",
                                lineHeight: "35px",
                                fontWeight: "400",
                                padding: "8px 0",
                                textDecoration: "none" 
                              }}
                            >
                              SIGN IN
                            </Link>
                          )}
                        </div>
                        <div className="ul_setting">
                          {active_user ? (
                            <ul
                              className="setting_ul collapse"
                              id="collapseExample"
                            >
                              <li className="li_setting">
                                <Link
                                  to={`/profile/${sessionStorage.getItem("id_user")}`}
                                >
                                  Profile
                                </Link>
                              </li>
                              <li className="li_setting">
                                <Link to="/history">Order Status</Link>
                              </li>
                              <li className="li_setting">
                                <a onClick={handler_logout} href="#">
                                  Log Out
                                </a>
                              </li>
                            </ul>
                          ) : null}
                        </div>
                      </li> */}

                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
