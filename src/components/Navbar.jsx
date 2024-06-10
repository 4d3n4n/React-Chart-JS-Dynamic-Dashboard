import React, { useEffect, useRef, useState } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import homeOff from "../assets/home_off.svg";
import homeOn from "../assets/home_on.svg";
import homeSelect from "../assets/home_select.svg";
import { ReactComponent as DashboardIcon } from "../assets/logo.svg";
import settingsOff from "../assets/settings_off.svg";
import settingsOn from "../assets/settings_on.svg";
import settingsSelect from "../assets/settings_select.svg";
import statsOff from "../assets/stats_off.svg";
import statsOn from "../assets/stats_on.svg";
import statsSelect from "../assets/stats_select.svg";
import universityOff from "../assets/university_off.svg";
import universityOn from "../assets/university_on.svg";
import universitySelect from "../assets/university_select.svg";
import yourofferOff from "../assets/youroffer_off.svg";
import yourofferOn from "../assets/youroffer_on.svg";
import yourofferSelect from "../assets/youroffer_select.svg";
import "./Navbar.css"; // Importez votre fichier CSS ici

const CustomNavLink = ({ to, children, iconOff, iconOn, iconSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      className={match ? "navbar-item active" : "navbar-item"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <>
        <img
          src={isHovered && !match ? iconSelect : match ? iconOn : iconOff}
          className="navbar-icon"
          alt=""
        />
        {children}
      </>
    </NavLink>
  );
};

const Navbar = ({ user, campaign }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [nameLogoHeight, setNameLogoHeight] = useState(0);
  const nameLogoRef = useRef(null);

  const togglePopup = (event) => {
    event.stopPropagation();
    window.requestAnimationFrame(() => {
      setIsPopupVisible(!isPopupVisible);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPopupVisible && !event.target.closest(".name-and-logo")) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isPopupVisible]);

  useEffect(() => {
    if (nameLogoRef.current) {
      setNameLogoHeight(nameLogoRef.current.offsetHeight);
    }
  }, []); // Ce useEffect se déclenche après le premier rendu

  // const logout = () => {
  //   localStorage.removeItem("user");
  //   window.location.dashboard();
  // };

  return (
    <div className="navbar-container">
      <div className="navbar-secondary">
        <div className="navbar-header">
          <div
            className="name-and-logo"
            ref={nameLogoRef}
            onClick={togglePopup}
          >
            <DashboardIcon className="logo" />
            <div className="user-details">
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div className="trial-text">TRIAL DATE</div>
            </div>
            <span className="down-arrow">&#x2193;</span>
          </div>
          {isPopupVisible && (
            <div
              className={`popup-container ${isPopupVisible ? "show" : ""}`}
              style={{
                top: `${nameLogoHeight + 15}px`, // Position juste en dessous du conteneur name-and-logo avec un petit espace
                left: "15px", // Détaché de 15px du bord gauche pour un léger décalage
                width: "calc(100% + 20px)", // Ajustez si vous souhaitez que la popup soit plus large que le conteneur parent
              }}
            >
              <div className="popup-content">
                <div className="popup-item">Manage Subscription</div>
                {/* Logout  */}
                {/* <div className="popup-item" onClick={logout}> */}
                <div className="popup-item">
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="upgrade-button">
          Upgrade
        </button>
        <div className="navbar-separator"></div>
        <CustomNavLink
          to="/dashboard"
          end={true}
          iconOff={homeOff}
          iconOn={homeOn}
          iconSelect={homeSelect}
        >
          <span>Dashboard</span>
        </CustomNavLink>
        <div className="navbar-separator"></div>
        <CustomNavLink
          to="/settings"
          iconOff={settingsOff}
          iconOn={settingsOn}
          iconSelect={settingsSelect}
        >
          <span>Automation</span>
        </CustomNavLink>
        <CustomNavLink
          to="/video-tracker"
          iconOff={statsOff}
          iconOn={statsOn}
          iconSelect={statsSelect}
        >
          <span>Video Tracker</span>
        </CustomNavLink>
        <div className="navbar-separator"></div>
        <CustomNavLink
          to="/settings"
          iconOff={universityOff}
          iconOn={universityOn}
          iconSelect={universitySelect}
        >
          <span>University</span>
        </CustomNavLink>
        <CustomNavLink
          to="/settings"
          iconOff={yourofferOff}
          iconOn={yourofferOn}
          iconSelect={yourofferSelect}
        >
          <span>Your Offer</span>
        </CustomNavLink>
        <CustomNavLink
          to="/settings"
          iconOff={settingsOff}
          iconOn={settingsOn}
          iconSelect={settingsSelect}
        >
          <span>Settings</span>
        </CustomNavLink>
        {/* Ajoutez d'autres CustomNavLink ici pour d'autres routes, avec leurs icônes respectives */}
      </div>
    </div>
  );
};

export default Navbar;
