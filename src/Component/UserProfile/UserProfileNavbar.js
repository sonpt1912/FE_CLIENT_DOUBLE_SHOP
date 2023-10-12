import React from "react";

const UserProfileNavbar = ({ onMenuItemClick }) => {
  const handleMenuItemClick = (index) => {
    onMenuItemClick(index);
  };

  return (
    <div className="user-profile-navbar">
      <ul>
        <li onClick={() => handleMenuItemClick(1)}>ACCOUNT</li>
        <li onClick={() => handleMenuItemClick(2)}>ORDER HISTORY</li>
        <li onClick={() => handleMenuItemClick(3)}>CART</li>
        <li onClick={() => handleMenuItemClick(4)}>LOGOUT</li>
      </ul>
    </div>
  );
};

export default UserProfileNavbar;
