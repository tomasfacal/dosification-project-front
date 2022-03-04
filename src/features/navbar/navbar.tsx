import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import styles from "./navbar.module.scss";
import { FormControl, Link } from "@material-ui/core";
import NavbarMenu from "./navmenu/nav-menu"
import AuthContext from "../../context/authContext";
import React, { useContext } from "react";
import NavbarLogin from "./navmenu/navbar-login"

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  return (
    <FormControl fullWidth>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.NavBarContainer} variant="dense">
            <div className={styles.Icon}>
              <MedicalServicesIcon className={styles.MedicalIcon} />
              <Typography variant="h6" color="inherit" component="div">
                FINGLIX
              </Typography>
            </div>
            <div>
              { authCtx.isLoggedIn && <NavbarMenu></NavbarMenu>}
              { !authCtx.isLoggedIn && <NavbarLogin></NavbarLogin>}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </FormControl>
  );
};

export default Navbar;
