import express from "express";
import { createBook, deleteBook, findBookById, updateBook, searchBooks, searchBook, showBook, getAll} from "../controllers/bookController.js";
import upload from '../services/multer.js';

const router = express.Router();

router.post("/create", upload.single('pdf'), createBook);

router.delete("/delete/:id", deleteBook);

router.get("/find/:id", findBookById);

router.post("/update/:id", upload.single('pdf'), updateBook);

router.get("/searchBooks", searchBooks);

router.get("/searchBook", searchBook);

router.get('/pdf/:pdfLocation', showBook);

router.get('/allBooks', getAll);

export default router;