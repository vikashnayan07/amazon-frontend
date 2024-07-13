import React, { useContext, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import AppContext from "../context/appContext";
import ProfilePopup from "./ProfilePopup";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";

const Navbar = ({ openSearchPage }) => {
  const { setSearchText, cart, loggedInUser } = useContext(AppContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  return (
    <nav className="homepage-nav">
      <img
        src="https://i.pinimg.com/736x/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.jpg"
        className="image-logo"
        alt="Logo"
      />
      <div className="location">
        <p>Delivering to LPU 144411</p>
        <span>Update location</span>
      </div>
      <div className="homepage-search-container">
        <select>
          <option>All</option>
        </select>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Amazon.in"
        />
        <button onClick={openSearchPage}>
          <IoSearchSharp />
        </button>
      </div>
      <div className="navbar-profile" onClick={togglePopup}>
        {loggedInUser ? (
          <>
            <FaRegUserCircle />
            <h5>{getFirstName(loggedInUser.name)}</h5>
          </>
        ) : (
          <>
            <FaRegUserCircle />
            <h5>Profile</h5>
          </>
        )}
      </div>
      {isPopupVisible && <ProfilePopup closePopup={closePopup} />}
      <div className="navbar-cart">
        <BiCartAdd />
        <h5 title={JSON.stringify(cart)}>Cart</h5>
      </div>
    </nav>
  );
};

export default Navbar;
