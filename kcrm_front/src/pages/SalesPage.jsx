import { Box, Typography } from "@mui/material";
import SalesTable from "../components/SalesTable";

export default function SalesPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" mb={4}>
        Ventas
      </Typography>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <SalesTable />
      </Box>
    </Box>
  );
}
