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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Products = [
  { key: "CC", value: "Credito de consumo" },
  { key: "LLI", value: "Libranza Libre Inversión" },
  { key: "TC", value: "Tarjeta de credito" }
]

const ProductsEnum = {
  CC: "Credito de consumo",
  LLI: "Libranza Libre Inversión",
  TC: "Tarjeta de credito"
}

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [franchise, setFranchise] = useState("");
  const [tasa, setTasa] = useState("");

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
    setFranchise(sale ? sale.franchise : "");
    setTasa(sale ? sale.tasa : "");
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
      <Button
        variant="contained"
        onClick={() => handleClickOpen()}
        sx={{ mb: 2}}
      >
        Agregar Venta
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cupo Solicitado</TableCell>
              <TableCell>Franquicia</TableCell>
              <TableCell>Tasa</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell>Usuario creación</TableCell>
              <TableCell>Fecha actualización</TableCell>
              <TableCell>Usuario actualización</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.requested_amount.toLocaleString()}</TableCell>
                <TableCell>{sale.franchise}</TableCell>
                <TableCell>{sale.rate}</TableCell>
                <TableCell>{sale.created_at}</TableCell>
                <TableCell>{sale.created_user.name}</TableCell>
                <TableCell>{sale.updated_at}</TableCell>
                <TableCell>{sale.updated_user.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ mr: 2, mb: 2 }} onClick={() => handleClickOpen(sale)}>Editar</Button>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Producto</InputLabel>
            <Select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {Products.map((key) => (
                <MenuItem key={key.key} value={key.value}>{key.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Cupo Solicitado"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {
            product === ProductsEnum.TC &&
            <FormControl fullWidth margin="dense">
              <InputLabel>Franquicia</InputLabel>
              <Select
                value={franchise}
                onChange={(e) => setFranchise(e.target.value)}
              >
                <MenuItem value={'AMEX'}>AMEX</MenuItem>
                <MenuItem value={'VISA'}>VISA</MenuItem>
                <MenuItem value={'MASTERCARD'}>MASTERCARD</MenuItem>
              </Select>
            </FormControl>
          }
          {
            product !== ProductsEnum.TC && 
            <TextField
              margin="dense"
              label="Tasa"
              type="decimal"
              fullWidth
              variant="outlined"
              value={tasa}
              onChange={(e) => setTasa(e.target.value)}
            />
          }
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
