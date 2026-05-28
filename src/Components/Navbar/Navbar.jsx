import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu-icon.png";
import { Link } from "react-scroll";
import BranchLogin from "../BranchLogin/BranchLogin";

const Navbar = () => {

       // Sticky Navbar

  const [sticky, setSticky] = useState(false);

  useEffect(() => {

    window.addEventListener("scroll", () => {

      window.scrollY > 50  ? setSticky(true) : setSticky(false);});
     }, []); 
       
        // Mobile Menu

  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  // Close Sidebar After Click

  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (

    <nav className={`container ${sticky ? "dark-nav" : ""}`}>

            {/* Logo */}

        <img src={logo} alt="" className="logo"/>

           {/* Navbar Menu */}

      <ul className={  mobileMenu ? "" : "hide-mobile-menu" }>

        <li>
          <Link to="hero"  smooth={true} offset={0}  duration={500}  onClick={closeMenu}>  Home </Link>
        </li>  
 
        <li>
          <Link  to="facilities" smooth={true} offset={-100} duration={500}  onClick={closeMenu}>Facilities </Link>
          
        </li>   

        <li>
          <Link  to="about" smooth={true} offset={-100}  duration={500} onClick={closeMenu} > About Us </Link>
       </li>   

        <li>
          <Link to="gallery" smooth={true} offset={-100} duration={500} onClick={closeMenu}> Clinic Photos</Link>
        </li>   

        <li>
          <Link  to="contact" smooth={true} offset={-100}  duration={500}  className="btn"  onClick={closeMenu}> Contact Us</Link>
          
        </li>   
          
        <li>
          <Link  to="appointment"  smooth={true}  offset={-40} duration={500}
            className="btn" onClick={closeMenu} > Add Appointment </Link>
        </li>  

        <li onClick={closeMenu}> <BranchLogin />  </li>   
      </ul>
     
      {/* Menu Icon */}

      <img  src={menu_icon} alt=""   className="menu-icon" onClick={toggleMenu}/>

    </nav>
  );
};

export default Navbar;