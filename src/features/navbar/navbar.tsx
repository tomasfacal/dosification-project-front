import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import styles from './navbar.module.scss';
import Menu from '../sidebar/menu'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className= {styles.NavBarContainer} variant="dense">
          <Menu/>
          <MedicalServicesIcon className= {styles.MedicalIcon}/>
          <Typography variant="h6" color="inherit" component="div">
            FINGLIX
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
