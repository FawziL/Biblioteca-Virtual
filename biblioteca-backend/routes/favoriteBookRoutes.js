import express from 'express';
import { addFavoriteBook, getFavoriteBooks, deleteFavoriteBook } from '../controllers/favoriteBookController.js';
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post('/add', authenticateToken, addFavoriteBook);

router.delete('/deleteFavoriteBook', authenticateToken, deleteFavoriteBook);

router.get('/getFavoriteBooks', authenticateToken, getFavoriteBooks);

export default router;
