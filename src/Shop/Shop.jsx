import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import Product from '../API/Product';
import { Link, useParams } from 'react-router-dom';
import Products from './Component/Products';
import Pagination from './Component/Pagination';
import Search from './Component/Search';
import axios from 'axios';
Shop.propTypes = {

};

function Shop(props) {

    const { id } = useParams()

    const [products, setProducts] = useState([])

    //Tổng số trang
    const [totalPage, setTotalPage] = useState()

    //Từng trang hiện tại
    const [pagination, setPagination] = useState({
        page: '1',
        pageSize: '9',
        search: '',
        category: id
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    //Hàm này dùng để thay đổi state pagination.page
    //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
    const handlerChangePage = async (value) => {
        // Kiểm tra xem giá trị mới có phải là một số nguyên không
        const newPageSize = calculatePageSize(value);

        // Cập nhật trạng thái của phân trang
        setPagination(prevPagination => ({
            ...prevPagination,
            page: value,

        }));
        try {
            setLoading(true)
            const requestBody = { page: value - 1, pageSize: newPageSize, idBrand: selectedBrand, idCategory: selectedCategory, idCollar: selectedCollar, idMaterial: selectedMaterial }; // Sử dụng pageSize mới
            console.log(requestBody);
            const response = await Product.Get_All_Product(requestBody);
            console.log(response);

            setProducts(response.listData);
            // setTotalRecord(response.totalRecord);
            setTotalPage(Math.ceil(response.totalRecord / pagination.pageSize));
            setPageSize(pagination.pageSize);
            setCurrentPage(value)
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
        } finally {
            setLoading(false); // Đặt trạng thái loading là false khi kết thúc gọi API
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const calculatePageSize = (currentPage) => {
        // Nếu chuyển về trang đầu tiên, đặt lại pageSize về 9
        // if (currentPage === 1) {
        //     return 9;
        // } else {
        // Tính toán số lượng phần tử cần hiển thị trong trang hiện tại
        const startIndex = (currentPage - 1) * pageSize;
        const remainingItems = totalRecord - startIndex;
        return Math.min(pageSize, remainingItems);
        // }
    };

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // setPagination(prevPagination => ({
        //     ...prevPagination,
        //     page: '1'
        // }));
        // handlerChangePage(1);
        fetchData();
    }, []);

    const [images, setImages] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const requestBody = { page: currentPage - 1, pageSize };
            console.log(requestBody);
            const response = await Product.Get_All_Product(requestBody);


            // Trích xuất danh sách URL hình ảnh từ phản hồi



            // Cập nhật trạng thái dựa trên phản hồi
            setProducts(response.listData);
            setTotalRecord(response.totalRecord);
            setTotalPage(Math.ceil(response.totalRecord / pagination.pageSize)); // Phép tính đã được sửa
        } catch (error) {
            // Xử lý lỗi
            console.error('Lỗi khi tải sản phẩm:', error);
            // Tuỳ chọn, bạn có thể cập nhật trạng thái để biểu thị lỗi
            // setProducts([]);
            // setTotalRecord(0);
            // setTotalPage(0);
        } finally {
            setLoading(false); // Đặt trạng thái loading là false khi kết thúc gọi API
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Cập nhật trang hiện tại khi chuyển trang
    };
    const [totalRecord, setTotalRecord] = useState(0);

    // useEffect(() => {

    //     const fetchData = async () => {

    //         const params = {
    //             page: pagination.page,
    //             count: pagination.count,
    //             search: pagination.search,
    //             category: id
    //         }

    //         const query = '?' + queryString.stringify(params)

    //         const response = await Product.Get_Pagination(query)
    //         console.log(response)

    //         setProducts(response)


    //         const params_total_page = {
    //             id_category: id
    //         }

    //         const query_total_page = '?' + queryString.stringify(params_total_page)

    //         const response_total_page = await Product.Get_Category_Product(query_total_page)

    //         const totalPage = Math.ceil(parseInt(response_total_page.length) / parseInt(pagination.count))
    //         console.log(totalPage)



    //     }

    //     fetchData()

    // }, [id])

    // useEffect(() => {

    //     const fetchData = async () => {

    //         const params = {
    //             page: pagination.page,
    //             count: pagination.count,
    //             search: pagination.search,
    //             category: id
    //         }

    //         const query = '?' + queryString.stringify(params)

    //         const response = await Product.Get_Pagination(query)
    //         console.log(response)

    //         setProducts(response)

    //     }

    //     fetchData()

    // }, [pagination])


    const [male, set_male] = useState([])
    const [female, set_female] = useState([])


    // useEffect(() => {

    //     const fetchData = async () => {


    //         const params_male = {
    //             gender: 'male'
    //         }

    //         const query_male = '?' + queryString.stringify(params_male)

    //         const response_male = await Product.Get_Category_Gender(query_male)

    //         set_male(response_male)


    //         const params_female = {
    //             gender: 'female'
    //         }

    //         const query_female = '?' + queryString.stringify(params_female)

    //         const response_female = await Product.Get_Category_Gender(query_female)

    //         set_female(response_female)

    //     }

    //     fetchData()

    // }, [])

    // useEffect(() => {
    //     const fakeData = []
    //     for (let i = 0; i < 9; i++) {
    //         fakeData.push({
    //             _id: `product_${i}`,
    //             name: `Product ${i}`,
    //             image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU`,
    //             price: Math.floor(Math.random() * 1000) + 1
    //         })
    //     }
    //     setProducts(fakeData)
    //     setTotalPage(1)
    // }, [id])

    const fetchProductsFromApi = async (requestBody) => {

        try {
            setLoading(true);
            // Gọi API search và truyền requestBody
            const response = await axios.post('http://localhost:8071/public/product/get-all-by-condition', requestBody);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Ném lỗi để bắt ở nơi gọi hàm fetchProductsFromApi
        }
        finally {
            setLoading(false); // Đặt trạng thái loading là false khi kết thúc gọi API
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handler_Search = async () => {


        try {
            setLoading(true)
            const requestBody = {
                idBrand: selectedBrand, // Thay selectedBrand bằng giá trị id brand hiện tại
                idCategory: selectedCategory, // Thay selectedCategory bằng giá trị id category hiện tại
                idMaterial: selectedMaterial, // Thay selectedMaterial bằng giá trị id material hiện tại
                idCollar: selectedCollar,
                idColor: selectedColor,
                idSize: selectedSize,
                page: 0,
                // pagination.page - 1,
                pageSize: 9
                //  pagination.pageSize,

            };
            console.log(requestBody)
            const response = await fetchProductsFromApi(requestBody);
            console.log(response);
            setPagination(prevPagination => ({
                ...prevPagination,
                page: 1,

            }));
            setProducts(response.listData);
            setPageSize(pagination.pageSize)
            setTotalRecord(response.totalRecord);
            setTotalPage(Math.ceil(response.totalRecord / pagination.pageSize));
        } catch (error) {
            console.error('Error searching products:', error);
        }
        finally {
            setLoading(false); // Đặt trạng thái loading là false khi kết thúc gọi API
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brand, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [color, setColor] = useState([]);
    const [collar, setCollar] = useState([]);
    const [selectedCollar, setSelectedcollar] = useState('');
    const [material, setMaterial] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [size, setSize] = useState([]);
    useEffect(() => {
        const apiCalls = [
            fetchCategoriesFromApi(),
            fetchBrandFromApi(),
            fetchCollarFromApi(),
            fetchColorFromApi(),
            fetchMaterialFromApi(),
            fetchSizeFromApi()
        ];

        Promise.all(apiCalls)
            .then(([categories, brand, collar, color, material, size]) => {
                setCategories(categories);
                setBrand(brand);
                setCollar(collar);
                setColor(color);
                setMaterial(material);
                setSize(size);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchCategoriesFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/category/get-all-category');
            console.log(response);
            return response.data; // Giả sử danh sách các loại sản phẩm được trả về dưới dạng mảng categories
        } catch (error) {
            console.error('Error fetching categories:', error);
            return []; // Trả về một mảng rỗng nếu có lỗi
        }
    };

    const fetchBrandFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/brand/get-all-brand');
            console.log(response);
            return response.data; // Giả sử danh sách các loại sản phẩm được trả về dưới dạng mảng categories
        } catch (error) {
            console.error('Error fetching categories:', error);
            return []; // Trả về một mảng rỗng nếu có lỗi
        }
    };
    const fetchCollarFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/collar/get-all-collar');
            console.log(response);
            return response.data; // Giả sử danh sách các loại sản phẩm được trả về dưới dạng mảng categories
        } catch (error) {
            console.error('Error fetching categories:', error);
            return []; // Trả về một mảng rỗng nếu có lỗi
        }
    };

    const fetchMaterialFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/material/get-all-material');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };
    const fetchSizeFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/size/get-all-size');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };
    const fetchColorFromApi = async () => {
        try {
            const response = await axios.get('http://localhost:8071/color/get-all-color');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    };
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        // Thực hiện các hành động khác khi loại sản phẩm được chọn thay đổi
    };
    const handleBrandChange = (value) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        setSelectedBrand(value);
        // Thực hiện các hành động khác tại đây
    }
    const handleMaterialChange = (value) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        setSelectedMaterial(value);
        // Thực hiện các hành động khác tại đây
    }
    const handleCollarChange = (value) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        setSelectedcollar(value);
        // Thực hiện các hành động khác tại đây
    }
    const [selectedColor, setSelectedColor] = useState('');
    const handleColorChange = (value) => {

        setSelectedColor(value);

    };
    const [selectedSize, setSelectedSize] = useState('');
    const handleSizeChange = (value) => {
        setSelectedSize(value);

    };


    return (

        <div >

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Trang chủ</a></li>
                            <li className="active">Cửa hàng</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="li-main-blog-page li-main-blog-details-page pt-20 pb-60 pb-sm- pb-xs-45" >


                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className="li-blog-sidebar-wrapper">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {loading && <div className="loading-spinner"></div>}
                                </div>

                                <div className="li-blog-sidebar pt-25">

                                    <h4 className="li-blog-sidebar-title" style={{ marginBottom: '25px', fontSize: '20px' }}>DANH SÁCH SẢN PHẨM</h4>

                                </div>

                                <div className="li-blog-sidebar pt-25" >
                                    <h4 className="li-blog-sidebar-title"  >Loại sản phẩm</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleCategoryChange(e.target.value)}>
                                            <option value="">Tất cả</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Thương hiệu</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleBrandChange(e.target.value)} >
                                            <option value="">Tất cả</option>
                                            {brand.map(brand => (
                                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Cổ áo</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleCollarChange(e.target.value)} >
                                            <option value="">Tất cả</option>
                                            {collar.map(collar => (
                                                <option key={collar.id} value={collar.id}>{collar.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Chất liệu</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleMaterialChange(e.target.value)} >
                                            <option value="">Tất cả</option>
                                            {material.map(material => (
                                                <option key={material.id} value={material.id}>{material.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>



                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Màu sắc</h4>
                                    <ul className="li-blog-archive">
                                    </ul>
                                    <div className="button-wrapper" style={{ marginBottom: '25px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <button
                                            className={`color-button ${selectedColor === '' ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là All
                                            onClick={() => handleColorChange('')}
                                            style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                        >
                                            Tất cả
                                        </button>
                                        {color.map((item) => ( // Sử dụng mỗi item trong color như key thay vì index
                                            <button
                                                key={item.id} // Sử dụng item.name hoặc một thuộc tính duy nhất khác của item như key
                                                className={`color-button ${selectedColor === item.id ? 'active' : ''}`}
                                                onClick={() => handleColorChange(item.id)}
                                                style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Kích cỡ</h4>
                                    <ul className="li-blog-archive">
                                    </ul>
                                    <div className="button-wrapper" style={{ marginBottom: '25px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <button
                                            className={`color-button ${selectedSize === '' ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là All
                                            onClick={() => handleSizeChange('')}
                                            style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                        >
                                            Tất cả
                                        </button>
                                        {size.map((item) => ( // Sử dụng mỗi item trong color như key thay vì index
                                            <button
                                                key={item.id} // Sử dụng item.name hoặc một thuộc tính duy nhất khác của item như key
                                                className={`color-button ${selectedSize === item.id ? 'active' : ''}`}
                                                onClick={() => handleSizeChange(item.id)}
                                                style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                {/* <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Tìm kiếm theo trang</h4>
                                    <div className="page-input">
                                        <label htmlFor="page">Trang:</label>
                                        <input
                                            type="number"
                                            id="page"
                                            name="page"
                                            value={pagination.page}
                                            onChange={(e) => setPagination({ ...pagination, page: e.target.value })}
                                            min="1"
                                            max={totalPage}
                                        />
                                    </div>
                                    <div className="page-input">
                                        <label htmlFor="pageSize">Số sản phẩm/trang:</label>
                                        <input
                                            type="number"
                                            id="pageSize"
                                            name="pageSize"
                                            value={pagination.pageSize}
                                            onChange={(e) => setPagination({ ...pagination, pageSize: e.target.value })}
                                            min="1"
                                            max="9"
                                        />
                                    </div>
                                   
                                </div> */}

                                <div className="li-blog-sidebar" style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                                    <div className="search-wrapper">
                                        <button
                                            onClick={handler_Search}
                                            className="search-button"
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: '#fff',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseEnter={(event) => event.target.style.backgroundColor = '#0056b3'} // Khi di chuột vào nút
                                            onMouseLeave={(event) => event.target.style.backgroundColor = '#007bff'} // Khi di chuột ra khỏi nút
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px' }}>
                                    {loading && <div className="loading-spinner"></div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            <div className="shop-top-bar">
                                <div className="product-select-box">
                                    <div className="product-short">
                                        <h1>Sản phẩm</h1>

                                    </div>
                                </div>
                            </div>
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane active" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {products.map(product => (
                                                    <div className="col-lg-4 col-md-6" key={product.id}>
                                                        <div className="single-product-wrap">
                                                            <div className="product-image">
                                                                <Link to={`/detail/${product.id}`}>

                                                                    {product.listImages && product.listImages.resources.length > 0 ? (
                                                                        // Sử dụng URL của hình ảnh đầu tiên trong mảng resources
                                                                        <img src={product.listImages.resources[0].url} alt={product.name} />
                                                                    ) : (
                                                                        // Nếu không có hình ảnh, bạn có thể cung cấp một URL mặc định hoặc hình ảnh thay thế
                                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JDQLmn016pSYDwyLcHbpA88Wk83h0nd2szdavgNzc0jWSE3tUL3WldrxFkjJ9YvuheM&usqp=CAU" alt={product.name} />
                                                                    )}

                                                                </Link>
                                                            </div>
                                                            <div className="product-content" style={{ marginTop: '10px' }}>
                                                                <h3>{product.name}</h3>
                                                                <div className="product-details">
                                                                    <div className="detail">
                                                                        <span>Thương hiệu : </span>
                                                                        <span> {product.brand.name}</span>
                                                                    </div>
                                                                    <div className="detail">
                                                                        <span>Loại sản phẩm : </span>
                                                                        <span> {product.category.name}</span>
                                                                    </div>
                                                                    <div className="detail">
                                                                        <span>Chất liệu : </span>
                                                                        <span> {product.material.name}</span>
                                                                    </div>
                                                                    <div className="detail" style={{ marginBottom: '10px' }}>
                                                                        <span>Cổ áo : </span>
                                                                        <span> {product.collar.name}</span>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="pagination-area" style={{paddingTop:'50px'}}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <p>Tổng số sản phẩm: {totalRecord}</p>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    {Array.from({ length: totalPage }, (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handlerChangePage(index + 1)}
                                                            className={pagination.page === index + 1 ? "pagination-button current-page" : "pagination-button"}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    ))}
                                                    {totalPage > 1 && ( // Chỉ hiển thị input khi có nhiều hơn 1 trang
                                                        <React.Fragment>
                                                            <span style={{ marginRight: '10px' }}>Trang: </span>
                                                            <input
                                                                type="number"
                                                                value={pagination.page}
                                                                onChange={(e) => {
                                                                    const pageNumber = parseInt(e.target.value);
                                                                    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPage) {
                                                                        handlerChangePage(pageNumber);
                                                                    }
                                                                }}
                                                                style={{ width: '50px' }}
                                                            />
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Shop;