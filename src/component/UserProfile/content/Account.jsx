import React, { useState } from "react";
import "../../../styles/Account__UserProfile.scss";
import { userData } from "./userData";
import { addressData } from "./userData";
import { Input, Button } from "antd";
import AddressDrawer from "./DrawerAddress";

const Account = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    gender: "",
    phone: "",
    birth_day: "",
    email: "",
    password: "",
    status: "",
  });
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  const user = userData[0];

  const getAddressString = (userId) => {
    const userAddresses = addressData.filter(
      (address) => address.id_customer === userId
    );
    const addressString = userAddresses.map((address) => {
      const addressStyle = {
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "10px",
        marginTop: "10px",
        fontSize: "14px",
        lineHeight: "1.5",
      };

      return (
        <div style={addressStyle}>
          <p>ID Customer: {address.id_customer}</p>
          <p className="address-info">District: {address.district}</p>
          <p className="address-info">Province: {address.province}</p>
          <p className="address-info">City: {address.city}</p>
          <p className="address-info">Description: {address.description}</p>
        </div>
      );
    });

    return addressString;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="account__container">
      <div className="account__left">
        <div className="avatar__profile">
          <img className="avatar__image" src={user.avatar} alt="Avatar" />
          <h3 className="user__name">{user.name}</h3>
        </div>
        <form>
          <div className="form__row">
            <label>Username:</label>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Name:</label>
            <Input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Gender:</label>
            <Input
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Phone:</label>
            <Input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Birth Day:</label>
            <Input
              type="text"
              name="birth_day"
              value={user.birth_day}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Email:</label>
            <Input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Password:</label>
            <Input
              type="text"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="form__row">
            <label>Status:</label>
            <Input
              type="text"
              name="status"
              value={user.status}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="account__right">
        <h3>Address Data</h3>
        <p className="right__Address">{getAddressString(user.id_customer)}</p>
        <Button type="primary" className="btn__primary" onClick={showDrawer}>
          Add
        </Button>
        <AddressDrawer visible={isDrawerVisible} onClose={onClose} />
      </div>
    </div>
  );
};

export default Account;
