import express from "express";
import { createBook, deleteBook, findBookById, updateBook, searchBooks, PosibleBuscardor} from "../controllers/bookController.js";

const router = express.Router();

router.post("/create", createBook);

router.post("/delete", deleteBook);

router.post("/find", findBookById);

router.post("/update", updateBook);

router.post("/searchBooks", searchBooks);

export default router;