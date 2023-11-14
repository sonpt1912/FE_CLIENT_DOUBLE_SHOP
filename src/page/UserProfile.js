import React, { useState } from "react";
import UserProfileNavbar from "../component/UserProfile/UserProfileNavbar";
import UserProfileContent from "../component/UserProfile/UserProfileContent";
import "../styles/UserProfile.scss";

const UserProfile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);

  const handleMenuItemClick = (index) => {
    setSelectedMenuItem(index);
  };

  return (
    <div className="user-profile">
      <div className="user-profile-navbar-container">
        <UserProfileNavbar onMenuItemClick={handleMenuItemClick} />
      </div>
      <div className="user-profile-content-container">
        <UserProfileContent selectedMenuItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default UserProfile;
