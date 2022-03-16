import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import API from "../../../networking/api-service";
import AuthContext from "../../../context/authContext";
import { API_ROUTES } from "../../../networking/api-routes";
import { Routing } from "../../../constant/Routing";

const NavbarMenu = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePerfil = () => {
    setAnchorElUser(null);
    navigation(Routing.EDIT_USER_INFO);
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    API.defaults.headers.common["Authorization"] = "Token " + authCtx.token;

    try {
      await API.post(API_ROUTES.SIGN_OUT);
      authCtx.logout();
      navigation(Routing.HOME);
    } catch (error) {
      authCtx.logout();
      navigation(Routing.HOME);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={"Ver opciones"}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={authCtx.name} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Perfil" onClick={handlePerfil}>
          <Typography textAlign="center">Perfil</Typography>
        </MenuItem>
        <MenuItem key="Cerrar Sesión" onClick={handleLogout}>
          <Typography textAlign="center">Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarMenu;
