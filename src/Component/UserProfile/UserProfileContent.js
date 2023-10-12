import React from "react";

const UserProfileContent = ({ selectedMenuItem }) => {
  return (
    <div className="user-profile-content">
      {selectedMenuItem === 1 && <p>Nội dung của mục 1</p>}
      {selectedMenuItem === 2 && <p>Nội dung của mục 2</p>}
      {selectedMenuItem === 3 && <p>Nội dung của mục 3</p>}
      {selectedMenuItem === 4 && <p>Nội dung của mục 4</p>}
    </div>
  );
};

export default UserProfileContent;
