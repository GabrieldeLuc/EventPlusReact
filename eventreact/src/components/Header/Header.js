import React, { useState } from "react";

import Container from "../container/Container.js";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario.js";
import menubar from "../../assets/images/menubar.png";
import Nav from "../Nav/Nav";

import "./Header.css";

const Header = () => {
    const [exibeNavbar, setexibeNavBar] = useState(false); 
    console.log(`EXIBE A NAVBAR? ${exibeNavbar}`);
  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">
          <img
            src={menubar}
            className= 'headerpage__menubar'
            alt="Imagem menu de barras. Serve para exibir ou esconder o menu no smartphone."
            onClick={() => {setexibeNavBar(true)}}
          />

            <Nav setexibeNavBar={setexibeNavBar} exibeNavbar={exibeNavbar}/>
          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;