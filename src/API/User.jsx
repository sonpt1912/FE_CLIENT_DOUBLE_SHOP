import axios from "axios";
import axiosClient from "./axiosClient";

const User = {
  Get_All_User: () => {
    const url = "/api/User";
    return axiosClient.get(url);
  },

  Get_User: (id) => {
    const url = `/api/User/${id}`;
    return axiosClient.get(url);
  },

  Put_User: (data) => {
    const url = `/api/User`;
    return axiosClient.put(url, data);
  },

  Get_Detail_User: (data) => {
    const url = `/auth/login`;
    return axiosClient.post(url, data);
  },

  Post_Register: (data) => {
    const url = `/auth/register`;
    return axiosClient.post(url, data);
  },

  Get_Check_Email_User: (data) => {
    const url = `/auth/send-top-forgot-password`;
    return axiosClient.post(url, data);
  },

  Forgot_Password_User: (data) => {
    const url = `/auth/reset-password`;
    return axiosClient.post(url, data);
  },

  Post_User: (data) => {
    const url = "/api/User";
    return axiosClient.post(url, data);
  },

  
};

export default User;
