import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import API from "../../../networking/api-service";
import AuthContext from "../../../context/authContext";
import { API_ROUTES } from "../../../networking/api-routes";


const NavbarMenu = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    API.defaults.headers.common["Authorization"] = "Token " + authCtx.token;

    API.post( API_ROUTES.SIGN_OUT).then((res) => {
      authCtx.logout()
      navigation("/");
    }).catch(() => {
      authCtx.logout()
      navigation("/");
    })
  }

  return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={authCtx.name} src="/static/images/avatar/2.jpg" />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
           <MenuItem key='Perfil' onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Perfil</Typography>
            </MenuItem>
            <MenuItem key='Cerrar Sesión' onClick={handleLogout}>
                <Typography textAlign="center">Cerrar Sesión</Typography>
            </MenuItem>
        </Menu>
      </Box>
)};

export default NavbarMenu;
