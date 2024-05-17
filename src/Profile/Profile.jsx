import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  Button,
  Modal,
  Input,
  Select,
  Form,
  Popconfirm,
  message,
  Row,
  Pagination,
  Col,
} from "antd";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { SearchOutlined } from "@ant-design/icons";
import Bill from "./Bill/Bill";

const { Search } = Input;
Profile.propTypes = {};

function Profile(props) {
  const [form] = Form.useForm();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [ngo, setNgo] = useState("");
  const [description, setDescription] = useState("");
  const [defaul, setDefaul] = useState(1);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState("");
  const [idAdd, setIdAdd] = useState("");
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [disData, setDisData] = useState([]);
  const [selectedDis, setSelectedDis] = useState("");
  const [selectedWar, setSelectedWar] = useState("");
  const [warData, setWarData] = useState([]);

  // const handleCityChange = (value) => {
  //     setSelectedCity(value);
  //     const selectedCityCode = cityData.find(city => city.value === value)?.value;
  //     const selectedCityName = cityData.find(city => city.value === value)?.label;
  //     setCity(selectedCityName);
  //     dataDis(selectedCityCode);
  //     setSelectedDis("");
  // };

  // const handleDisChange = (value) => {
  //     setSelectedDis(value);
  //     const selectedDisCode = disData.find(dis => dis.value === value)?.value;
  //     const selectedDisName = disData.find(dis => dis.value === value)?.label;
  //     setDistrict(selectedDisName);

  //     dataWar(selectedDisCode);
  //     setSelectedWar("");
  // };

  // const handleWarChange = (value) => {
  //     setSelectedWar(value);
  //     const selectedWarName = warData.find(war => war.value === value)?.label;
  //     setWard(selectedWarName);
  // };

  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;

  //     if (name === "city") {
  //         setCity(value);
  //     } else if (name === "dis") {
  //         selectedDis(value);
  //     } else if (name === "war") {
  //         setWard(value);
  //     } else if (name === "ngo") {
  //         setNgo(value);
  //     } else if (name === "description") {
  //         setDescription(value);

  //     } else if (name === "defaul") {
  //         setDefaul(parseInt(value));
  //     }

  // };

  const header = {
    headers: {
      Token: "81e2108c-e9c6-11ee-b1d4-92b443b7a897",
    },
  };
  const dataCity = async () => {
    try {
      const response = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        header
      );

      setCityData(
        response.data.data.map((city) => ({
          label: city.ProvinceName,
          value: city.ProvinceID,
        }))
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const dataDis = async (selectedCityCode) => {
    try {
      const requestData = {
        province_id: selectedCityCode,
      };

      const response = await axios.post(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        requestData,
        header
      );

      setDisData(
        response.data.data.map((city) => ({
          label: city.DistrictName,
          value: city.DistrictID,
        }))
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
  const dataWar = async (selectedDisCode) => {
    try {
      const requestData1 = {
        district_id: selectedDisCode,
      };
      console.log(selectedDisCode);
      const response = await axios.post(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`,
        requestData1,
        header
      );
      setWarData(
        response.data.data.map((city) => ({
          label: city.WardName,
          value: city.WardCode,
        }))
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
    const selectedCityCode = cityData.find(
      (city) => city.value === value
    )?.value;
    const selectedCityName = cityData.find(
      (city) => city.value === value
    )?.label;
    setCity(selectedCityName);
    dataDis(selectedCityCode);
    setSelectedDis("");
  };

  const handleDisChange = (value) => {
    setSelectedDis(value);
    const selectedDisCode = disData.find((dis) => dis.value === value)?.value;
    const selectedDisName = disData.find((dis) => dis.value === value)?.label;
    setDistrict(selectedDisName);

    dataWar(selectedDisCode);
    setSelectedWar("");
  };

  const handleWarChange = (value) => {
    setSelectedWar(value);
    const selectedWarName = warData.find((war) => war.value === value)?.label;
    setWard(selectedWarName);
  };

  useEffect(() => {
    dataCity();
  }, []);
  const [des, setDes] = useState("");
  const handleInputChange = (value) => {
    // const { name, value } = e.target;

    // if (name === "city") {
    //     setCity(value);
    // } else if (name === "dis") {
    //     selectedDis(value);
    // } else if (name === "war") {
    //     setWard(value);
    // } else if (name === "ngo") {
    //     setNgo(value);
    // }

    setDes(value);
  };
  const Diachi = {
    city: "",
    district: "",
    province: "",
    description: "",
  };
  const handleCityChange1 = async (value) => {
    setSelectedCity(value);
    console.log(value);
    const selectedCityCode = cityData.find(
      (city) => city.value === value
    )?.value;
    const selectedCityName = cityData.find(
      (city) => city.value === value
    )?.label;
    console.log(selectedCityCode);
    console.log(selectedCityName);
    setCity(selectedCityName);
    Diachi.city = selectedCityName;
    setEditAddress(Diachi);

    setSelectedDis("");
    setSelectedWar("");
    setDistrict("");
    setWard("");
    try {
      const requestData = {
        province_id: value,
      };

      const response = await axios.post(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        requestData,
        header
      );

      setDisData(
        response.data.data.map((city) => ({
          label: city.DistrictName,
          value: city.DistrictID,
        }))
      );
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handleDisChange1 = async (value) => {
    setSelectedDis(value);

    const selectedDisCode = disData.find((dis) => dis.value === value)?.value;
    const selectedDisName = disData.find((dis) => dis.value === value)?.label;
    if (selectedDisCode && selectedDisName) {
      setDistrict(selectedDisName);
      Diachi.district = selectedDisName; // Lưu giá trị vào Diachi
      Diachi.city = city; // Reset giá trị của province
      setEditAddress(Diachi);

      setSelectedWar("");
      try {
        const requestData1 = {
          district_id: value,
        };
        const response = await axios.post(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`,
          requestData1,
          header
        );
        setWarData(
          response.data.data.map((city) => ({
            label: city.WardName,
            value: city.WardCode,
          }))
        );
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }
  };

  const handleWarChange1 = (value) => {
    setSelectedWar(value);
    const selectedWarName = warData.find((war) => war.value === value)?.label;
    const selectedWarCode = warData.find((war) => war.value === value)?.value;
    if (selectedWarName && selectedWarCode) {
      setWard(selectedWarName);
      Diachi.province = selectedWarName;
      Diachi.city = city;
      Diachi.district = district;
      setEditAddress(Diachi);
    }
  };

  const handleInputChange1 = (value) => {
    // Đặt mô tả mới
    setDescription(value);
    console.log(description);

    // Tạo một bản sao của địa chỉ hiện tại
    const updatedAddress = { ...editAddress };

    // Cập nhật mô tả trong bản sao
    updatedAddress.description = value;

    // Đặt bản sao đã cập nhật vào state
    setEditAddress(updatedAddress);
  };

  // Hàm này dùng để render html cho từng loại edit profile hoặc change password
  // Tùy theo người dùng chọn



  const [edit_status, set_edit_status] = useState("thong_tin_ca_nhan");
  const [showDangXuat, setShowDangXuat] = useState(false);

  const handler_Status = (value) => {
    set_edit_status(value);
  };

  const showModalDX = () => {
    setShowDangXuat(true);
  };

  const toggleModal = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const huyDangXuat = () => {
    setShowDangXuat(false);
  };
  useEffect(() => {
    const storedStatus = localStorage.getItem('edit_status_checkout');
    if (storedStatus) {
      set_edit_status(JSON.parse(storedStatus));
      localStorage.removeItem('edit_status_checkout');
    }
  }, []);
  const [user, set_user] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi khác
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8071/customer/check-address-defaul", null, {
        headers,
      })
      .then((response) => {
        console.log("Address default check result:", response.data);
        // Xử lý kết quả nếu cần
      })
      .catch((error) => {
        console.error("Error checking default address:", error);
        // Xử lý lỗi nếu cần
      });
  }, []);
  const [gender, setGender] = useState("");
  const [birthday, setBirthDay] = useState([]);
  const [status, setStatus] = useState("");

  const [userData, setUserData] = useState(null);
  const [addedAddress, setAddedAddress] = useState(false);

  const fetchUserData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8071/customer/user-info",
        {},
        { headers }
      );
      console.log(response);
      setUserData(response.data);
      setCreatedBy(response.data.createdBy);
      setCreatedTime(response.data.createdTime);
      set_name(response.data.name);
      set_username(response.data.username);
      setGender(response.data.gender);
      setBirthDay(response.data.birthDay);
      set_password(response.data.password);
      setStatus(response.data.status);
      set_email(response.data.email);
      set_sdt(response.data.phone);
      setId(response.data.id);
    } catch (error) {
      console.error("Lỗi khi hiển thị dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [name, set_name] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [sdt, set_sdt] = useState("");
  const [password, set_password] = useState("");
  const [new_password, set_new_password] = useState("");
  const [compare_password, set_compare_password] = useState("");

  const [createdTime, setCreatedTime] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const isValidPhoneNumber = (phoneNumber) => {
    // Biểu thức chính quy kiểm tra tính hợp lệ của số điện thoại
    const phoneRegex = /^0\d{9}$/; // Số điện thoại bắt đầu bằng số 0 và có tổng cộng 10 chữ số
    return phoneRegex.test(phoneNumber);
  };

  const handler_update = async () => {
    try {
      const requestBody = {
        name: name,
        username: username,
        email: email,
        phone: sdt,
        createdTime: createdTime,
        createdBy: createdBy,
        id: id,
        password: password,
        birthDay: birthday,
        gender: gender,
        status: status,
      };

      if (/\s/.test(sdt)) {
        message.error("Số điện thoại không được chứa dấu cách.");
        return;
      }

      if (/^\s/.test(name)) {
        message.error("Tên không được chứa dấu cách ở đầu.");
        return;
      }

      if (sdt.trim() === "") {
        message.error("Vui lòng điền đầy đủ thông tin số điện thoại.");
        return;
      }

      if (name.trim() === "") {
        message.error("Vui lòng điền đầy đủ thông tin tên.");
        return;
      }

      const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
      if (specialChars.test(name)) {
        message.error("Tên không được chứa ký tự đặc biệt!");
        return;
      }
      if (specialChars.test(sdt)) {
        message.error("Số điện thoại không được chứa ký tự đặc biệt!");
        return;
      }
      if (!isNaN(name)) {
        message.error("Tên không được chỉ chứa số!");
        return;
      }

      if (!isValidPhoneNumber(sdt)) {
        message.error("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!");
        return;
      }

      console.log(requestBody);

      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Gửi yêu cầu POST với dữ liệu và tiêu đề Authorization
      const response = await axios.post(
        "http://localhost:8071/customer/update-user-infor",
        requestBody,
        { headers }
      );

      console.log(response.data);

      // Cập nhật dữ liệu từ phản hồi
      setBirthDay(response.data.birthDay);
      set_name(response.data.name);
      setGender(response.data.gender);
      set_sdt(response.data.phone);

      // Hiển thị thông báo thành công
      message.success("Cập nhật thành công!");
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo lỗi
      console.error("Cập nhật thất bại:", error);
      message.error("Cập nhật thất bại!");
    }
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handler_change = async () => {
    // Kiểm tra xác thực mật khẩu mới và mật khẩu nhập lại
    const whitespaceRegex = /\s/;

    // Tạo đối tượng requestBody từ dữ liệu nhập liệu
    const requestBody = {
      password: password1,
      newPassword: new_password,
    };

    if (new_password.trim() !== compare_password.trim()) {
      message.error("Mật khẩu mới và mật khẩu nhập lại không khớp.");
      return;
    }
    if (new_password.trim() === password1.trim()) {
      message.error("Mật khẩu mới phải khác mật khẩu cũ.");
      return;
    }
    if (whitespaceRegex.test(password1)) {
      message.error("Mật khẩu cũ không được chứa khoảng trắng.");
      return;
    }
    // Kiểm tra xem mật khẩu mới có chứa khoảng trắng không
    if (whitespaceRegex.test(new_password)) {
      message.error("Mật khẩu mới không được chứa khoảng trắng.");
      return;
    }
    // Kiểm tra xem mật khẩu nhập lại có chứa khoảng trắng không
    if (whitespaceRegex.test(compare_password)) {
      message.error("Nhập lại mật khẩu mới không được chứa khoảng trắng.");
      return;
    }
    if (password1.trim() === "") {
      message.error("Vui lòng điền mật khẩu cũ ");
      return;
    }
    if (new_password.trim() === "") {
      message.error("Vui lòng điền mật khẩu mới ");
      return;
    }
    if (compare_password.trim() === "") {
      message.error("Vui lòng điền nhập lại mật khẩu mới ");
      return;
    }

    try {
      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Gọi API để thay đổi mật khẩu với headers
      const response = await axios.post(
        "http://localhost:8071/customer/update-password",
        requestBody,
        { headers }
      );

      // Xử lý kết quả từ API nếu cần
      console.log(response);

      // Hiển thị thông báo hoặc chuyển hướng trang sau khi thay đổi mật khẩu thành công
      message.success("Mật khẩu đã được thay đổi thành công.");
    } catch (error) {
      // Xử lý lỗi nếu có

      // Kiểm tra nếu mã lỗi là 403 và có thông tin lỗi từ máy chủ
      if (error.response && error.response.status === 403) {
        // Hiển thị thông báo nếu mật khẩu cũ không chính xác
        message.error("Mật khẩu cũ không chính xác.");
      } else {
        // Hiển thị thông báo lỗi mặc định nếu không phải là lỗi 403
        message.error(
          "Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau."
        );
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  const [editAddress, setEditAddress] = useState(null); // State để lưu trữ dữ liệu của bản ghi đang được chỉnh sửa

  const [activeTab, setActiveTab] = useState(
    "choXacNhan",
    "choGiaoHang",
    "giaoHang",
    "hoanThanh",
    "huy",
    "tra"
  );
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const [bien, setBien] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (address, id) => {
    console.log(id);
    setIsModalVisible(true);
    setEditAddress(address);
    setBien(id);
    // Làm bất cứ điều gì khác cần thiết với index ở đây
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [addresses, setAddresses] = useState([]);

  const fetchAddressesByIdCustomer = async () => {
    try {
      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Gửi yêu cầu GET với tiêu đề Authorization
      const response = await axios.get(
        "http://localhost:8071/customer/get-all-address",
        { headers }
      );

      const data = response.data; // Lưu giữ kết quả vào biến data

      console.log(data); // Log dữ liệu để kiểm tra

      setAddresses(data); // Gán dữ liệu vào state addresses
      console.log(addresses);
      return data; // Trả về dữ liệu cho các xử lý khác nếu cần
    } catch (error) {
      console.error("Lỗi khi hiển thị dữ liệu:", error);
    }
  };

  const [ids, setIds] = useState(false);

  useEffect(() => {
    fetchAddressesByIdCustomer();
  }, [addedAddress]);

  const [is_defaul, setIsDefault] = useState("");
  const token = localStorage.getItem("token");
  const addAddress = async () => {
    if (!city || !district || !ward || des.trim() === "") {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        id_customer: id,
        city: city,
        district: district,
        province: ward,
        description: des,
      };

      console.log(requestBody);

      // Gửi yêu cầu POST với tiêu đề Authorization
      const response = await axios.post(
        "http://localhost:8071/customer/create-address",
        requestBody,
        { headers }
      );
      console.log(response.data);

      // Gọi lại hàm fetchAddressesByIdCustomer để cập nhật danh sách địa chỉ
      await fetchAddressesByIdCustomer();

      message.success("Thêm địa chỉ thành công:");
      setAddedAddress(!addedAddress);
      form.resetFields();
      handleAddCancel();
    } catch (error) {
      console.error("Thêm thất bại:", error); // Log lỗi nếu có
      message.error("Thêm thất bại!");
    } finally {
      setSelectedCity("");
      setSelectedDis("");
      setSelectedWar("");
      setDes("");
      handleAddCancel();
    }
  };

  const handleAddAddress = async () => {
    addAddress();
  };
  const [provinceName, setProvinceName] = useState("");

  const [addressData, setAddressData] = useState({
    city: "",
    district: "",
    province: "",
    description: "",
  });

  const updateAddress = async () => {
    console.log(editAddress);
    if (
      !editAddress.city ||
      !editAddress.district ||
      !editAddress.province ||
      editAddress.description.trim() === ""
    ) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        id: bien, // Truyền id của địa chỉ cần sửa
        city: editAddress.city,
        district: editAddress.district,
        province: editAddress.province,
        description: editAddress.description,
      };

      console.log(requestBody);

      // Gửi yêu cầu POST với tiêu đề Authorization
      const response = await axios.post(
        "http://localhost:8071/customer/update-address",
        requestBody,
        { headers }
      );
      console.log(response);

      // Gọi hàm fetchAddressesByIdCustomer để cập nhật danh sách địa chỉ
      fetchAddressesByIdCustomer();

      message.success("Thành công:");

      // Đóng modal sau khi thêm thành công
      handleCancel();
    } catch (error) {
      message.error("Thất bại!");
    } finally {
      setSelectedCity("");
      setSelectedDis("");
      setSelectedWar("");
      setDescription("");

      handleCancel();
    }
  };

  const [ia, setIa] = useState(true);
  const updateOtherAddresses = async (id) => {
    try {
      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Tạo requestBody chứa id của địa chỉ
      const requestBody = {
        id: id,
      };

      // Gửi yêu cầu POST với tiêu đề Authorization và requestBody
      const response = await axios.post(
        "http://localhost:8071/customer/update-other-addresses",
        requestBody,
        { headers }
      );

      if (response.status === 200) {
        // Nếu thành công, cập nhật lại danh sách địa chỉ
        fetchAddressesByIdCustomer();
        console.log("Cập nhật defaul thành công!");
      } else {
        console.log("Cập nhật defaul không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật defaul của các bản ghi còn lại:", error);
    }
  };

  const handleUpdateOther = (id) => {
    updateOtherAddresses(id);
  };
  const handleUpdate = (address) => {
    updateAddress(address.id);
  };

  // useEffect(() => {
  //     fetchAddressesByIdCustomer()

  //         .then(data => setAddresses(data))
  //         .catch(error => console.error('Lỗi khi hiển thị dữ liệu:', error));
  // }, [ids, id, idss]);
  // const [loading,setLoading]=useState(false)
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             // setLoading(true);
  //             const response = await axios.get(`http://localhost:8071/customer/get-all-address`);
  //             setAddresses(response.data);
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //         // finally {
  //         //     setLoading(false);
  //         // }
  //     };

  //     fetchData();
  // }, []);
  const getProvinceName = (provinceId) => {
    const province = cityData.find((city) => city.value == provinceId);

    return province ? province.label : "";
  };

  // Hàm để lấy tên của district từ ID
  const getDistrictName = (districtId) => {
    // Chỉ thực hiện khi dữ liệu đã được tải thành công

    console.log("Truyền vào districtId:", districtId);

    const district = disData.find(
      (dis) => parseInt(dis.value) === parseInt(districtId)
    );

    console.log("Kết quả tìm kiếm district:", district);

    return district ? district.label : "";
  };

  const getWardName = (wardId) => {
    // Chỉ thực hiện khi dữ liệu đã được tải thành công

    console.log("Truyền vào wardId:", wardId);

    const ward = warData.find((ward) => ward.value == wardId);

    console.log("Kết quả tìm kiếm ward:", ward);

    return ward ? ward.label : "";
  };

  const [password1, set_password1] = useState("");

  const [listVoucher, setListVoucher] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tạo object headers chứa tiêu đề Authorization
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          "http://localhost:8071/customer/get-voucher-by-user-login",
          {},
          { headers }
        );
        setListVoucher(response.data);
      } catch (error) {
        console.error("Lỗi khi hiển thị dữ liệu:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData để lấy dữ liệu
  }, []); // Tham số thứ hai là một mảng rỗng để đảm bảo hiệu ứng chỉ chạy một lần khi component mount

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  // const handlePageSizeChange = (current, newSize) => {
  //     setPageSize(newSize);
  // };
  const [searchText, setSearchText] = useState("");
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredVouchers = listVoucher.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchText.toLowerCase())
  );
  const [showPassword1, setShowPassword1] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showPassword2, setShowPassword2] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showPassword3, setShowPassword3] = useState(false); // Trạng thái hiển thị mật khẩu

  // Hàm để thay đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleDelete = async (id) => {
    try {
      // Tạo object headers chứa tiêu đề Authorization
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Tạo requestBody chứa id của địa chỉ
      const data = { id: id };

      // Gửi yêu cầu POST với tiêu đề Authorization và requestBody
      await axios.post("http://localhost:8071/customer/delete-address", data, {
        headers,
      });

      // Thực hiện các bước cần thiết sau khi xóa địa chỉ thành công
      message.success("Xóa địa chỉ thành công");
      fetchAddressesByIdCustomer();
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error("Lỗi khi xóa địa chỉ:", error);
    }
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const itemsPerPage = pageSize;

  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);
  const slicedVouchers = filteredVouchers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1); // Reset trang về trang đầu tiên khi thay đổi kích thước của trang
    setPageSize(size);
  };
  return (
    <div className="m-5 mt-5 pt-4" style={{ paddingBottom: "4rem" }}>
      <div className="group_profile w-100">
        <div style={{ height: "400px" }} className="group_setting mt-3">
          <div style={{}} className="setting_left">
            <div
              className={
                edit_status === "thong_tin_ca_nhan"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
              onClick={() => handler_Status("thong_tin_ca_nhan")}
            >
              <a
                className={
                  edit_status === "thong_tin_ca_nhan" ? "a_setting_active" : ""
                }
                style={{ fontSize: "1.1rem" }}
              >
                Thông tin cá nhân
              </a>
            </div>
            <div
              className={
                edit_status === "dia_chi"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
              onClick={() => handler_Status("dia_chi")}
            >
              <a
                className={edit_status === "dia_chi" ? "a_setting_active" : ""}
                style={{ fontSize: "1.1rem" }}
              >
                Địa chỉ
              </a>
            </div>
            <div
              className={
                edit_status === "voucher"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
              onClick={() => handler_Status("voucher")}
            >
              <a
                className={edit_status === "voucher" ? "a_setting_active" : ""}
                style={{ fontSize: "1.1rem" }}
              >
                Phiếu giảm giá
              </a>
            </div>
            <div
              className={
                edit_status === "lich_su"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
              onClick={() => handler_Status("lich_su")}
            >
              <a
                className={edit_status === "lich_su" ? "a_setting_active" : ""}
                style={{ fontSize: "1.1rem" }}
              >
                Lịch sử đơn hàng
              </a>
            </div>
            <div
              className={
                edit_status === "quen_mat_khau"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
              onClick={() => handler_Status("quen_mat_khau")}
            >
              <a
                className={
                  edit_status === "quen_mat_khau" ? "a_setting_active" : ""
                }
                style={{ fontSize: "1.1rem" }}
              >
                Đổi mật khẩu
              </a>
            </div>
            {/* <div className={edit_status === 'dang_xuat' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('dang_xuat')}>
                            <a className={edit_status === 'dang_xuat' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Đăng xuất</a>
                        </div> */}
            <div
              className={
                edit_status === "dang_xuat"
                  ? "setting_item setting_item_active"
                  : "setting_item"
              }
            >
              <a
                className={
                  edit_status === "dang_xuat" ? "a_setting_active" : ""
                }
                style={{ fontSize: "1.1rem" }}
                onClick={showModalDX}
              >
                Đăng xuất
              </a>
              {/* <Button onClick={showModalDX}></Button> */}
            </div>
            <Modal
              title="Thông báo"
              style={{ height: "500px" }}
              visible={showDangXuat}
              onCancel={huyDangXuat}
              footer={[
                <Button key="cancel" onClick={huyDangXuat}>
                  Không
                </Button>,
                <Button key="submit" type="primary" onClick={toggleModal}>
                  Đồng ý
                </Button>,
              ]}
            >
              <h1 style={{ textAlign: "center" }}>
                Bạn có muốn đăng xuất không?
              </h1>
            </Modal>
          </div>
          <div className="setting_right">
            {edit_status === "thong_tin_ca_nhan" ? (
              <div className="setting_edit_profile">
                {/* <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                        <div className="d-flex">
                                            <img src={avt} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Nguyen Kim Tien</span>
                                                <br />
                                                <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                    Change Profile Photo</a>

                                                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Change Profile Photo</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                <div className="txt_setting_edit pt-3 pb-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <span style={{ fontWeight: "600" }}>Họ và tên</span>
                  </div>
                  <div>
                    <input
                      className="txt_input_edit"
                      type="text"
                      value={name}
                      onChange={(e) => set_name(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="txt_setting_edit pt-3 pb-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <span style={{ fontWeight: "600" }}>Giới tính</span>
                  </div>
                  <div style={{ width: "65%", maxWidth: "100%" }}>
                    <select
                      className="form-select"
                      value={gender === null ? "" : gender == 0 ? "Nam" : "Nữ"}
                      onChange={(e) =>
                        setGender(
                          e.target.value === "Nam"
                            ? 0
                            : e.target.value === "Nữ"
                            ? 1
                            : null
                        )
                      }
                      required
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="txt_setting_edit pt-3 pb-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <span style={{ fontWeight: "600" }}>Ngày sinh</span>
                  </div>
                  <div>
                    <input
                      className="txt_input_edit"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthDay(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="txt_setting_edit pt-3 pb-2">
                  <div className="d-flex justify-content-center align-items-center">
                    <span style={{ fontWeight: "600" }}>Số điện thoại</span>
                  </div>
                  <div>
                    <input
                      className="txt_input_edit"
                      type="text"
                      value={sdt}
                      onChange={(e) => set_sdt(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center pt-3 pb-4">
                  <button
                    className="btn btn-secondary"
                    onClick={handler_update}
                  >
                    Sửa
                  </button>
                </div>
              </div>
            ) : edit_status === "lich_su" ? (
              <Bill />
            ) : edit_status === "quen_mat_khau" ? (
              <div className="setting_change_password">
                <div>
                  <div className="txt_setting_edit mt-3 pb-2">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ marginTop: "20px" }}
                    >
                      <span style={{ fontWeight: "600" }}>Mật khẩu cũ</span>
                    </div>
                    <div
                      className="input-group"
                      style={{ width: "70%", marginTop: "20px" }}
                    >
                      <input
                        type={showPassword1 ? "text" : "password"}
                        className="txt_input_edit form-control"
                        value={password1}
                        onChange={(e) => set_password1(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility1}
                      >
                        {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="txt_setting_edit pt-3 pb-2">
                    <div className="d-flex justify-content-center align-items-center">
                      <span style={{ fontWeight: "600" }}>Mật khẩu mới</span>
                    </div>
                    <div className="input-group" style={{ width: "70%" }}>
                      <input
                        type={showPassword2 ? "text" : "password"}
                        className="txt_input_edit form-control"
                        value={new_password}
                        onChange={(e) => set_new_password(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility2}
                      >
                        {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="txt_setting_edit pt-3 pb-2">
                    <div className="d-flex justify-content-center align-items-center">
                      <span style={{ fontWeight: "600" }}>
                        Nhập lại mật khẩu mới
                      </span>
                    </div>
                    <div className="input-group" style={{ width: "70%" }}>
                      <input
                        type={showPassword3 ? "text" : "password"}
                        className="txt_input_edit form-control"
                        value={compare_password}
                        onChange={(e) => set_compare_password(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility3}
                      >
                        {showPassword3 ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center pt-3 pb-4 align-items-center"
                  style={{ marginTop: "10px" }}
                >
                  <button
                    className="btn btn-secondary"
                    onClick={handler_change}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ) : edit_status === "voucher" ? (
              <div className="voucher" style={{ width: "1000px" }}>
                <Input
                  placeholder="Tìm kiếm theo mã voucher"
                  style={{ margin: "10px", height: "55px", width: "300px" }}
                  onChange={handleSearchChange}
                  prefix={<SearchOutlined />}
                />
                <div>
                  <Row
                    style={{
                      border: "1px solid while",
                      padding: "15px",
                      height: "280px",
                      overflow: "auto",
                    }}
                  >
                    {slicedVouchers.map((i) => (
                      <Col span={12}>
                        <div
                          style={{
                            margin: "10px",
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            backgroundColor: "#B0E2FF",
                            borderRadius: "5px",
                            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                            position: "relative",
                          }}
                        >
                          <Row>
                            <Col span={8}>Mã giảm giá {i.code}</Col>
                            <Col span={16}>
                              Giảm giá{" "}
                              {i.discountAmount === 0
                                ? i.discountPercent + "%"
                                : formatCurrency(i.discountAmount)}{" "}
                              cho hóa đơn tối thiểu{" "}
                              {formatCurrency(i.minimumOrder)}
                            </Col>
                          </Row>
                          <div
                            style={{
                              position: "absolute", // Sử dụng absolute position để đặt endDate
                              bottom: "5px",
                              right: "10px",
                              fontStyle: "italic",
                            }}
                          >
                            HSD: {i.endDate}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Pagination
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      margin: "5px",
                    }}
                    size="small"
                    current={currentPage}
                    total={listVoucher.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger
                    pageSizeOptions={["6", "10", "20", "50"]}
                    showTotal={(record) => `Tổng: ${record}`}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid white",
                  padding: "15px",
                  height: "400px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h4 className="m-3" style={{ alignSelf: "flex-start" }}>
                    Địa chỉ của tôi
                  </h4>
                  <div className="m-3">
                    <Button type="primary" shape="round" onClick={showAddModal}>
                      Thêm mới địa chỉ
                    </Button>
                    <Modal
                      title="Thêm mới địa chỉ"
                      visible={isAddModalVisible}
                      onCancel={handleAddCancel}
                      footer={[
                        <Button key="cancel" onClick={handleAddCancel}>
                          Hủy
                        </Button>,
                        <Button
                          key="ok"
                          type="primary"
                          onClick={handleAddAddress}
                        >
                          {" "}
                          {/* Thay đổi đây */}
                          Thêm
                        </Button>,
                      ]}
                    >
                      <form>
                        <div className="d-flex center mb-3">
                          <label className="w-50">Thành phố</label>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="--- Chọn Tỉnh/Thành phố ---"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={cityData}
                            onChange={handleCityChange}
                            value={selectedCity}
                          />
                        </div>
                        <div className="d-flex center mb-3">
                          <label className="w-50">Huyện</label>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="--- Chọn Quận/Huyện ---"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            // filterSort={(optionA, optionB) =>
                            //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            // }
                            options={disData}
                            onChange={handleDisChange}
                            value={selectedDis}
                          />
                        </div>
                        <div className="d-flex center mb-3">
                          <label className="w-50">Xã</label>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="--- Chọn Xã/Phường ---"
                            optionFilterProp="children" // filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            // filterSort={(optionA, optionB) =>
                            //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            // }

                            options={warData}
                            onChange={handleWarChange}
                            value={selectedWar}
                          />
                        </div>
                        <div className="d-flex center mb-3">
                          <label className="w-50">Nhập địa chỉ chi tiết</label>
                          <Input
                            name="description"
                            value={des}
                            onChange={(e) => handleInputChange(e.target.value)}
                          />
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
                <hr
                  className=""
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                />
                <div>
                  {addresses.map((address) => (
                    <div key={address.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <p className="m-3">
                          Tỉnh/Thành phố: {address.city} <br />
                          Huyện/Quận: {address.district} <br />
                          Xã/Phường: {address.province} <br />
                          Địa chỉ: {address.description}
                        </p>

                        <div style={{ textAlign: "center" }}>
                          <Popconfirm
                            title="Bạn muốn đặt địa chỉ này làm mặc định chứ?"
                            onConfirm={() => handleUpdateOther(address.id)} // Xác nhận thực hiện hành động
                            okText="Đồng ý"
                            cancelText="Hủy"
                          >
                            <Button
                              type="primary"
                              disabled={address.defaul === 0}
                              className="m-2"
                            >
                              Mặc định
                            </Button>
                          </Popconfirm>
                          <Button
                            className="m-2"
                            type="primary"
                            onClick={() => showModal(address, address.id)}
                          >
                            Cập nhật
                          </Button>
                          <Modal
                            title="Sửa địa chỉ"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={[
                              <Button key="cancel" onClick={handleCancel}>
                                Hủy
                              </Button>,
                              <Button
                                key="ok"
                                type="primary"
                                onClick={() => updateAddress(address)}
                              >
                                Sửa
                              </Button>,
                            ]}
                          >
                            <form>
                              <div className="d-flex center mb-3">
                                <label className="w-50">Thành phố</label>
                                <Select
                                  style={{ width: "100%" }}
                                  showSearch
                                  placeholder="--- Chọn Tỉnh/Thành phố ---"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                  }
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                      .toLowerCase()
                                      .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                      )
                                  }
                                  options={cityData}
                                  onChange={handleCityChange1}
                                  value={
                                    (editAddress && editAddress.city) || ""
                                  }
                                />
                              </div>
                              <div className="d-flex center mb-3">
                                <label className="w-50">Huyện</label>
                                <Select
                                  style={{ width: "100%" }}
                                  showSearch
                                  placeholder="--- Chọn Quận/Huyện ---"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                  }
                                  options={disData}
                                  onChange={handleDisChange1}
                                  value={
                                    (editAddress && editAddress.district) || ""
                                  }
                                />
                              </div>
                              <div className="d-flex center mb-3">
                                <label className="w-50">Xã</label>
                                <Select
                                  style={{ width: "100%" }}
                                  showSearch
                                  placeholder="--- Chọn Xã/Phường ---"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                  }
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                      .toLowerCase()
                                      .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                      )
                                  }
                                  options={warData}
                                  onChange={handleWarChange1}
                                  value={
                                    (editAddress && editAddress.province) || ""
                                  }
                                />
                              </div>
                              <div className="d-flex center mb-3">
                                <label className="w-50">
                                  Nhập địa chỉ chi tiết
                                </label>
                                <Input
                                  name="description"
                                  value={
                                    (editAddress && editAddress.description) ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange1(e.target.value)
                                  }
                                />
                              </div>
                            </form>
                          </Modal>
                          <Popconfirm
                            title="Bạn có chắc muốn xóa địa chỉ này?"
                            onConfirm={() => handleDelete(address.id)} // Xác nhận xóa
                            okText="Xóa"
                            cancelText="Hủy"
                          >
                            <Button className="m-2" type="primary">
                              Xóa
                            </Button>{" "}
                            {/* Sử dụng Popconfirm cho nút Xóa */}
                          </Popconfirm>
                        </div>
                      </div>
                      <hr
                        className=""
                        style={{ marginTop: "0px", marginBottom: "0px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
