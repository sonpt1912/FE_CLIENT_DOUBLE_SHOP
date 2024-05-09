// import PropTypes from 'prop-types';
// import { Modal, Row, Col, Pagination ,Button} from 'antd'; // Import Modal, Row, and Col components
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { WiDayCloudy } from 'react-icons/wi';
// Favorite.propTypes = {

// };

// function Favorite(props) {

//     const [data, setData] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(4);

//     const fetchData = async () => {
//         try {
//             const response = await axios.post('http://localhost:8071/favorite/get-all-by-id-customer');
//             setData(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     const handleFavoriteClick = async (productId) => {
//         try {
//             // Gọi API yêu thích sản phẩm với productId
//             const response = await axios.post('http://localhost:8071/favorite/add', { productId });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error favoriting product:', error);
//         }
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handlePageSizeChange = (current, size) => {
//         setCurrentPage(1);
//         setPageSize(size);
//     };

//     const slicedVouchers = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//     return (
//         <>
//             <Modal
//                 visible={isModalVisible}
//                 width={1000}
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="cancel" onClick={handleCancel}>
//                         Đóng
//                     </Button>,
//                 ]}
//             >
//                 <h2 style={{ textAlign: "center" }}>Danh sách sản phẩm</h2>
//                 <Row style={{ border: '1px solid while', padding: '15px', height: "280px", overflow: "auto" }}>
//                     {slicedVouchers.map(product => (
//                         <Col span={12} key={product.id}>
//                             <div style={{
//                                 margin: '10px',
//                                 border: '1px solid #ccc',
//                                 padding: '10px',
//                                 marginBottom: '10px',
//                                 backgroundColor: '',
//                                 borderRadius: '5px',
//                                 boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
//                                 position: 'relative',
//                                 height: "100px"
//                             }}>
//                                 <Row>
//                                     <Col span={8}>
//                                         <div style={{ width: "150px", backgroundColor: '#f0f0f0', height: "75px" }} />
//                                     </Col>
//                                     <Col span={16} style={{ position: 'relative' }}>
//                                         <div style={{ position: 'absolute', top: 40, right: 0, transform: 'translateY(-50%)' }}>
//                                             Tên sản phẩm: {product.name}
//                                         </div>
//                                     </Col>
//                                 </Row>
//                                 <div style={{
//                                     position: 'absolute',
//                                     bottom: '5px',
//                                     right: '10px',
//                                     fontStyle: 'italic'
//                                 }}>
//                                     <Button type="primary" onClick={() => handleFavoriteClick(product.id)}>Yêu thích</Button>
//                                 </div>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//                 <Pagination
//                     style={{ textAlign: 'center', marginTop: '10px' }}
//                     current={currentPage}
//                     total={data.length}
//                     pageSize={pageSize}
//                     onChange={handlePageChange}
//                     onShowSizeChange={handlePageSizeChange}
//                     showSizeChanger
//                     pageSizeOptions={['4', '8', '16', '32']}
//                     showTotal={(record) => `Tổng ${record} sản phẩm`}
//                 />
//             </Modal>
//         </>
//     );
// };


// export default Favorite;