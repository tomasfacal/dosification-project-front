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
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { API_ROUTES } from "../../networking/api-routes";
import API from "../../networking/api-service";

const theme = createTheme();

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: 0,
    role: "",
  });

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = (
    name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: number,
    role: string
  ) =>
    !!name && !!last_name && !!email && !!password && !!phone_number && !!role;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(success);
    const user = {
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      role: data.role,
    };

    API.post(API_ROUTES.SIGN_UP, user)
      .then((res) => {
        setError("");
        console.log(`Usuario ${data.name} creado satisfactoriamente`, res.data);
        setSuccess(`Usuario ${data.name} creado satisfactoriamente`);
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
            Registrarse
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
              id="name"
              label="Nombre"
              error={data.name === ""}
              name="name"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Apellido"
              error={data.last_name === ""}
              name="last_name"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone_number"
              label="Celular"
              error={data.phone_number === 0}
              type="number"
              name="phone_number"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              error={data.password === ""}
              type={showPassword ? "text" : "password"}
              id="password"
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.role}
                  label="Rol"
                  name="role"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                  <MenuItem value={"pharmacist"}>Farmacéutico</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !validateFields(
                  data.name,
                  data.last_name,
                  data.email,
                  data.password,
                  data.phone_number,
                  data.role
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
