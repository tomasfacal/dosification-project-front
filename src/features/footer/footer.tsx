import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./footer.module.scss";
import { FormControl } from "@material-ui/core";
import logoFing from "../../assets/images/logo_FING.jpg";
import {useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TermsAndConditions from '../terms-and-conditions/terms-and-conditions'


const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Button onClick={handleOpen}> 
                <Typography variant="h6" color="white" component="div">
                  Términos y Condiciones
                </Typography>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <TermsAndConditions/>
              </Modal>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </FormControl>
  );
};

export default Footer;
