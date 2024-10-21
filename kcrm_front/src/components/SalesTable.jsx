import { useState, useEffect } from "react";
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
} from "@mui/material";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    // Reemplaza esto con tu API real
    const response = await fetch("http://localhost:4000/api/sales");
    const data = await response.json();
    setSales(data);
  };

  const handleClickOpen = (sale = null) => {
    setSelectedSale(sale);
    setProduct(sale ? sale.product : "");
    setAmount(sale ? sale.amount : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSale(null);
  };

  const handleSubmit = async () => {
    if (selectedSale) {
      // Update sale
      await fetch(`http://localhost:4000/api/sales/${selectedSale.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, amount }),
      });
    } else {
      // Create sale
      await fetch("http://localhost:4000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, amount }),
      });
    }

    fetchSales(); // Refresh the list of sales
    handleClose();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/sales/${id}`, {
      method: "DELETE",
    });
    fetchSales(); // Refresh the list of sales
  };

  return (
    <Box sx={{ width: '100%', p: 4, position: 'relative' }}>
      <Button variant="contained" onClick={() => handleClickOpen()}>
        Agregar Venta
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.amount}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleClickOpen(sale)}>Editar</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(sale.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedSale ? "Editar Venta" : "Agregar Venta"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Producto"
            type="text"
            fullWidth
            variant="outlined"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cantidad"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesTable;
