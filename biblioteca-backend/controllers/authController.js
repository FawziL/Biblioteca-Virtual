import bcrypt from "bcrypt";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const signup = async (req, res) => {
	try {
		const { fullName, email, password, confirmPassword, idCard } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
	
		const existingUser = await User.findOne({ where: { email } });
	
		if (existingUser) {
			return res.status(400).json({ error: "Email already exists" });
		}
	
		// Hash password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
	
		// Create a new user instance using Sequelize

		const newUser = new User({
			fullName,
			email,
			idCard,
			password: hashedPassword,
		});
		
		await newUser.save();
		const token = jwt.sign({ userId: idCard }, secretKey);
	
		res.status(200).json({
			token,
			fullName,
			email,
			idCard
	  	});
	} catch (error) {
	  	res.status(500).json({ error: error.message });
	}
};
  
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
	
		const user = await User.findOne({ where: { email } });
	
		if (!user) {
			return res.status(400).json({ error: "User don't find" });
		}
	
		// Compare password using bcrypt
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
	
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}
	
		// Generate JWT token (assuming you have a secret key defined)
		const token = jwt.sign({ userId: user.idCard }, secretKey);
	
		res.status(200).json({
			token,
			fullName: user.fullName,
			email: user.email,
			idCard: user.idCard,
			admin: user.admin
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
  
export const logout = (req, res) => {
	try {
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
