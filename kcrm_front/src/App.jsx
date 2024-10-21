import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar.jsx";  // Tu componente de Navbar
import UsersPage from "./pages/UsersPage.jsx";  // Componente para la página de usuarios
import SalesPage from "./pages/SalesPage.jsx";  // Componente para la página de ventas
import HomePage from "./pages/HomePage.jsx";  // Componente para la página de ventas
import LoginPage from "./pages/LoginPage.jsx";  // Componente para la página de ventas
import Cookies from 'js-cookie';

function App() {
  const toLogin = <Navigate to="/login" />;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNameLogin, setUserNameLogin] = useState('');

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const userNameLoginHandler = (userName) => {
    setUserNameLogin(userName);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    toLogin
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <ButtonAppBar onLogout={handleLogout} userNameLogin={userNameLogin} />}

      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} userNameLoginHandler={userNameLoginHandler} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : toLogin}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <UsersPage /> : toLogin}
        />
        <Route
          path="/sales"
          element={isAuthenticated ? <SalesPage /> : toLogin}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
