import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import axios from 'axios'; // Importa Axios

export default function LoginPage({ onLogin, userNameLoginHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/auth", {
        email,
        password,
      });

      Cookies.set("token", response.data.token, { expires: 7, secure: true, sameSite: "Strict" });
      onLogin();
      userNameLoginHandler(response.data.userLogin);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Credenciales incorrectas";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" mb={4}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </Box>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  userNameLoginHandler: PropTypes.func.isRequired
};
