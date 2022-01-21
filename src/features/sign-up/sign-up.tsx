import styles from "./sign-up.module.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { API_ROUTES } from "../../networking/api-routes";
import API from "../../networking/api-service";

const theme = createTheme();

export default function SignUp() {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    celular: 0,
  });

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = (
    nombre: string,
    apellido: string,
    email: string,
    contraseña: string,
    celular: number
  ) => !!nombre && !!apellido && !!email && !!contraseña && !!celular;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(success);
    const user = {
      name: data.nombre,
      last_name: data.apellido,
      email: data.email,
      phone_number: data.celular,
      password: data.contraseña,
    };

    API.post(API_ROUTES.SIGN_UP, user)
      .then((res) => {
        setError("");
        console.log(
          `Usuario ${data.nombre} creado satisfactoriamente`,
          res.data
        );
        setSuccess(`Usuario ${data.nombre} creado satisfactoriamente`);
      })
      .catch(function (error) {
        setSuccess("");
        let completeError = "";
        console.log(error);
        for (var i in error.response.data) {
          completeError = completeError.concat(
            `${i}: ${error.response.data[i]}`
          );
        }
        setError(completeError);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              error={data.email === ""}
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              error={data.nombre === ""}
              name="nombre"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="apellido"
              label="Apellido"
              error={data.apellido === ""}
              name="apellido"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="celular"
              label="Celular"
              error={data.celular === 0}
              type="number"
              name="celular"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              error={data.contraseña === ""}
              type={showPassword ? "text" : "password"}
              id="contraseña"
              autoComplete="current-password"
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !validateFields(
                  data.nombre,
                  data.apellido,
                  data.email,
                  data.contraseña,
                  data.celular
                )
              }
            >
              Sign Up
            </Button>
            {error && <Typography className={styles.error}>{error}</Typography>}
            {success && (
              <Typography className={styles.success}>{success}</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
