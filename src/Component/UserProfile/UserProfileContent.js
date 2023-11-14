import React from "react";
import Account from "./content/Account";

const UserProfileContent = ({ selectedMenuItem }) => {
  return (
    <div className="user-profile-content">
      {selectedMenuItem === 1 && (
        <p>
          <Account />
        </p>
      )}
      {selectedMenuItem === 2 && <p>Nội dung của mục 2</p>}
      {selectedMenuItem === 3 && <p>Nội dung của mục 3</p>}
      {selectedMenuItem === 4 && <p>Nội dung của mục 4</p>}
    </div>
  );
};

export default UserProfileContent;
