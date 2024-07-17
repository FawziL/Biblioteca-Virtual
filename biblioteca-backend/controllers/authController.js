import bcrypt from "bcrypt";
import User from "../models/authModel.js";
import jwt from "jsonwebtoken";
import transporter from '../services/nodemailer.js'; 
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const resetTokenSecret = process.env.RESET_TOKEN_SECRET;
const emailUser = process.env.EMAIL_USER;

const signup = async (req, res) => {
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
  
const login = async (req, res) => {
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
  
const logout = (req, res) => {
	try {
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const resetToken = jwt.sign({ userId: user.idCard }, resetTokenSecret);
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: emailUser,
            to: user.email,
            subject: 'Password Reset',
            text: `Click here to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
		console.log({ error: error.message })
        res.status(500).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
		
    try {
        const decoded = jwt.verify(token, resetTokenSecret);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
		
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {signup, login, logout, requestPasswordReset, resetPassword}