import axiosClient from './axiosClient'

const Product = {

    Get_All_Product: (requestBody) => {
        const url = '/public/product/get-all-by-condition'
        return axiosClient.post(url,requestBody)
    },

    Get_Category_Product: (query) => {
        const url = `/api/Product/category${query}`
        return axiosClient.get(url)
    },

    Get_Detail_Product: (id) => {
        const url = `/public/product/get-product?id=${id}`
        return axiosClient.get(url)
    },

    Get_Detail_Product_Detail: (params) => {
        const url = `/public/product/get-detail-product-by-product`
        return axiosClient.post(url, params)
    },

    Get_Detail_Product_Size: (params) => {
        const url = `public/size/get-all-by-conditoin`
        return axiosClient.post(url, params)
    },
    Get_Detail_Product_Color: (id) => {
        const url = `/public/color/get-all-color-by-condition`
        return axiosClient.post(url,id)
    },

    Get_Category_Gender: (query) => {
        const url = `/api/Product/category/gender${query}`
        return axiosClient.get(url)
    },

    Get_Pagination: (query) => {
        const url = `/api/Product/category/pagination${query}`
        return axiosClient.get(url)
    },

    get_search_list: (query) => {
        const url = `/api/Product/scoll/page${query}`
        return axiosClient.get(url)
    }

}

export default Product