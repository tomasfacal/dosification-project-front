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
import { useNavigate } from "react-router-dom";
import { Routing } from "../../constant/Routing";
import API from "../../networking/api-service";

const theme = createTheme();

export default function SignUp() {
  const navigation = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    type: "",
    speciality: "",
    job: "",
  });

  const handleInputChange = (event: any) => {
    if (event.target.name === "type") setType(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const validateFields = (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    type: string,
    speciality: string,
    job: string
  ) =>
    !!first_name &&
    !!last_name &&
    !!email &&
    !!password &&
    !!type &&
    (!!speciality || !!job);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [type, setType] = useState("");

  const renderTextField = () => (
    <TextField
      margin="normal"
      fullWidth
      id={type === "doctor" ? "speciality" : "job"}
      label={type === "doctor" ? "Especialidad" : "Cargo"}
      error={type === "doctor" ? data.speciality === "" : data.job === ""}
      name={type === "doctor" ? "speciality" : "job"}
      autoFocus
      onChange={handleInputChange}
    />
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number || "",
      password: data.password,
      type: data.type,
      speciality: data.speciality,
      job: data.job,
    };

    API.post(API_ROUTES.SIGN_UP, user)
      .then((res) => {
        alert(
          `Usuario ${data.first_name} creado satisfactoriamente` + res.data
        );
        navigation(Routing.SIGN_IN);
      })
      .catch(function (error) {
        alert(error.response.data);
      });
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
              id="first_name"
              label="Nombre"
              error={data.first_name === ""}
              name="first_name"
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
              fullWidth
              id="phone_number"
              label="Celular"
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
                  value={data.type}
                  label="Rol"
                  name="type"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                  <MenuItem value={"pharmacist"}>Farmacéutico</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {renderTextField()}
            <Button
              color="success"
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !validateFields(
                  data.first_name,
                  data.last_name,
                  data.email,
                  data.password,
                  data.type,
                  data.speciality,
                  data.job
                )
              }
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
