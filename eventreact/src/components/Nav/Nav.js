import React from "react";
import { Link } from "react-router-dom";

import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";
import "./Nav.css"

const Nav = ({setexibeNavbar, exibeNavbar}) => {
  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span className="navbar__close" onClick={() => {setexibeNavbar(false)}}>x</span>

      <Link to="/" />
      <img
        className="eventlogo__logo-image"
        src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
        
      />

      <div className="navbar__items-box">
        <Link to="">Home</Link>
        <Link to="/tipo-eventos">Tipo Eventos</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/login">Login</Link>

      </div>
    </nav>
  );
};

export default Nav;
