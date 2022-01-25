import React, { useState } from "react";
import Hamburger from "./hamburger";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import styles from "./menu.module.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from "@material-ui/core";
import { Link} from 'react-router-dom';
import { Routing } from '../../constant/Routing';
import PeopleIcon from '@mui/icons-material/People';

const sidebarNavItems = [
  {
      display: 'Simular',
      icon: <i className='bx bx-home'></i>,
      to: '/',
      section: ''
  },
  {
      display: 'Pacientes',
      icon: <i className='bx bx-star'></i>,
      to: '/started',
      section: 'started'
  },
  {
      display: 'Calendar',
      icon: <i className='bx bx-calendar'></i>,
      to: '/calendar',
      section: 'calendar'
  },
]

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);


  const handleMenu = (event: any) => {
    setOpen(!open)
  }
  return (
    <div>
      <nav className = { open ? styles.nav_link : styles.no_nav_link}>
        <div className={styles.nav_items}>
          <Link to='simulate' key={0} className={styles.link}>
            <div className={styles.item}>
              <AutoGraphIcon className= {styles.icons}/>
              <div className={styles.name}>
                  Simular
              </div>
            </div>
          </Link>
          <Link to={Routing.LIST_PATIENTS} key={1} className={styles.link}>
            <div className={styles.item}>
              <PeopleIcon className= {styles.icons}/>
              <div className={styles.name}>
                  Pacientes
              </div>
            </div>
          </Link>
        </div>
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