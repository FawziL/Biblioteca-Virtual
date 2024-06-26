import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import cors from "cors";
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(cors({
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/', (req, res) => {
    res.send("Holaaa");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

