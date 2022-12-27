import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowRight} from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let res = localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelBooking</span>
        </Link>

        {user !== null ? (
          <div style={{display:"flex",flexDirection:"column"}}>
            <button>{user.username}</button>
            <button onClick={handleLogout} style={{padding:"5px"}}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
