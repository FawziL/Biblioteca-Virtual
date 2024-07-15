import express from "express";
import { login, logout, signup,requestPasswordReset, resetPassword} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/requestPasswordReset", requestPasswordReset);

router.post("/resetPassword", resetPassword);

export default router;