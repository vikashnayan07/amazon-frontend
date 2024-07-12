import { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import AppContext from "../context/appContext";

const Navbar = ({ openSearchPage }) => {
  const { setSearchText, cart } = useContext(AppContext);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <nav className="homepage-nav">
      {" "}
      <img
        src="https://i.pinimg.com/736x/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.jpg"
        className="image-logo"
      />{" "}
      <div className="location">
        <p>Delivering to LPU 144411 </p>

        <span>Update location</span>
      </div>
      <div className="homepage-search-container">
        <select>
          <option>All</option>
        </select>
        <input
          type="text"
          onChange={handleSearch}
          placeholder=" Search Amazon.in"
        />
        <button onClick={openSearchPage}>
          <IoSearchSharp />
        </button>
      </div>
      <h5>Profile</h5>
      <h5 title={JSON.stringify(cart)}>Cart</h5>
    </nav>
  );
};

export default Navbar;
