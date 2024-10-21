import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import PropTypes from "prop-types";


export default function ButtonAppBar({ userNameLogin }) {
  const onLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KCRM APP
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/sales">
              Ventas
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Usuarios
            </Button>
          </Box>

          <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
            USUARIO: {userNameLogin}
          </Typography>
          <Button
            onClick={() => onLogout()}
            color="inherit">
              Salir
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

ButtonAppBar.propTypes = {
  userNameLogin: PropTypes.string
}