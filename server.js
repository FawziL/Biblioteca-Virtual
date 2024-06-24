import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.use('/', (req, res) => {
  res.send("Hola");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

