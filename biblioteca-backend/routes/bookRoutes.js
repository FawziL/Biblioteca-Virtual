import express from "express";
import { createBook, deleteBook, findBookById, updateBook, searchBooks, showBook} from "../controllers/bookController.js";
import upload from '../services/multer.js';

const router = express.Router();

router.post("/create", upload.single('pdf'), createBook);

router.post("/delete/:id", deleteBook);

router.get("/find/:id", findBookById);

router.post("/update/:id", upload.single('pdf'), updateBook);

router.post("/searchBooks", searchBooks);

router.get('/pdf/:filename', showBook);

export default router;