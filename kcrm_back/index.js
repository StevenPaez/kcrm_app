import express from 'express';
import { PORT } from './config.js';
import indexRoutes from './src/routes/index.routes.js';
import userRoutes from './src/routes/user.routes.js';
import saleRoutes from './src/routes/sale.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use(indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

