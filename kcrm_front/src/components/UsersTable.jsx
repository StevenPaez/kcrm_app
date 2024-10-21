import { useState, useEffect } from "react";
import axios from "axios"; // Importa Axios
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClickOpen = (user = null) => {
    setSelectedUser(user);
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
    setRole(user ? user.roleId : 1);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setSelectedUser(null);
  };

  const handleDeleteClick = (id) => {
    setOpenDelete(true);
    setSelectedUser({ id });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      name,
      email,
      password,
      role_id: role
    };
    try {
      if (selectedUser) {
        await axios.put(`http://localhost:4000/api/users/${selectedUser.id}`, data);
      } else {
        await axios.post("http://localhost:4000/api/users", data);
      }

      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpenDelete(false);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 4, position: 'relative' }}>
      <Button
        variant="contained"
        onClick={() => handleClickOpen()}
        sx={{ mb: 2}}
      >
        Agregar Usuario
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role.role_name}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleClickOpen(user)}>Editar</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteClick(user.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>{selectedUser ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Asesor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <Typography>¿Esta seguro de eliminar este usuario?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(selectedUser.id)}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;
