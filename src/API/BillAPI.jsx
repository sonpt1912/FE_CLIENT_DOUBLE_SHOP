import axiosClient from "./axiosClient";

const BillAPI = {
  Get_Bill_All: (data) => {
    const url = `/bill/get-bill-by-condition`;
    return axiosClient.post(url, data);
  },
  Get_Bill_By_Id: (data) => {
    const url = `/bill/get-bill-by-id`;
    return axiosClient.post(url, data);
  },
  Get_Detail_Bill: (data) => {
    const url = `/bill/get-detail-bill`;
    return axiosClient.post(url, data);
  },
  Get_History_Bill: (data) => {
    const url = `/bill/get-bill-history`;
    return axiosClient.post(url, data);
  },
  Get_Address_Bill: () => {
    const url = `/customer/get-all-address`;
    return axiosClient.get(url);
  },
  Update_Bill: (data) => {
    const url = `/bill/update-bill`;
    return axiosClient.post(url, data);
  },

  Choose_Voucher: (data) => {
    const url = `/public/customer-voucher/check`;
    return axiosClient.post(url, data);
  }
};

export default BillAPI;
