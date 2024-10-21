import UsersTable from "../components/UsersTable";
import { Box, Typography } from "@mui/material";

export default function UsersPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" mb={4}>
        Usuarios
      </Typography>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <UsersTable />
      </Box>
    </Box>
  );
}
