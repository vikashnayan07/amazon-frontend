import React, { useContext } from "react";
import AppContext from "../context/appContext";

const ProfilePopup = ({ closePopup }) => {
  const { appLogout } = useContext(AppContext);

  return (
    <div className="profile-popup">
      <ul>
        <li>Profile</li>
        <li>Account</li>
        <li>Settings</li>
        <li>Help</li>
        <li
          onClick={() => {
            appLogout();
            closePopup();
          }}
        >
          <div className="logout-button">Logout</div>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
