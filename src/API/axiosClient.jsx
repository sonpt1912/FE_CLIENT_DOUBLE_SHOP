    // api/axiosClient.js
    import axios from 'axios';
    import queryString from 'query-string';
    // Set up default config for http requests here
    // Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
    const axiosClient = axios.create({
        baseURL: 'http://localhost:8071',
    });
    axiosClient.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        }
      );
    axiosClient.interceptors.response.use((response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, (error) => {
        // Handle errors
        throw error;
    });
    export default axiosClient;