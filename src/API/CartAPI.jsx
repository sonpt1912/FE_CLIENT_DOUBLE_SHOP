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

  Delete_Cart: (id) => {
    const url = `cart/delete-product-from-cart`;
    return axiosClient.post(url, id);
  },

  Create_Bill: (data) => {
    const url = "/bill/create-bill";
    return axiosClient.post(url, data);
  },

  Create_Payment_Link: (data) => {
    const url = "/payment/create-payment-link";
    return axiosClient.post(url, data);
  },

  Check_Payment_Link: (data) => {
    const url = "/payment/check-payment";
    return axiosClient.post(url, data);
  },

  Get_Voucher: () => {
    const url = "/customer/get-voucher-by-user-login";
    return axiosClient.post(url);
  },

  Get_Shipping_Fee : (data) => {
    const url = "/ghn/get-shipping-fee";
    return axiosClient.post(url, data);
  }

};

export default CartAPI;
