import express from "express";
import { createBook, deleteBook, findBookById, updateBook, searchBooks, searchBook, showBook, getAll} from "../controllers/bookController.js";
import upload from '../services/multer.js';
import { authenticateToken, authenticateAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", upload.single('pdf'), authenticateToken, authenticateAdmin, createBook);

router.delete("/delete/:id", authenticateToken, authenticateAdmin, deleteBook);

router.get("/find/:id", authenticateToken, authenticateAdmin, findBookById);

router.post("/update/:id", authenticateToken, authenticateAdmin, upload.single('pdf'), updateBook);

router.get('/allBooks', authenticateToken, authenticateAdmin, getAll);

router.get('/pdf/:pdfLocation', showBook);

router.get("/searchBooks", searchBooks);

router.get("/searchBook", searchBook);

export default router;