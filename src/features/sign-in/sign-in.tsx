import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import API from "../../networking/api-service";
import { API_ROUTES } from "../../networking/api-routes";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContext from "../../context/authContext";
import Error from "../error/error";
import { Routing } from "../../constant/Routing";

const theme = createTheme();

export default function SignIn() {
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");

  const logUser = async () => {
    try {
      const res = await API.post(API_ROUTES.SIGN_IN);
      authCtx.login(
        res.data.token,
        res.data.role,
        res.data.name,
        res.data.last_name,
        res.data.email,
        res.data.phone_number,
        res.data.speciality,
        res.data.job
      );
      navigation(Routing.HOME);
    } catch (error) {
      setError("El usuario o la contraseña no son correctos.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const base64 = require("base-64");

    API.defaults.headers.common["Authorization"] =
      "Basic " + base64.encode(data.get("email") + ":" + data.get("password"));

    await logUser();
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {error && <Error error={error} />}
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
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link href={Routing.SIGN_UP} variant="body2">
                  {"No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
