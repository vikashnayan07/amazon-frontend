// ProfilePopup.js
import React from "react";

const ProfilePopup = ({ closePopup }) => {
  return (
    <div className="profile-popup">
      <ul>
        <li>Profile</li>
        <li>Account</li>
        <li>Settings</li>
        <li>Help</li>
        <li onClick={closePopup}>
          <div className="logout-button">Logout</div>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
