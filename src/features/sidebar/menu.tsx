import React, { useState } from "react";
import Hamburger from "./hamburger";
import styles from "./menu.module.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from "@material-ui/core";

// import styled from "styled-components";

// import { colors } from "../../global";

// import Hamburger from "../Hamburger/Hamburger";
// import Navbar from "../navbar/navbar";


// const StyledLink = styled.a`
//   padding: 0 2rem;
//   font-size: 2rem;
//   color: ${colors.pearl};
//   text-decoration: none;
  
//   :hover {
//     color: ${colors.yellowmellow};
//     cursor: pointer;
//   }
// `;

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);


  const handleMenu = (event: any) => {
    setOpen(!open)
  }
  return (
    <div>
      <nav className = { open ? styles.nav_link : styles.no_nav_link}>
          <a className = {styles.link} onClick={() => close()}> Pacientes</a>
          <a className = {styles.link} onClick={() => close()}> Link2</a>
      </nav>
        <div className={styles.menu_icon}>
            <IconButton onClick={handleMenu} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>
        </div>
      {/* <Hamburger open={open} setOpen={setOpen} /> */}
     </div>
   );
};

export default Menu;