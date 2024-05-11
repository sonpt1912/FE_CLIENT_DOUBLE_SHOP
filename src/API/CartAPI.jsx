import axiosClient from "./axiosClient";

const CartAPI = {
  Get_Cart: (data) => {
    const url = `/cart/get-product-from-cart`;
    return axiosClient.post(url, data);
  },

  Add_Product_To_Cart: (data) => {
    const url = "/cart/add-product-to-cart";
    return axiosClient.post(url, data);
  },

  Update_Quantity_Product: (data) => {
    const url = "/cart/update-cart";
    return axiosClient.post(url, data);
  },

  Put_Cart: (query) => {
    const url = `/api/Cart${query}`;
    return axiosClient.put(url);
  },

  Delete_Cart: (id) => {
    const url = `cart/delete-product-from-cart`;
    return axiosClient.post(url, id);
  },
};

export default CartAPI;
