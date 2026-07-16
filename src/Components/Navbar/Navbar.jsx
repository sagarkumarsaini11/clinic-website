import React, { useEffect, useState,  useRef,} from "react";
import "./Navbar.css";
import cliniclogo from "../../assets/cliniclogo.png";
import menu_icon from "../../assets/menu-icon.png";
import { Link } from "react-scroll";
import BranchLogin from "../BranchLogin/BranchLogin";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const menuRef = useRef(null);

       // Sticky Navbar

  const [sticky, setSticky] = useState(false);

  useEffect(() => {

    window.addEventListener("scroll", () => {

      window.scrollY > 50  ? setSticky(true) : setSticky(false);});
     }, []); 
       
        // Mobile Menu

  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {    setMobileMenu(!mobileMenu);};

  

  // Close Sidebar After Click

  const closeMenu = () => {setMobileMenu(false);  };
    



  useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      mobileMenu &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMobileMenu(false);
    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, [mobileMenu]);
return (
  <nav className={`container ${sticky ? "dark-nav-web-navbar" : ""}`}>

    {/* Logo */}
    <img
      src={cliniclogo}
      alt="Clinic Logo"
      className="logo-web-navbar"
    />

    {/* Mobile Overlay */}
    {mobileMenu && (
      <div
        className="mobile-overlay-web-navbar"
        onClick={() => setMobileMenu(false)}
      />
    )}

    {/* Navbar Menu */}
    <ul
      ref={menuRef}
      className={mobileMenu ? "" : "hide-mobile-menu-web-navbar"}
    >

      <li>
        <Link
          to="hero"
          smooth={true}
          offset={0}
          duration={500}
          onClick={closeMenu}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          to="facilities"
          smooth={true}
          offset={-100}
          duration={500}
          onClick={closeMenu}
        >
          Facilities
        </Link>
      </li>

      <li>
        <Link
          to="about"
          smooth={true}
          offset={-100}
          duration={500}
          onClick={closeMenu}
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          to="gallery"
          smooth={true}
          offset={-100}
          duration={500}
          onClick={closeMenu}
        >
          Clinic Photos
        </Link>
      </li>

      <li>
        <Link
          to="contact"
          smooth={true}
          offset={-100}
          duration={500}
          className="btn-web-navbar"
          onClick={closeMenu}
        >
          Enquiry
        </Link>
      </li>

      <li>
        <button
          className="btn-web-navbar"
          onClick={() => {
            closeMenu();
            navigate("/login");
          }}
        >
          Login
        </button>
      </li>

    </ul>

    {/* Menu Icon */}
    <img
      src={menu_icon}
      alt="Menu"
      className="menu-icon-web-navbar"
      onClick={toggleMenu}
    />

  </nav>
);
};

export default Navbar;