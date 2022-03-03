import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./footer.module.scss";
import { FormControl } from "@material-ui/core";
import logoFing from "../../assets/images/logo_FING.jpg";

const Footer = () => {
  return (
    <FormControl fullWidth>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={styles.FooterContainer} variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Proyecto de grado - Facultad de Ingeniería UdelaR
            </Typography>
            <img src={logoFing} alt="Logo FING" className={styles.logoFing} />
            <div className={styles.legalContainer}>
              <Typography variant="h6" color="inherit" component="div">
                Términos y Condiciones
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </FormControl>
  );
};

export default Footer;
