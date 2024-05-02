import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import Product from '../API/Product';
import { Link, useParams } from 'react-router-dom';
import Products from './Component/Products';
import Pagination from './Component/Pagination';
import Search from './Component/Search';

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
        count: '9',
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
                const requestBody = { page: value - 1, pageSize: newPageSize }; // Sử dụng pageSize mới
                console.log(requestBody);
                const response = await Product.Get_All_Product(requestBody);
                console.log(response);
    
                setProducts(response.listData);
                setTotalRecord(response.totalRecord);
                setTotalPage(Math.ceil(response.totalRecord / 9));
                setPageSize(newPageSize);
                setCurrentPage(value)
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
            
    };
    const calculatePageSize = (currentPage) => {
        // Nếu chuyển về trang đầu tiên, đặt lại pageSize về 9
        if (currentPage === 1) {
            return 9;
        } else {
            // Tính toán số lượng phần tử cần hiển thị trong trang hiện tại
            const startIndex = (currentPage - 1) * pageSize;
            const remainingItems = totalRecord - startIndex;
            return Math.min(pageSize, remainingItems);
        }
    };
    

    useEffect(() => {
        // Set trang mặc định khi mới vào
        setPagination(prevPagination => ({
            ...prevPagination,
            page: '1'
        }));
        // Gọi hàm xử lý khi trang thay đổi
        handlerChangePage(1);
        // Gọi fetchData để lấy dữ liệu
        fetchData();
    }, []);
    
    const [images, setImages] = useState([]);

    const fetchData = async () => {
        try {
            const requestBody = { page: currentPage - 1, pageSize };
            console.log(requestBody);
            const response = await Product.Get_All_Product(requestBody);

          
            // Trích xuất danh sách URL hình ảnh từ phản hồi



            // Cập nhật trạng thái dựa trên phản hồi
            setProducts(response.listData);
            setTotalRecord(response.totalRecord);
            setTotalPage(Math.ceil(response.totalRecord / 9)); // Phép tính đã được sửa
        } catch (error) {
            // Xử lý lỗi
            console.error('Lỗi khi tải sản phẩm:', error);
            // Tuỳ chọn, bạn có thể cập nhật trạng thái để biểu thị lỗi
            // setProducts([]);
            // setTotalRecord(0);
            // setTotalPage(0);
        }
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
    const handler_Search = (value) => {
        console.log("Search: ", value)

        setPagination({
            page: pagination.page,
            count: pagination.count,
            search: value,
            category: pagination.category
        })

    }


    const handleCategoryChange = (selectedCategoryId) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        console.log("Selected Category ID:", selectedCategoryId);
        // Thực hiện các hành động khác tại đây
    }
    const handleBrandChange = (selectedCategoryId) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        console.log("Selected Category ID:", selectedCategoryId);
        // Thực hiện các hành động khác tại đây
    }
    const handleMaterialChange = (selectedCategoryId) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        console.log("Selected Category ID:", selectedCategoryId);
        // Thực hiện các hành động khác tại đây
    }
    const handleCollarChange = (selectedCategoryId) => {
        // Thực hiện các hành động khi danh mục được chọn thay đổi, ví dụ: đổi route, gọi API để lấy sản phẩm, v.v.
        console.log("Selected Category ID:", selectedCategoryId);
        // Thực hiện các hành động khác tại đây
    }
    const [selectedColor, setSelectedColor] = useState('All');
    const handleColorChange = (color) => {
        setSelectedColor(color); // Cập nhật nút được chọn
        // Gọi hàm xử lý các thay đổi liên quan đến nút được chọn
    };
    const [selectedSize, setSelectedSize] = useState('All');
    const handleSizeChange = (size) => {
        setSelectedSize(size); // Cập nhật nút được chọn
        // Gọi hàm xử lý các thay đổi liên quan đến nút được chọn
    };


    return (
        <div >
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Shop</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="li-main-blog-page li-main-blog-details-page pt-20 pb-60 pb-sm- pb-xs-45" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className="li-blog-sidebar-wrapper">
                                <div className="li-blog-sidebar">
                                    <div className="li-sidebar-search-form">
                                        <Search handler_Search={handler_Search} />
                                    </div>
                                </div>
                                <div className="li-blog-sidebar pt-25">
                                    <h4 className="li-blog-sidebar-title" style={{ marginBottom: '25px' }}>SHOP NAVIGATION</h4>

                                </div>

                                <div className="li-blog-sidebar pt-25" >
                                    <h4 className="li-blog-sidebar-title"  >Category</h4>
                                    <ul className="li-blog-archive">

                                    </ul>

                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleCategoryChange(e.target.value)} >
                                            <option value="">All</option>
                                            <option value="fake1">Fake Cate 1</option>
                                            <option value="fake2">Fake Cate 2</option>
                                            <option value="fake3">Fake Cate 3</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Brand</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleBrandChange(e.target.value)} >
                                            <option value="">All</option>
                                            <option value="fake1">Fake Brand 1</option>
                                            <option value="fake2">Fake Brand 2</option>
                                            <option value="fake3">Fake Brand 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Collar</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleCollarChange(e.target.value)} >
                                            <option value="">All</option>
                                            <option value="fake1">Fake Collar 1</option>
                                            <option value="fake2">Fake Collar 2</option>
                                            <option value="fake3">Fake Collar 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Material</h4>
                                    <ul className="li-blog-archive">

                                    </ul>
                                    <div className="select-wrapper" style={{ marginBottom: '25px' }}>
                                        <select className="category-select" onChange={(e) => handleMaterialChange(e.target.value)} >
                                            <option value="">All</option>
                                            <option value="fake1">Fake Material 1</option>
                                            <option value="fake2">Fake Material 2</option>
                                            <option value="fake3">Fake Material 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Color</h4>
                                    <ul className="li-blog-archive">
                                    </ul>
                                    <div className="button-wrapper" style={{ marginBottom: '25px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <button
                                            className={`color-button ${selectedColor === 'All' ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là All
                                            onClick={() => handleColorChange('All')}
                                            style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                        >
                                            All
                                        </button>
                                        {["Color 1", "Color 2", "Color 3", "Color 4", "Color 5"].map((color, index) => (
                                            <button
                                                key={index}
                                                className={`color-button ${selectedColor === color ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là brand
                                                onClick={() => handleColorChange(color)}
                                                style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Size</h4>
                                    <ul className="li-blog-archive">
                                    </ul>
                                    <div className="button-wrapper" style={{ marginBottom: '25px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <button
                                            className={`color-button ${selectedSize === 'All' ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là All
                                            onClick={() => handleColorChange('All')}
                                            style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                        >
                                            All
                                        </button>
                                        {["Size 1", "Size 2", "Size 3", "Size 4"].map((size, index) => (
                                            <button
                                                key={index}
                                                className={`color-button ${selectedSize === size ? 'active' : ''}`} // Áp dụng lớp active nếu nút được chọn là brand
                                                onClick={() => handleSizeChange(size)}
                                                style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', cursor: 'pointer' }}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>



                            </div>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            <div className="shop-top-bar">
                                <div className="product-select-box">
                                    <div className="product-short">
                                        <h1>Product</h1>

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
                                                            <div className="product-content">
                                                                <h3>{product.name}</h3>
                                                                <div className="product-details">
                                                                    <div className="detail">
                                                                        <span>Brand:</span>
                                                                        <span>{product.brand.name}</span>
                                                                    </div>
                                                                    <div className="detail">
                                                                        <span>Category:</span>
                                                                        <span>{product.category.name}</span>
                                                                    </div>
                                                                    <div className="detail">
                                                                        <span>Material:</span>
                                                                        <span>{product.material.name}</span>
                                                                    </div>
                                                                    <div className="detail">
                                                                        <span>Collar:</span>
                                                                        <span>{product.collar.name}</span>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="paginatoin-area">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <p>Total products: {totalRecord}</p>
                                                {/* <p>Page: {pagination.page}</p> */}
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                {Array.from({ length: totalPage }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handlerChangePage(index + 1)}
                                                        className={pagination.page === index + 1 ? "pagination-button current-page" : "pagination-button"}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
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