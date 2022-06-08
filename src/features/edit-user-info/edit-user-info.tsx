import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { API_ROUTES } from "../../networking/api-routes";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../constant/Routing";
import API from "../../networking/api-service";
import AuthContext from "../../context/authContext";
import { Stack } from "@mui/material";
import styles from "./edit-user-info.module.scss";

const theme = createTheme();

function EditUserInfo() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const [data, setData] = useState({
    first_name: authCtx.name,
    last_name: authCtx.lastname,
    email: authCtx.email,
    phone_number: authCtx.phonenumber,
    type: authCtx.role,
    speciality: authCtx.speciality,
    job: authCtx.job,
  });

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const user = {
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      phone_number: data.phone_number || "",
      speciality: data.speciality || "",
      job: data.job || "",
    };

    API.post(API_ROUTES.EDIT_USER, user)
      .then(() => {
        authCtx.setUserInfo(
          data.first_name,
          data.last_name,
          data.phone_number,
          data.speciality,
          data.job
        );
        alert(`Usuario ${data.first_name} actualizado satisfactoriamente`);
        navigation(Routing.HOME);
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  };
  const handleCancel = (event: any) => {
    event.preventDefault();
    navigation(Routing.HOME);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar mi perfil
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="first_name"
              label="Nombre"
              name="first_name"
              defaultValue={data.first_name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="last_name"
              label="Apellido"
              name="last_name"
              defaultValue={data.last_name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              defaultValue={data.email}
              disabled
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone_number"
              label="Celular"
              name="phone_number"
              defaultValue={data.phone_number}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id={data.type === "doctor" ? "speciality" : "job"}
              label={data.type === "doctor" ? "Especialidad" : "Cargo"}
              name={data.type === "doctor" ? "speciality" : "job"}
              defaultValue={data.type === "doctor" ? data.speciality : data.job}
              onChange={handleInputChange}
            />
            <Stack className={styles.Stack} direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success">
                Guardar
              </Button>
              <Button onClick={handleCancel} variant="contained">
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditUserInfo;
