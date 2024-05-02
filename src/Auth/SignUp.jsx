import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import User from "../API/User";
import { useDispatch, useSelector } from "react-redux";
import { changeCount } from "../Redux/Action/ActionCount";
import { Button, Form, Input, DatePicker, Radio, Select, Row, Col } from "antd";
import "./Signup.css";
import axios from "axios";
const { Option } = Select;

function SignUp(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("0");
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    district: "",
    province: "",
    city: "",
    description: "",
  });
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [gender, setGender] = useState("0");

  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const count_change = useSelector((state) => state.Count.isLoad);
  // Đia Chỉ
  const [cityData, setCityData] = useState([]);
  const [disData, setDisData] = useState([]);
  const [warData, setWarData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDis, setSelectedDis] = useState("");
  const [selectedWar, setSelectedWar] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `https://vapi.vnappmob.com/api/province`
        ).then((res) => res.json());
        setCityData(
          response.results.map((city) => ({
            label: city.province_name,
            value: city.province_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, []);

  useEffect(() => {
    const fetchDisData = async () => {
      if (selectedCity) {
        try {
          const response = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${selectedCity}`
          );
          setDisData(
            response.data.results.map((dis) => ({
              label: dis.district_name,
              value: dis.district_id,
            }))
          );
        } catch (error) {
          console.error("Error fetching district data:", error);
        }
      }
    };

    fetchDisData();
  }, [selectedCity]);

  useEffect(() => {
    const fetchWarData = async () => {
      if (selectedDis) {
        try {
          const response = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${selectedDis}`
          );
          setWarData(
            response.data.results.map((war) => ({
              label: war.ward_name,
              value: war.ward_id,
            }))
          );
        } catch (error) {
          console.error("Error fetching ward data:", error);
        }
      }
    };

    fetchWarData();
  }, [selectedDis]);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    const selectedCityCode = cityData.find(
      (city) => city.value === value
    )?.value;
    const selectedCityName = cityData.find(
      (city) => city.value === value
    )?.label;
    setAddress((prevAddress) => ({
      ...prevAddress,
      province: selectedCityName,
    }));
    setCity(selectedCityName);
    setSelectedDis("");
    setSelectedWar("");
  };

  const handleDisChange = (value) => {
    setSelectedDis(value);
    const selectedDisCode = disData.find((dis) => dis.value === value)?.value;
    const selectedDisName = disData.find((dis) => dis.value === value)?.label;
    setDistrict(selectedDisName);
    setAddress((prevAddress) => ({
      ...prevAddress,
      district: selectedDisName,
    }));
    setSelectedWar("");
  };

  const handleWarChange = (value) => {
    setSelectedWar(value);
    setAddress((prevAddress) => ({ ...prevAddress, ward: selectedWarName }));
    const selectedWarName = warData.find((war) => war.value === value)?.label;
    setWard(selectedWarName);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const params = {
        email,
        phone,
        name,
        address,
        password,
        birthDay: birthDay ? birthDay.format("YYYY-MM-DD") : null,
        gender,
      };

      try {
        const response = await User.Post_Register(params);
        console.log("Response: ", response);

        if (response === "SUCCESS") {
          const action_count_change = changeCount(count_change);
          dispatch(action_count_change);

          setRedirect(true);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
      }
    };

    fetchData();
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Signup"
          />
        </div>
        <Row justify="center">
          <Form id="login-form" name="login-form" layout="vertical">
            <p className="form-title"> Đăng ký tài khoản</p>
            <p></p>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input
                    placeholder="Số điện thoại"
                    value={phone}
                    style={{ height: "55px" }}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Tỉnh/Thành phố"
                  name="city"
                  rules={[
                    { required: true, message: "Vui lòng chọn tỉnh/thành phố" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Tỉnh/Thành phố"
                    onChange={handleCityChange}
                    style={{ width: "100%" }}
                  >
                    {cityData.map((city) => (
                      <Option key={city.value} value={city.value}>
                        {city.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Quận/Huyện"
                  name="district"
                  rules={[
                    { required: true, message: "Vui lòng chọn quận/huyện" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Quận/Huyện"
                    onChange={handleDisChange}
                    style={{ width: "100%" }}
                  >
                    {disData.map((dis) => (
                      <Option key={dis.value} value={dis.value}>
                        {dis.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input
                    placeholder="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Phường/Xã"
                  name="ward"
                  rules={[
                    { required: true, message: "Vui lòng chọn phường/xã" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Phường/Xã"
                    onChange={handleWarChange}
                    style={{ width: "100%" }}
                  >
                    {warData.map((war) => (
                      <Option key={war.value} value={war.value}>
                        {war.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Ngày sinh"
                  name="birthDay"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh!" },
                  ]}
                >
                  <DatePicker
                    size="large"
                    placeholder="Ngày sinh"
                    value={birthDay}
                    onChange={(date) => setBirthDay(date)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ marginRight: "8px" }}>Giới tính:</div>
                <Form.Item
                  name="gender"
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính!" },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleSignUp}
                block
              >
                Đăng ký
              </Button>
              {error && (
                <span style={{ color: "red" }}>
                  Đã xảy ra lỗi trong quá trình đăng ký!
                </span>
              )}
              {redirect && <Redirect to="/signin" />}
            </Form.Item>
            <div
              className="already-have-account"
              style={{ textAlign: "center" }}
            >
              <Link to="/signin"> Đã có tài khoản? Đăng nhập</Link>
            </div>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default SignUp;
