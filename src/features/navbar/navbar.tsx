import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import styles from "./navbar.module.scss";
import { FormControl } from "@material-ui/core";

const Navbar = () => {
  return (
    <FormControl fullWidth>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.NavBarContainer} variant="dense">
            <MedicalServicesIcon className={styles.MedicalIcon} />
            <Typography variant="h6" color="inherit" component="div">
              FINGLIX
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </FormControl>
  );
};

export default Navbar;
